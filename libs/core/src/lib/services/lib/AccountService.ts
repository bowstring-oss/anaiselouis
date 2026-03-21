/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { inject, Injectable, type Signal }                                                                              from "@angular/core";
import { takeUntilDestroyed, toSignal }                                                                                 from "@angular/core/rxjs-interop";
import { type FirebaseError }                                                                                           from "@angular/fire/app";
import { Auth, EmailAuthProvider, linkWithCredential, reauthenticateWithCredential, unlink, updatePassword, type User } from "@angular/fire/auth";
import { doc, docSnapshots, type DocumentReference, type DocumentSnapshot, Firestore, updateDoc }                       from "@angular/fire/firestore";
import { Functions }                                                                                                    from "@angular/fire/functions";
import { LOCALE_ID, type LocaleId }                                                                                     from "@bowstring/i18n";
import { type FirebaseWebAuthnError, linkWithPasskey, unlinkPasskey }                                                   from "@firebase-web-authn/browser";
import { catchError, distinctUntilChanged, filter, map, Observable, of, switchMap }                                     from "rxjs";
import { getAuthErrorMessage }                                                                                          from "../../getAuthErrorMessage";
import { type AccountDocument }                                                                                         from "../../interfaces";
import { AuthenticationService }                                                                                        from "./AuthenticationService";
import { ErrorsService }                                                                                                from "./ErrorsService";
import { RxSsrService }                                                                                                 from "./RxSsrService";


@Injectable({ providedIn: "root" })
export class AccountService {

  constructor() {
    this.documentSnapshotObservable.pipe<DocumentSnapshot<AccountDocument, AccountDocument>, DocumentSnapshot<AccountDocument, AccountDocument>, DocumentSnapshot<AccountDocument, AccountDocument>>(
      filter<DocumentSnapshot<AccountDocument, AccountDocument> | undefined, DocumentSnapshot<AccountDocument, AccountDocument>>((documentSnapshot?: DocumentSnapshot<AccountDocument, AccountDocument>): documentSnapshot is DocumentSnapshot<AccountDocument, AccountDocument> => !!documentSnapshot),
      distinctUntilChanged<DocumentSnapshot<AccountDocument, AccountDocument>, string>(
        (
          previousDocumentId: string,
          currentDocumentId: string,
        ): boolean => currentDocumentId === previousDocumentId,
        (documentSnapshot: DocumentSnapshot<AccountDocument, AccountDocument>): string => documentSnapshot.ref.id,
      ),
      takeUntilDestroyed<DocumentSnapshot<AccountDocument, AccountDocument>>(),
    ).subscribe(
      (documentSnapshot: DocumentSnapshot<AccountDocument, AccountDocument>): void => {
        const accountDocument: AccountDocument | undefined = documentSnapshot.data();

        if (!accountDocument || accountDocument.localeId === this.localeId)
          return void (0);

        return void updateDoc<AccountDocument, AccountDocument>(
          documentSnapshot.ref,
          { localeId: this.localeId },
        ).catch<never>(
          (error: Error): never => {
            console.error("Something went wrong.");

            throw error;
          },
        );
      },
    );
  }

  private readonly auth: Auth                                                                                             = inject<Auth>(Auth);
  private readonly authenticationService: AuthenticationService                                                           = inject<AuthenticationService>(AuthenticationService);
  private readonly errorsService: ErrorsService                                                                           = inject<ErrorsService>(ErrorsService);
  private readonly firestore: Firestore                                                                                   = inject<Firestore>(Firestore);
  private readonly documentSnapshotObservable: Observable<DocumentSnapshot<AccountDocument, AccountDocument> | undefined> = this.authenticationService.userObservable.pipe<DocumentSnapshot<AccountDocument, AccountDocument> | undefined>(
    switchMap<User, Observable<DocumentSnapshot<AccountDocument, AccountDocument> | undefined>>(
      ({ uid: userId }: User): Observable<DocumentSnapshot<AccountDocument, AccountDocument> | undefined> => (docSnapshots<AccountDocument>(
        doc(
          this.firestore,
          `/accounts/${ userId }`,
        ) as DocumentReference<AccountDocument, AccountDocument>,
      ) as Observable<DocumentSnapshot<AccountDocument, AccountDocument>>).pipe<DocumentSnapshot<AccountDocument, AccountDocument> | undefined>(catchError<DocumentSnapshot<AccountDocument, AccountDocument>, Observable<undefined>>((): Observable<undefined> => of<undefined>(undefined))),
    ),
  );
  private readonly functions: Functions                                                                                   = inject<Functions>(Functions);
  private readonly localeId: LocaleId                                                                                     = inject<LocaleId>(LOCALE_ID);
  private readonly rxSsrService: RxSsrService                                                                             = inject<RxSsrService>(RxSsrService);

