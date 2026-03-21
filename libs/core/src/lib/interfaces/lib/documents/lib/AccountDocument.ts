/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { type LocaleId }                         from "@bowstring/i18n";
import { MessagesType, PersonalInformationType } from "../../../../enums";
import { type Timestamp }                        from "../../../../types";


export interface AccountDocument {
  "connectedApps"?: {
    "appleMusic"?: {
      "musicUserToken": string;
      "expiry": Timestamp;
    };
    "spotify"?: { "refreshToken": string };
  };
  "email": string;
  "enabledMessages"?: Record<MessagesType, boolean>;
  "localeId": LocaleId;
  "phone"?: string;
  "profile"?: {
    "name"?: string;
    [PersonalInformationType.Birthday]?: Timestamp;
  };
  "security": {
    "passkey"?: boolean;
    "passkeyBackup"?: boolean;
    "password"?: boolean;
  };
}
