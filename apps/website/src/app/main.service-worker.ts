/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { type ServiceWorkerMessage } from "@bowstring/core";


let idToken: string | undefined;

self.addEventListener<"activate">(
  "activate",
  (event: ExtendableEvent): void => event.waitUntil(clients.claim()),
);
self.addEventListener<"fetch">(
  "fetch",
  (fetchEvent: FetchEvent): void => {
    const url: URL = new URL(fetchEvent.request.url);

    if (url.pathname === "/firebase-web-authn-api" || url.origin !== self.location.origin)
      return fetchEvent.respondWith(fetch(fetchEvent.request));

    const headers: Headers = new Headers();

    fetchEvent.request.headers.forEach(
      (
        value: string,
        name: string,
      ): void => headers.append(
        name,
        value,
      ),
    );

    if (idToken)
      headers.append(
        "Authorization",
        `Bearer ${ idToken }`,
      );

    headers.append(
      "Time-Zone",
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    );

    fetchEvent.respondWith(
      (async (): Promise<string | null> => {
        if (fetchEvent.request.method !== "GET" && fetchEvent.request.method !== "HEAD") {
          if (fetchEvent.request.headers.get("Content-Type")?.includes("json"))
            return fetchEvent.request.json().then<string>((body: unknown): string => JSON.stringify(body));

          return fetchEvent.request.text();
        }

        return null;
      })().then<Response>(
        (body: string | null): Promise<Response> => (
          (
            {
              cache,
              credentials,
              keepalive,
              method,
              redirect,
              referrer,
              referrerPolicy,
              signal,
            }: Request,
          ): Promise<Response> => fetch(
            new Request(
              url,
              {
                body,
                cache,
                credentials,
                headers,
                keepalive,
                method,
                mode: "same-origin",
                redirect,
                referrer,
                referrerPolicy,
                signal,
              },
            ),
          )
        )(fetchEvent.request).catch<Response>((): Promise<Response> => fetch(fetchEvent.request)),
      ),
    );
  },
);
self.addEventListener<"install">(
  "install",
  (event: ExtendableEvent): void => event.waitUntil(self.skipWaiting()),
);
self.addEventListener<"message">(
  "message",
  (messageEvent: MessageEvent<ServiceWorkerMessage>): void => void (idToken = messageEvent.data.data.idToken),
);