  public readonly accountDocument$: Signal<AccountDocument | undefined>                                              = toSignal<AccountDocument | undefined>(
    this.documentSnapshotObservable.pipe<AccountDocument | undefined>(
      this.rxSsrService.wrap<DocumentSnapshot<AccountDocument, AccountDocument> | undefined, AccountDocument | undefined>(
        map<DocumentSnapshot<AccountDocument, AccountDocument> | undefined, AccountDocument | undefined>((documentSnapshot?: DocumentSnapshot<AccountDocument, AccountDocument>): AccountDocument | undefined => documentSnapshot?.data()),
        "019682d4-6926-7119-93f4-cb67e24450fb",
      ),
    ),
  );
  public readonly accountDocumentReference$: Signal<DocumentReference<AccountDocument, AccountDocument> | undefined> = toSignal<DocumentReference<AccountDocument, AccountDocument> | undefined>(this.documentSnapshotObservable.pipe<DocumentReference<AccountDocument, AccountDocument> | undefined>(map<DocumentSnapshot<AccountDocument, AccountDocument> | undefined, DocumentReference<AccountDocument, AccountDocument> | undefined>((documentSnapshot?: DocumentSnapshot<AccountDocument, AccountDocument>): DocumentReference<AccountDocument, AccountDocument> | undefined => documentSnapshot?.ref)));

