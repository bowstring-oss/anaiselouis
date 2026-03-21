/*
 * Copyright © 2026 Anaïse Louis. All rights reserved.
 */

import { inject, Injectable, type Signal }                                                                                                        from "@angular/core";
import { toSignal }                                                                                                                               from "@angular/core/rxjs-interop";
import { type User }                                                                                                                              from "@angular/fire/auth";
import { collection, type CollectionReference, collectionSnapshots, type DocumentReference, Firestore, query, type QueryDocumentSnapshot, where } from "@angular/fire/firestore";
import { AuthenticationService, RxSsrService }                                                                                                    from "@bowstring/core";
import { catchError, map, Observable, of, switchMap }                                                                                             from "rxjs";
import { type MessageDocument }                                                                                                                   from "../../interfaces";


@Injectable({ providedIn: "root" })
export class MessageService {

  private readonly authenticationService: AuthenticationService                                                                = inject<AuthenticationService>(AuthenticationService);
  private readonly firestore: Firestore                                                                                        = inject<Firestore>(Firestore);
  private readonly documentSnapshotObservable: Observable<QueryDocumentSnapshot<MessageDocument, MessageDocument> | undefined> = this.authenticationService.userObservable.pipe<QueryDocumentSnapshot<MessageDocument, MessageDocument> | undefined>(
    switchMap<User, Observable<QueryDocumentSnapshot<MessageDocument, MessageDocument> | undefined>>(
      ({ uid: userId }: User): Observable<QueryDocumentSnapshot<MessageDocument, MessageDocument> | undefined> => (collectionSnapshots<MessageDocument>(
        query<MessageDocument, MessageDocument>(
          collection(
            this.firestore,
            "messages",
          ) as CollectionReference<MessageDocument, MessageDocument>,
          where(
            "userId",
            "==",
            userId,
          ),
        ),
      ) as Observable<Array<QueryDocumentSnapshot<MessageDocument, MessageDocument>>>).pipe<Array<QueryDocumentSnapshot<MessageDocument, MessageDocument>> | undefined, QueryDocumentSnapshot<MessageDocument, MessageDocument> | undefined>(
        catchError<Array<QueryDocumentSnapshot<MessageDocument, MessageDocument>>, Observable<undefined>>((): Observable<undefined> => of<undefined>(undefined)),
        map<Array<QueryDocumentSnapshot<MessageDocument, MessageDocument>> | undefined, QueryDocumentSnapshot<MessageDocument, MessageDocument> | undefined>((documentSnapshots?: Array<QueryDocumentSnapshot<MessageDocument, MessageDocument>>): QueryDocumentSnapshot<MessageDocument, MessageDocument> | undefined => documentSnapshots?.[0]),
      ),
    ),
  );
  private readonly rxSsrService: RxSsrService                                                                                  = inject<RxSsrService>(RxSsrService);

  public readonly messageDocument$: Signal<MessageDocument | undefined>                                              = toSignal<MessageDocument | undefined>(
    this.documentSnapshotObservable.pipe<MessageDocument | undefined>(
      this.rxSsrService.wrap<QueryDocumentSnapshot<MessageDocument, MessageDocument> | undefined, MessageDocument | undefined>(
        map<QueryDocumentSnapshot<MessageDocument, MessageDocument> | undefined, MessageDocument | undefined>((documentSnapshot?: QueryDocumentSnapshot<MessageDocument, MessageDocument>): MessageDocument | undefined => documentSnapshot?.data()),
        "0198a002-2278-75af-98c6-efe4fbddd0ea",
      ),
    ),
  );
  public readonly messageDocumentReference$: Signal<DocumentReference<MessageDocument, MessageDocument> | undefined> = toSignal<DocumentReference<MessageDocument, MessageDocument> | undefined>(this.documentSnapshotObservable.pipe<DocumentReference<MessageDocument, MessageDocument> | undefined>(map<QueryDocumentSnapshot<MessageDocument, MessageDocument> | undefined, DocumentReference<MessageDocument, MessageDocument> | undefined>((documentSnapshot?: QueryDocumentSnapshot<MessageDocument, MessageDocument>): DocumentReference<MessageDocument, MessageDocument> | undefined => documentSnapshot?.ref)));

}
