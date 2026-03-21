/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { isPlatformBrowser, Location }                                                                                                                                                                                                                                                                                                                                                      from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, type Signal }                                                                                                                                                                                                                                                                                                                             from "@angular/core";
import { toSignal }                                                                                                                                                                                                                                                                                                                                                                         from "@angular/core/rxjs-interop";
import { type ActivationEnd, type ActivationStart, type ChildActivationEnd, type ChildActivationStart, type GuardsCheckEnd, type GuardsCheckStart, type NavigationCancel, NavigationEnd, type NavigationError, type NavigationStart, type ResolveEnd, type ResolveStart, type RouteConfigLoadEnd, type RouteConfigLoadStart, Router, type RouterEvent, type RoutesRecognized, type Scroll } from "@angular/router";
import { LOCALE_ID, type LocaleId }                                                                                                                                                                                                                                                                                                                                                         from "@bowstring/i18n";
import { filter, map, startWith }                                                                                                                                                                                                                                                                                                                                                           from "rxjs";


@Injectable({ providedIn: "root" })
export class PathService {

  private readonly localeId: LocaleId               = inject<LocaleId>(LOCALE_ID);
  private readonly location: Location               = inject<Location>(Location);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly router: Router                   = inject<Router>(Router);

  public readonly path$: Signal<`/${ string }`> = isPlatformBrowser(this.platformId) ? toSignal<`/${ string }`>(
    this.router.events.pipe<NavigationEnd, `/${ string }`, `/${ string }`>(
      filter<RouterEvent | NavigationStart | NavigationEnd | NavigationCancel | NavigationError | RoutesRecognized | GuardsCheckStart | GuardsCheckEnd | RouteConfigLoadStart | RouteConfigLoadEnd | ChildActivationStart | ChildActivationEnd | ActivationStart | ActivationEnd | Scroll | ResolveStart | ResolveEnd, NavigationEnd>((routerEvent: RouterEvent | NavigationStart | NavigationEnd | NavigationCancel | NavigationError | RoutesRecognized | GuardsCheckStart | GuardsCheckEnd | RouteConfigLoadStart | RouteConfigLoadEnd | ChildActivationStart | ChildActivationEnd | ActivationStart | ActivationEnd | Scroll | ResolveStart | ResolveEnd): routerEvent is NavigationEnd => routerEvent instanceof NavigationEnd),
      map<NavigationEnd, `/${ string }`>(({ url }: NavigationEnd): `/${ string }` => `/${ this.localeId }${ url.split("?")[0] }`),
      startWith<`/${ string }`, [ `/${ string }` ]>(`/${ this.localeId }${ this.location.path().split("?")[0] }`),
    ),
    { requireSync: true },
  ) : signal<`/${ string }`>(`/${ this.localeId + this.location.path().split("?")[0] }`);

}
