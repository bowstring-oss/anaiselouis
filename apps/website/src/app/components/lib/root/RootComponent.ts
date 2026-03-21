/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { DOCUMENT, isPlatformBrowser }                                                                                                                                                                                  from "@angular/common";
import { ChangeDetectionStrategy, Component, effect, inject, Injector, PLATFORM_ID, signal, type Signal, type TemplateRef, viewChild }                                                                                  from "@angular/core";
import { toObservable, toSignal }                                                                                                                                                                                       from "@angular/core/rxjs-interop";
import { AppCheck, type AppCheckTokenResult, getLimitedUseToken }                                                                                                                                                       from "@angular/fire/app-check";
import { RouterOutlet, type Routes }                                                                                                                                                                                    from "@angular/router";
import { CONFIG_LIB, type ConfigLib }                                                                                                                                                                                   from "@bowstring/config";
import { AuthenticationService, ConnectivityService, DateFormat, DatePipe, ENVIRONMENT, type Environment, ErrorsService, GIT_INFO_PARTIAL, PACKAGE_VERSION, PROJECT_NAME, PROJECT_ROUTES, SERVICE_WORKER_REGISTRATION } from "@bowstring/core";
import { LOCALE_ID, LOCALE_IDS, type LocaleId, type LocaleIds }                                                                                                                                                         from "@bowstring/i18n";
import { type AboveComponent, type AsideComponent, type BannerComponent, type BelowComponent, CanvasDirective, FlexboxContainerDirective, type FooterComponent, type HeaderComponent, type InspectorComponent }         from "@bowstring/surface";
import { type GitInfo }                                                                                                                                                                                                 from "git-describe";
import { map, Observable, type Observer, of, startWith, switchMap, type TeardownLogic }                                                                                                                                 from "rxjs";
import { type RouteComponent }                                                                                                                                                                                          from "../../";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    host:            { "[style.--bowstring--root--font-family]": "configLib.brand.fontFamily" },
    hostDirectives:  [
      { directive: CanvasDirective },
      {
        directive: FlexboxContainerDirective,
        inputs:    [
          "alignContent",
          "alignItems",
          "flexDirection",
          "flexWrap",
          "gapColumn",
          "gapRow",
          "justifyContent",
        ],
      },
    ],
    selector:        "bowstring-app--root",
    standalone:      false,
    styleUrl:        "RootComponent.sass",
    templateUrl:     "RootComponent.html",
  },
)
export class RootComponent {

  constructor() {
    effect(
      (): void => {
        const idToken: string | undefined = this.authenticationService.idToken$();

        if (idToken)
          this.serviceWorkerRegistration?.active?.postMessage(
            {
              data:      { idToken },
              eventType: "idTokenChanged",
            },
          );
      },
    );
  }

  private readonly appCheck: AppCheck                                          = inject<AppCheck>(AppCheck);
  private readonly datePipe: DatePipe                                          = inject<DatePipe>(DatePipe);
  private readonly document: Document                                          = inject<Document>(DOCUMENT);
  private readonly environment: Environment                                    = inject<Environment>(ENVIRONMENT);
  private readonly injector: Injector                                          = inject<Injector>(Injector);
  private readonly platformId: NonNullable<unknown>                            = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly routerOutlet$: Signal<RouterOutlet>                         = viewChild.required<RouterOutlet>(RouterOutlet);
  private readonly serviceWorkerRegistration: ServiceWorkerRegistration | null = inject<ServiceWorkerRegistration>(
    SERVICE_WORKER_REGISTRATION,
    { optional: true },
  );

