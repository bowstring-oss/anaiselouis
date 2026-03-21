/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { getApp }                                                          from "firebase-admin/app";
import { getAuth, type UserRecord }                                        from "firebase-admin/auth";
import { type CallableFunction, type CallableRequest, HttpsError, onCall } from "firebase-functions/https";


export const getIsAdmin: CallableFunction<null, Promise<boolean>, null> = onCall<null, Promise<boolean>, null>(
  { enforceAppCheck: true },
  async ({ auth: authData }: CallableRequest<null>): Promise<boolean> => {
    if (!authData?.uid)
      throw new HttpsError(
        "unauthenticated",
        "You're not signed in.",
      );

    return getAuth(getApp()).getUser(authData.uid).then<boolean, never>(
      ({ customClaims }: UserRecord): boolean => customClaims?.["admin"] || false,
      (error: Error): never => {
        console.error(error);

        throw new HttpsError(
          "unknown",
          "Something went wrong.",
        );
      },
    );
  },
);
