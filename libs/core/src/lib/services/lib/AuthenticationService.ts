/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { DOCUMENT, isPlatformBrowser }                                                                                                           from "@angular/common";
import { afterRender, inject, Injectable, PLATFORM_ID, signal, type Signal, type WritableSignal }                                                from "@angular/core";
import { toSignal }                                                                                                                              from "@angular/core/rxjs-interop";
import { type FirebaseError }                                                                                                                    from "@angular/fire/app";
import { Auth, createUserWithEmailAndPassword, onIdTokenChanged, signInAnonymously, signInWithEmailAndPassword, type User, type UserCredential } from "@angular/fire/auth";
import { Functions }                                                                                                                             from "@angular/fire/functions";
import { createUserWithPasskey, type FirebaseWebAuthnError, signInWithPasskey, verifyUserWithPasskey }                                           from "@firebase-web-authn/browser";
import { type Auth as AdminAuth, type UserRecord as AdminUserRecord }                                                                            from "firebase-admin/auth";
import { catchError, distinctUntilChanged, filter, from, Observable, type Observer, of, switchMap, tap, type TeardownLogic }                     from "rxjs";
import { getAuthErrorMessage }                                                                                                                   from "../../getAuthErrorMessage";
import { getCallableCloudFunction }                                                                                                              from "../../getCallableCloudFunction";
import { ADMIN_AUTH }                                                                                                                            from "../../injection tokens";
import { ErrorsService }                                                                                                                         from "./ErrorsService";
import { RxSsrService }                                                                                                                          from "./RxSsrService";


@Injectable({ providedIn: "root" })
export class AuthenticationService {

  constructor() {
    afterRender(
      (): void => {
        if (this.document.defaultView && "PublicKeyCredential" in this.document.defaultView) {
          this.hasWebAuthn$.set(true);

          this.document.defaultView.PublicKeyCredential.isConditionalMediationAvailable().then<void>((conditionalMediationAvailable: boolean): void => this.hasWebAuthnConditionalMediation$.set(conditionalMediationAvailable));
          this.document.defaultView.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then<void>((userVerifyingPlatformAuthenticatorAvailable: boolean): void => this.hasWebAuthnUserVerifyingPlatformAuthenticator$.set(userVerifyingPlatformAuthenticatorAvailable));
        } else {
          this.hasWebAuthn$.set(false);
          this.hasWebAuthnConditionalMediation$.set(false);
          this.hasWebAuthnUserVerifyingPlatformAuthenticator$.set(false);
        }
      },
    );
  }

  private readonly adminAuth: AdminAuth | null      = inject<AdminAuth>(
    ADMIN_AUTH,
    { optional: true },
  );
  private readonly auth: Auth                       = inject<Auth>(Auth);
  private readonly document: Document               = inject<Document>(DOCUMENT);
  private readonly errorsService: ErrorsService     = inject<ErrorsService>(ErrorsService);
  private readonly functions: Functions             = inject<Functions>(Functions);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly rxSsrService: RxSsrService       = inject<RxSsrService>(RxSsrService);

