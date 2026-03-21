// noinspection JSUnusedGlobalSymbols

/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { getApp }                                        from "firebase-admin/app";
import { getAppCheck, type VerifyAppCheckTokenResponse } from "firebase-admin/app-check";
import { type HttpsFunction, onRequest, type Request }   from "firebase-functions/https";
import { type Response }                                 from "../../types";


export const redirect: HttpsFunction = onRequest(
  {
    ingressSettings: "ALLOW_ALL",
    invoker:         "public",
  },
  (
    request: Request,
    response: Response,
  ): void => void getAppCheck(getApp()).verifyToken(
    `${ request.query["appCheckToken"] }`,
    { consume: true },
  ).then<void | Response>(
    ({ alreadyConsumed }: VerifyAppCheckTokenResponse): void | Response => {
      if (alreadyConsumed)
        return response.status(403).send("The App Check token has already been consumed.").end();

      response.redirect(`${ request.query["url"] }`);
    },
  ).catch<never>(
    (error: Error): never => {
      response.status(500).send("Something went wrong.").end();

      throw error;
    },
  ),
);