  public async linkWithEmailAndPasswordCredential(
    email: string,
    password: string,
  ): Promise<void> {
    const user: User | undefined = this.authenticationService.user$();

    if (user)
      return linkWithCredential(
        user,
        EmailAuthProvider.credential(
          email,
          password,
        ),
      ).then<void, never>(
        (): Promise<void> => updateDoc<AccountDocument, AccountDocument>(
          doc(
            this.firestore,
            `/accounts/${ user.uid }`,
          ) as DocumentReference<AccountDocument, AccountDocument>,
          { "security.password": true },
        ).catch<never>(
          (error: Error): never => {
            console.error("Something went wrong.");

            throw error;
          },
        ),
        (firebaseError: FirebaseError): never => {
          this.errorsService.createError(getAuthErrorMessage(firebaseError));

          throw firebaseError;
        },
      );
  }
  public async linkWithPasskey(): Promise<void> {
    const email: string | undefined  = this.accountDocument$()?.email;
    const userId: string | undefined = this.authenticationService.user$()?.uid;

    if (email && userId)
      return linkWithPasskey(
        this.auth,
        this.functions,
        email,
      ).then<void, never>(
        (): Promise<void> => updateDoc<AccountDocument, AccountDocument>(
          doc(
            this.firestore,
            `/accounts/${ userId }`,
          ) as DocumentReference<AccountDocument, AccountDocument>,
          { "security.passkey": true },
        ).catch<never>(
          (error: Error): never => {
            console.error("Something went wrong.");

            throw error;
          },
        ),
        (firebaseWebAuthnError: FirebaseWebAuthnError): never => {
          this.errorsService.createError(firebaseWebAuthnError.code === "firebaseWebAuthn/no-op" ? "You already have a passkey." : firebaseWebAuthnError.message);

          throw firebaseWebAuthnError;
        },
      );
  }
  public async linkWithPasskeyBackup(): Promise<void> {
    const email: string | undefined  = this.accountDocument$()?.email;
    const userId: string | undefined = this.authenticationService.user$()?.uid;

    if (email && userId)
      return linkWithPasskey(
        this.auth,
        this.functions,
        `${ email } (Backup)`,
        "second",
      ).then<void, never>(
        (): Promise<void> => updateDoc<AccountDocument, AccountDocument>(
          doc(
            this.firestore,
            `/accounts/${ userId }`,
          ) as DocumentReference<AccountDocument, AccountDocument>,
          { "security.passkeyBackup": true },
        ).catch<never>(
          (error: Error): never => {
            console.error("Something went wrong.");

            throw error;
          },
        ),
        (firebaseWebAuthnError: FirebaseWebAuthnError): never => {
          this.errorsService.createError(firebaseWebAuthnError.code === "firebaseWebAuthn/no-op" ? "You already have a passkey backup." : firebaseWebAuthnError.message);

          throw firebaseWebAuthnError;
        },
      );
  }
  public async unlinkPasskey(): Promise<void> {
    const userId: string | undefined = this.authenticationService.user$()?.uid;

    if (userId)
      return unlinkPasskey(
        this.auth,
        this.functions,
      ).then<void, never>(
        (): Promise<void> => updateDoc<AccountDocument, AccountDocument>(
          doc(
            this.firestore,
            `/accounts/${ userId }`,
          ) as DocumentReference<AccountDocument, AccountDocument>,
          { "security.passkey": false },
        ).catch<never>(
          (error: Error): never => {
            console.error("Something went wrong.");

            throw error;
          },
        ),
        (firebaseWebAuthnError: FirebaseWebAuthnError): never => {
          this.errorsService.createError(firebaseWebAuthnError.code === "firebaseWebAuthn/no-op" ? "You do not have a passkey." : firebaseWebAuthnError.message);

          throw firebaseWebAuthnError;
        },
      );
  }
  public async unlinkPasskeyBackup(): Promise<void> {
    const userId: string | undefined = this.authenticationService.user$()?.uid;

    if (userId)
      return unlinkPasskey(
        this.auth,
        this.functions,
        "second",
      ).then<void, never>(
        (): Promise<void> => updateDoc<AccountDocument, AccountDocument>(
          doc(
            this.firestore,
            `/accounts/${ userId }`,
          ) as DocumentReference<AccountDocument, AccountDocument>,
          { "security.passkeyBackup": false },
        ).catch<never>(
          (error: Error): never => {
            console.error("Something went wrong.");

            throw error;
          },
        ),
        (firebaseWebAuthnError: FirebaseWebAuthnError): never => {
          this.errorsService.createError(firebaseWebAuthnError.code === "firebaseWebAuthn/no-op" ? "You do not have a passkey backup." : firebaseWebAuthnError.message);

          throw firebaseWebAuthnError;
        },
      );
  }
  public async unlinkPassword(): Promise<void> {
    const user: User | undefined = this.authenticationService.user$();

    if (user)
      return unlink(
        user,
        "password",
      ).then<void, never>(
        (): Promise<void> => updateDoc<AccountDocument, AccountDocument>(
          doc(
            this.firestore,
            `/accounts/${ user.uid }`,
          ) as DocumentReference<AccountDocument, AccountDocument>,
          { "security.password": false },
        ).catch<never>(
          (error: Error): never => {
            console.error("Something went wrong.");

            throw error;
          },
        ),
        (firebaseError: FirebaseError): never => {
          this.errorsService.createError(getAuthErrorMessage(firebaseError));

          throw firebaseError;
        },
      );
  }
  public async updateEmailAndPasswordCredential(
    passwordCurrent: string,
    passwordNew: string,
  ): Promise<void> {
    const email: string | undefined = this.accountDocument$()?.email;
    const user: User | undefined    = this.authenticationService.user$();

    if (email && user)
      return reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(
          email,
          passwordCurrent,
        ),
      ).then<void>(
        (): Promise<void> => updatePassword(
          user,
          passwordNew,
        ),
      ).catch<never>(
        (firebaseError: FirebaseError): never => {
          this.errorsService.createError(getAuthErrorMessage(firebaseError));

          throw firebaseError;
        },
      );
  }

}
