/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { platformBrowserDynamic }      from "@angular/platform-browser-dynamic";
import { SERVICE_WORKER_REGISTRATION } from "@bowstring/core";
import { firstValueFrom, fromEvent }   from "rxjs";
import { ProjectBrowserModule }        from "./modules";


void (async (): Promise<ServiceWorkerRegistration | undefined> => {
  if ("serviceWorker" in navigator)
    return navigator.serviceWorker.register(
      "/main.service-worker.js",
      { updateViaCache: "none" },
    ).catch<never>(
      (error: Error): never => {
        console.error("Service worker registration failed.");

        throw error;
      },
    );
  else {
    console.warn("Service worker registration not supported.");

    return undefined;
  }
})().then<void>(
  (serviceWorkerRegistration?: ServiceWorkerRegistration): Promise<void> => (async (): Promise<void | Event> => {
    if (document.readyState !== "complete" && document.readyState !== "interactive")
      return firstValueFrom<Event>(
        fromEvent<Event>(
          document,
          "readystatechange",
        ),
      );
  })().then<void>(
    (): Promise<void> => platformBrowserDynamic(
      serviceWorkerRegistration && [
        {
          provide:  SERVICE_WORKER_REGISTRATION,
          useValue: serviceWorkerRegistration,
        },
      ],
    ).bootstrapModule<ProjectBrowserModule>(
      ProjectBrowserModule,
      { ngZoneEventCoalescing: true },
    ).then<void>((): void => void (0)),
  ),
).catch<never>(
  (error: Error): never => {
    console.error("Something went wrong.");

    throw error;
  },
);
