/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { isPlatformBrowser }                                    from "@angular/common";
import { inject, Injectable, PLATFORM_ID }                      from "@angular/core";
import { type FirebaseApp, initializeApp, initializeServerApp } from "@angular/fire/app";
import { type Request }                                         from "express";
import { ENVIRONMENT, REQUEST }                                 from "../../injection tokens";
import { type Environment }                                     from "../../interfaces";


@Injectable({ providedIn: "root" })
export class FirebaseAppService {

  private readonly environment: Environment         = inject<Environment>(ENVIRONMENT);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly request: Request | null          = inject<Request | null>(
    REQUEST,
    { optional: true },
  );

  public readonly firebaseApp: FirebaseApp = isPlatformBrowser(this.platformId) ? initializeApp(this.environment.apis.firebase) : initializeServerApp(
    this.environment.apis.firebase,
    {
      authIdToken:    this.request?.headersDistinct["authorization"]?.[0]?.split("Bearer ")[1] || this.request?.cookies["__session"],
      releaseOnDeref: this.request || undefined,
    },
  );

}