  public readonly hasWebAuthn$: WritableSignal<boolean | undefined>                                   = signal<undefined>(undefined);
  public readonly hasWebAuthnConditionalMediation$: WritableSignal<boolean | undefined>               = signal<undefined>(undefined);
  public readonly hasWebAuthnUserVerifyingPlatformAuthenticator$: WritableSignal<boolean | undefined> = signal<undefined>(undefined);
  public readonly userObservable: Observable<User>                                                    = new Observable<User | null>(
    (userObserver: Observer<User | null>): TeardownLogic => {
      if (this.auth.currentUser)
        userObserver.next(this.auth.currentUser);
      else
        this.auth.authStateReady().then<void>((): void => userObserver.next(this.auth.currentUser));

      return onIdTokenChanged(
        this.auth,
        (user: User | null): void => userObserver.next(user),
        (error: Error): never => {
          userObserver.error(error);

          throw error;
        },
        (): void => userObserver.complete(),
      );
    },
  ).pipe<User | null, User | null, User>(
    distinctUntilChanged<User | null>(),
    tap<User | null>(
      (user: User | null): void => {
        if (!user && isPlatformBrowser(this.platformId))
          signInAnonymously(this.auth).catch<never>(
            (firebaseError: FirebaseError): never => {
              console.error(firebaseError.code);

              throw firebaseError;
            },
          );
      },
    ),
    filter<User | null, User>((user: User | null): user is User => !!user),
  );
  public readonly idToken$: Signal<string | undefined>                                                = toSignal<string>(
    this.userObservable.pipe<string>(
      this.rxSsrService.wrap<User, string>(
        switchMap<User, Observable<string>>((user: User): Observable<string> => from<Promise<string>>(user.getIdToken())),
        "0196bb78-e41c-765c-90c7-ea9ba3661398",
      ),
    ),
  );
  public readonly isAdmin$: Signal<boolean | undefined>                                               = toSignal<boolean | undefined>(
    this.userObservable.pipe<boolean | undefined>(
      this.rxSsrService.wrap<User, boolean | undefined>(
        switchMap<User, Observable<boolean | undefined>>(
          (
            {
              isAnonymous,
              uid: userId,
            }: User,
          ): Observable<boolean | undefined> => {
            if (isAnonymous)
              return of<false>(false);

            return from<Promise<boolean>>(
              this.adminAuth ? this.adminAuth.getUser(userId).then<boolean>(({ customClaims }: AdminUserRecord): boolean => customClaims?.["admin"] || false) : getCallableCloudFunction(
                this.functions,
                "getIsAdmin",
              )(),
            ).pipe<boolean | undefined>(
              catchError<boolean, Observable<undefined>>(
                (error: Error): Observable<undefined> => {
                  console.error(
                    "Something went wrong.",
                    error,
                  );

                  return of<undefined>(undefined);
                },
              ),
            );
          },
        ),
        "0196bb78-3747-76b4-adc4-3cf6d0f444a9",
      ),
    ),
  );
  public readonly user$: Signal<User | undefined>                                                     = toSignal<User>(this.userObservable.pipe<User>(this.rxSsrService.useState<User>("019672d4-6be7-75ef-b881-2cb04bc0ce7f")));

  public async createUserWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this.auth,
      email,
      password,
    ).catch<never>(
      (firebaseError: FirebaseError): never => {
        this.errorsService.createError(getAuthErrorMessage(firebaseError));

        throw firebaseError;
      },
    );
  }
  public async createUserWithPasskey(name: string): Promise<UserCredential> {
    return createUserWithPasskey(
      this.auth,
      this.functions,
      name,
    ).catch<never>(
      (firebaseWebAuthnError: FirebaseWebAuthnError): never => {
        this.errorsService.createError(firebaseWebAuthnError.message);

        throw firebaseWebAuthnError;
      },
    );
  }
  public async signInAnonymously(): Promise<void> {
    return signInAnonymously(this.auth).then<void, never>(
      (): void => void (0),
      (firebaseError: FirebaseError): never => {
        this.errorsService.createError(getAuthErrorMessage(firebaseError));

        throw firebaseError;
      },
    );
  }
  public async signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserCredential> {
    return signInWithEmailAndPassword(
      this.auth,
      email,
      password,
    ).catch<never>(
      (firebaseError: FirebaseError): never => {
        this.errorsService.createError(getAuthErrorMessage(firebaseError));

        throw firebaseError;
      },
    );
  }
  public async signInWithPasskey(): Promise<UserCredential> {
    return signInWithPasskey(
      this.auth,
      this.functions,
    ).catch<never>(
      (firebaseWebAuthnError: FirebaseWebAuthnError): never => {
        this.errorsService.createError(firebaseWebAuthnError.code === "firebaseWebAuthn/no-op" ? "You're already signed in as this user." : firebaseWebAuthnError.message);

        throw firebaseWebAuthnError;
      },
    );
  }
  public async verifyUserWithPasskey(): Promise<void> {
    return verifyUserWithPasskey(
      this.auth,
      this.functions,
    ).then<void, never>(
      (): void => void (0),
      (firebaseWebAuthnError: FirebaseWebAuthnError): never => {
        this.errorsService.createError(firebaseWebAuthnError.message);

        throw firebaseWebAuthnError;
      },
    );
  }

}
