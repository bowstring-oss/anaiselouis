/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { type FirestoreError } from "@angular/fire/firestore";


export function getFirestoreErrorMessage({ code }: FirestoreError): string {
  switch (code) {
    case "aborted":
      return $localize`:@@libs--Firebase-Interop--Errors--Firestore--Aborted:Operation aborted due to a conflict. Please retry.`;
    case "already-exists":
      return $localize`:@@libs--Firebase-Interop--Errors--Firestore--Already-Exists:Entity already exists.`;
    case "cancelled":
      return $localize`:@@libs--Firebase-Interop--Errors--Firestore--Cancelled:Operation cancelled.`;
    case "data-loss":
      return $localize`:@@libs--Firebase-Interop--Errors--Firestore--Data-Loss:Unrecoverable data loss occurred.`;
    case "deadline-exceeded":
      return $localize`:@@libs--Firebase-Interop--Errors--Firestore--Deadline-Exceeded:Operation deadline exceeded.`;
    case "failed-precondition":
      return $localize`:@@libs--Firebase-Interop--Errors--Firestore--Failed-Precondition:Operation failed–system preconditions not met.`;
    case "internal":
      return $localize`:@@libs--Firebase-Interop--Errors--Firestore--Internal:Internal error encountered.`;
    case "invalid-argument":
      return $localize`:@@libs--Firebase-Interop--Errors--Firestore--Invalid-Argument:Invalid argument provided.`;
    case "not-found":
      return $localize`:@@libs--Firebase-Interop--Errors--Firestore--Not-Found:Requested entity not found.`;
    case "out-of-range":
      return $localize`:@@libs--Firebase-Interop--Errors--Firestore--Out-Of-Range:Operation attempted beyond the valid range.`;
    case "permission-denied":
      return $localize`:@@libs--Firebase-Interop--Errors--Firestore--Permission-Denied:Permission denied.`;
    case "resource-exhausted":
      return $localize`:@@libs--Firebase-Interop--Errors--Firestore--Resource-Exhausted:Resource exhausted.`;
    case "unauthenticated":
      return $localize`:@@libs--Firebase-Interop--Errors--Firestore--Unauthenticated:Authentication required.`;
    case "unavailable":
      return $localize`:@@libs--Firebase-Interop--Errors--Firestore--Unavailable:Service temporarily unavailable. Please retry later.`;
    case "unimplemented":
      return $localize`:@@libs--Firebase-Interop--Errors--Firestore--Unimplemented:Operation not implemented.`;
    case "unknown":
      return $localize`:@@libs--Firebase-Interop--Errors--Firestore--Unknown:An unknown error occurred.`;
    default:
      return $localize`Something went wrong.`;
  }
}
