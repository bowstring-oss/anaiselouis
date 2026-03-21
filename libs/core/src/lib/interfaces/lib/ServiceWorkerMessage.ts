/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

/** Represents a message sent from the main thread to the service worker. */
export interface ServiceWorkerMessage {
  "data": { "idToken": string };
  "eventType": "idTokenChanged";
}
