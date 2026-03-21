/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { type Functions, HttpsCallable, httpsCallable, type HttpsCallableOptions, type HttpsCallableResult } from "@angular/fire/functions";
import { type CallableFunction }                                                                             from "firebase-functions/https";
import type * as callableCloudFunctionsLib                                                                   from "./cloud functions/lib/callable";


/** Returns a strictly typed function corresponding to a callable cloud function in @bowstring/core.
 *
 * @example Calls {@link callableCloudFunctionsLib.getIsAdmin|getIsAdmin} without repeating its request/response types:
 * ```ts
 * getFunction(this.functions, "getIsAdmin")() // Promise<boolean>
 * ``` */
export function getCallableCloudFunction<key extends keyof typeof callableCloudFunctionsLib>(
  functions: Functions,
  name: key,
  httpsCallableOptions?: HttpsCallableOptions,
): typeof callableCloudFunctionsLib[key] extends CallableFunction<infer T, unknown> ? T extends null ? () => Promise<typeof callableCloudFunctionsLib[key] extends CallableFunction<unknown, Promise<infer R>> ? R : never> : (arg: typeof callableCloudFunctionsLib[key] extends CallableFunction<infer T, unknown> ? T : never) => Promise<typeof callableCloudFunctionsLib[key] extends CallableFunction<unknown, Promise<infer R>> ? R : never> : never {
  return ((arg?: typeof callableCloudFunctionsLib[key] extends CallableFunction<infer T, unknown> ? T : never): Promise<typeof callableCloudFunctionsLib[key] extends CallableFunction<unknown, Promise<infer R>> ? R : never> => ((httpsCallable: HttpsCallable<typeof callableCloudFunctionsLib[key] extends CallableFunction<infer T, unknown> ? T : never, typeof callableCloudFunctionsLib[key] extends CallableFunction<unknown, Promise<infer R>> ? R : never>): Promise<typeof callableCloudFunctionsLib[key] extends CallableFunction<unknown, Promise<infer R>> ? R : never> => httpsCallable(arg).then<typeof callableCloudFunctionsLib[key] extends CallableFunction<unknown, Promise<infer R>> ? R : never>(({ data }: HttpsCallableResult<typeof callableCloudFunctionsLib[key] extends CallableFunction<unknown, Promise<infer R>> ? R : never>): typeof callableCloudFunctionsLib[key] extends CallableFunction<unknown, Promise<infer R>> ? R : never => data))(
    httpsCallable<typeof callableCloudFunctionsLib[key] extends CallableFunction<infer T, unknown> ? T : never, typeof callableCloudFunctionsLib[key] extends CallableFunction<unknown, Promise<infer R>> ? R : never>(
      functions,
      name,
      httpsCallableOptions,
    ),
  )) as typeof callableCloudFunctionsLib[key] extends CallableFunction<infer T, unknown> ? T extends null ? () => Promise<typeof callableCloudFunctionsLib[key] extends CallableFunction<unknown, Promise<infer R>> ? R : never> : (arg: typeof callableCloudFunctionsLib[key] extends CallableFunction<infer T, unknown> ? T : never) => Promise<typeof callableCloudFunctionsLib[key] extends CallableFunction<unknown, Promise<infer R>> ? R : never> : never;
}
