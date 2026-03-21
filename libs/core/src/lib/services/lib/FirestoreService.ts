/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { inject, Injectable }           from "@angular/core";
import { type Firestore, getFirestore } from "@angular/fire/firestore";
import { FirebaseAppService }           from "./FirebaseAppService";


@Injectable({ providedIn: "root" })
export class FirestoreService {

  private readonly firebaseAppService: FirebaseAppService = inject<FirebaseAppService>(FirebaseAppService);

  public readonly firestore: Firestore = getFirestore(this.firebaseAppService.firebaseApp);

}
