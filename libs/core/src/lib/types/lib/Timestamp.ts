/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { type Timestamp as AdminFirestoreTimestamp } from "firebase-admin/firestore";
import { type Timestamp as FirestoreTimestamp }      from "firebase/firestore";


export type Timestamp =
  | AdminFirestoreTimestamp
  | FirestoreTimestamp;