  protected readonly aboveTemplateRef$: Signal<TemplateRef<AboveComponent> | undefined>         = toSignal<TemplateRef<AboveComponent> | undefined>(
    toObservable<RouterOutlet>(this.routerOutlet$).pipe<TemplateRef<AboveComponent> | undefined>(
      switchMap<RouterOutlet, Observable<TemplateRef<AboveComponent> | undefined>>(
        (routerOutlet: RouterOutlet): Observable<TemplateRef<AboveComponent> | undefined> => routerOutlet.activateEvents.pipe<RouteComponent | undefined, TemplateRef<AboveComponent> | undefined>(
          startWith<RouteComponent, [ RouteComponent | undefined ]>(routerOutlet.isActivated ? routerOutlet.component as RouteComponent : undefined),
          switchMap<RouteComponent | undefined, Observable<TemplateRef<AboveComponent> | undefined>>(
            (routeComponent?: RouteComponent): Observable<TemplateRef<AboveComponent> | undefined> => routeComponent ? toObservable<TemplateRef<AboveComponent> | undefined>(
              routeComponent.aboveTemplateRef$,
              { injector: this.injector },
            ) : of<undefined>(undefined),
          ),
        ),
      ),
    ),
  );
  protected readonly asideTemplateRef$: Signal<TemplateRef<AsideComponent> | undefined>         = toSignal<TemplateRef<AsideComponent> | undefined>(
    toObservable<RouterOutlet>(this.routerOutlet$).pipe<TemplateRef<AsideComponent> | undefined>(
      switchMap<RouterOutlet, Observable<TemplateRef<AsideComponent> | undefined>>(
        (routerOutlet: RouterOutlet): Observable<TemplateRef<AsideComponent> | undefined> => routerOutlet.activateEvents.pipe<RouteComponent | undefined, TemplateRef<AsideComponent> | undefined>(
          startWith<RouteComponent, [ RouteComponent | undefined ]>(routerOutlet.isActivated ? routerOutlet.component as RouteComponent : undefined),
          switchMap<RouteComponent | undefined, Observable<TemplateRef<AsideComponent> | undefined>>(
            (routeComponent?: RouteComponent): Observable<TemplateRef<AsideComponent> | undefined> => routeComponent ? toObservable<TemplateRef<AsideComponent> | undefined>(
              routeComponent.asideTemplateRef$,
              { injector: this.injector },
            ) : of<undefined>(undefined),
          ),
        ),
      ),
    ),
  );
  protected readonly authenticationService: AuthenticationService                               = inject<AuthenticationService>(AuthenticationService);
  protected readonly bannerTemplateRef$: Signal<TemplateRef<BannerComponent> | undefined>       = toSignal<TemplateRef<BannerComponent> | undefined>(
    toObservable<RouterOutlet>(this.routerOutlet$).pipe<TemplateRef<BannerComponent> | undefined>(
      switchMap<RouterOutlet, Observable<TemplateRef<BannerComponent> | undefined>>(
        (routerOutlet: RouterOutlet): Observable<TemplateRef<BannerComponent> | undefined> => routerOutlet.activateEvents.pipe<RouteComponent | undefined, TemplateRef<BannerComponent> | undefined>(
          startWith<RouteComponent, [ RouteComponent | undefined ]>(routerOutlet.isActivated ? routerOutlet.component as RouteComponent : undefined),
          switchMap<RouteComponent | undefined, Observable<TemplateRef<BannerComponent> | undefined>>(
            (routeComponent?: RouteComponent): Observable<TemplateRef<BannerComponent> | undefined> => routeComponent ? toObservable<TemplateRef<BannerComponent> | undefined>(
              routeComponent.bannerTemplateRef$,
              { injector: this.injector },
            ) : of<undefined>(undefined),
          ),
        ),
      ),
    ),
  );
  protected readonly belowTemplateRef$: Signal<TemplateRef<BelowComponent> | undefined>         = toSignal<TemplateRef<BelowComponent> | undefined>(
    toObservable<RouterOutlet>(this.routerOutlet$).pipe<TemplateRef<BelowComponent> | undefined>(
      switchMap<RouterOutlet, Observable<TemplateRef<BelowComponent> | undefined>>(
        (routerOutlet: RouterOutlet): Observable<TemplateRef<BelowComponent> | undefined> => routerOutlet.activateEvents.pipe<RouteComponent | undefined, TemplateRef<BelowComponent> | undefined>(
          startWith<RouteComponent, [ RouteComponent | undefined ]>(routerOutlet.isActivated ? routerOutlet.component as RouteComponent : undefined),
          switchMap<RouteComponent | undefined, Observable<TemplateRef<BelowComponent> | undefined>>(
            (routeComponent?: RouteComponent): Observable<TemplateRef<BelowComponent> | undefined> => routeComponent ? toObservable<TemplateRef<BelowComponent> | undefined>(
              routeComponent.belowTemplateRef$,
              { injector: this.injector },
            ) : of<undefined>(undefined),
          ),
        ),
      ),
    ),
  );
  protected readonly configLib: ConfigLib                                                       = inject<ConfigLib>(CONFIG_LIB);
  protected readonly brandShortTime$: Signal<string | undefined>                                = this.configLib.brand.timeZone ? isPlatformBrowser(this.platformId) ? toSignal<string>(
    new Observable<Date>(
      (dateObserver: Observer<Date>): TeardownLogic => {
        const getTimeout: () => ReturnType<typeof setTimeout> = (): ReturnType<typeof setTimeout> => setTimeout(
          (): void => {
            dateObserver.next(new Date());

            timeout = getTimeout();
          },
          ((date: Date): number => (60 - date.getSeconds()) * 1000 - date.getMilliseconds())(new Date()),
        );

        let timeout: ReturnType<typeof setTimeout> = getTimeout();

        return (): void => clearTimeout(timeout);
      },
    ).pipe<Date, string>(
      startWith<Date>(new Date()),
      map<Date, string>(
        (date: Date): string => this.datePipe.transform(
          date,
          DateFormat.ShortTime,
          this.configLib.brand.timeZone,
        ),
      ),
    ),
    { requireSync: true },
  ) : signal<string | undefined>(
    this.datePipe.transform(
      new Date(),
      DateFormat.ShortTime,
      this.configLib.brand.timeZone,
    ),
  ) : signal<undefined>(undefined);
  protected readonly connectivityService: ConnectivityService                                   = inject<ConnectivityService>(ConnectivityService);
  protected readonly errorsService: ErrorsService                                               = inject<ErrorsService>(ErrorsService);
  protected readonly footerTemplateRef$: Signal<TemplateRef<FooterComponent> | undefined>       = toSignal<TemplateRef<FooterComponent> | undefined>(
    toObservable<RouterOutlet>(this.routerOutlet$).pipe<TemplateRef<FooterComponent> | undefined>(
      switchMap<RouterOutlet, Observable<TemplateRef<FooterComponent> | undefined>>(
        (routerOutlet: RouterOutlet): Observable<TemplateRef<FooterComponent> | undefined> => routerOutlet.activateEvents.pipe<RouteComponent | undefined, TemplateRef<FooterComponent> | undefined>(
          startWith<RouteComponent, [ RouteComponent | undefined ]>(routerOutlet.isActivated ? routerOutlet.component as RouteComponent : undefined),
          switchMap<RouteComponent | undefined, Observable<TemplateRef<FooterComponent> | undefined>>(
            (routeComponent?: RouteComponent): Observable<TemplateRef<FooterComponent> | undefined> => routeComponent ? toObservable<TemplateRef<FooterComponent> | undefined>(
              routeComponent.footerTemplateRef$,
              { injector: this.injector },
            ) : of<undefined>(undefined),
          ),
        ),
      ),
    ),
  );
  protected readonly gitInfoPartial: Partial<GitInfo>                                           = inject<Partial<GitInfo>>(GIT_INFO_PARTIAL);
  protected readonly headerTemplateRef$: Signal<TemplateRef<HeaderComponent> | undefined>       = toSignal<TemplateRef<HeaderComponent> | undefined>(
    toObservable<RouterOutlet>(this.routerOutlet$).pipe<TemplateRef<HeaderComponent> | undefined>(
      switchMap<RouterOutlet, Observable<TemplateRef<HeaderComponent> | undefined>>(
        (routerOutlet: RouterOutlet): Observable<TemplateRef<HeaderComponent> | undefined> => routerOutlet.activateEvents.pipe<RouteComponent | undefined, TemplateRef<HeaderComponent> | undefined>(
          startWith<RouteComponent, [ RouteComponent | undefined ]>(routerOutlet.isActivated ? routerOutlet.component as RouteComponent : undefined),
          switchMap<RouteComponent | undefined, Observable<TemplateRef<HeaderComponent> | undefined>>(
            (routeComponent?: RouteComponent): Observable<TemplateRef<HeaderComponent> | undefined> => routeComponent ? toObservable<TemplateRef<HeaderComponent> | undefined>(
              routeComponent.headerTemplateRef$,
              { injector: this.injector },
            ) : of<undefined>(undefined),
          ),
        ),
      ),
    ),
  );
  protected readonly inspectorTemplateRef$: Signal<TemplateRef<InspectorComponent> | undefined> = toSignal<TemplateRef<InspectorComponent> | undefined>(
    toObservable<RouterOutlet>(this.routerOutlet$).pipe<TemplateRef<InspectorComponent> | undefined>(
      switchMap<RouterOutlet, Observable<TemplateRef<InspectorComponent> | undefined>>(
        (routerOutlet: RouterOutlet): Observable<TemplateRef<InspectorComponent> | undefined> => routerOutlet.activateEvents.pipe<RouteComponent | undefined, TemplateRef<InspectorComponent> | undefined>(
          startWith<RouteComponent, [ RouteComponent | undefined ]>(routerOutlet.isActivated ? routerOutlet.component as RouteComponent : undefined),
          switchMap<RouteComponent | undefined, Observable<TemplateRef<InspectorComponent> | undefined>>(
            (routeComponent?: RouteComponent): Observable<TemplateRef<InspectorComponent> | undefined> => routeComponent ? toObservable<TemplateRef<InspectorComponent> | undefined>(
              routeComponent.inspectorTemplateRef$,
              { injector: this.injector },
            ) : of<undefined>(undefined),
          ),
        ),
      ),
    ),
  );
  protected readonly localeIds: LocaleIds                                                       = inject<LocaleIds>(LOCALE_IDS);
  protected readonly localeDisplayNames: Record<LocaleId, string>                               = Object.fromEntries<string>(
    this.localeIds.map<[ LocaleId, string ]>(
      (localeId: LocaleId): [ LocaleId, string ] => [
        localeId,
        new Intl.DisplayNames(
          [ localeId ],
          { type: "language" },
        ).of(localeId) || localeId,
      ],
    ),
  ) as Record<LocaleId, string>;
  protected readonly localeId: LocaleId                                                         = inject<LocaleId>(LOCALE_ID);
  protected readonly projectName: string                                                        = inject<string>(PROJECT_NAME);
  protected readonly projectRoutes: Routes                                                      = inject<Routes>(PROJECT_ROUTES);
  protected readonly packageVersion: string                                                     = inject<string>(PACKAGE_VERSION);
  protected readonly subheaderTemplateRef$: Signal<TemplateRef<HeaderComponent> | undefined>    = toSignal<TemplateRef<HeaderComponent> | undefined>(
    toObservable<RouterOutlet>(this.routerOutlet$).pipe<TemplateRef<HeaderComponent> | undefined>(
      switchMap<RouterOutlet, Observable<TemplateRef<HeaderComponent> | undefined>>(
        (routerOutlet: RouterOutlet): Observable<TemplateRef<HeaderComponent> | undefined> => routerOutlet.activateEvents.pipe<RouteComponent | undefined, TemplateRef<HeaderComponent> | undefined>(
          startWith<RouteComponent, [ RouteComponent | undefined ]>(routerOutlet.isActivated ? routerOutlet.component as RouteComponent : undefined),
          switchMap<RouteComponent | undefined, Observable<TemplateRef<HeaderComponent> | undefined>>(
            (routeComponent?: RouteComponent): Observable<TemplateRef<HeaderComponent> | undefined> => routeComponent ? toObservable<TemplateRef<HeaderComponent> | undefined>(
              routeComponent.subheaderTemplateRef$,
              { injector: this.injector },
            ) : of<undefined>(undefined),
          ),
        ),
      ),
    ),
  );

  protected async changeLocale(localeId: LocaleId): Promise<void> {
    if (isPlatformBrowser(this.platformId))
      return getLimitedUseToken(this.appCheck).then<void, never>(
        ({ token }: AppCheckTokenResult): void => void (this.document.location.href = `https://us-central1-${ this.environment.apis.firebase.projectId }.cloudfunctions.net/redirect?appCheckToken=${ encodeURIComponent(token) }&url=${ encodeURIComponent(`${ this.document.location.origin }/${ localeId }/${ this.document.location.pathname.split("/").slice(2).join("/") }${ this.document.location.search }`) }`),
        (error: Error): never => {
          console.error("Something went wrong.");

          throw error;
        },
      );
  }
}
