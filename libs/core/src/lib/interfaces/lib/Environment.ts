/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

/** Represents the contents of an environment file for an app. */
export interface Environment {
  "app": "console" | "website";
  "apis": {
    "firebase": {
      "apiKey": string;
      "appId": string;
      "authDomain": string;
      "databaseURL"?: string;
      "measurementId"?: string;
      "messagingSenderId": string;
      "projectId": string;
      "storageBucket": string;
    };
    "recaptcha": {
      "siteKey": string;
    };
  };
  "production": boolean;
  "subdomain"?: string;
}
