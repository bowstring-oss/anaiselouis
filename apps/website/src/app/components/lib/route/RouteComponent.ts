/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { ChangeDetectionStrategy, Component, inject, Injector, input, type InputSignal, type OnInit, type Signal, TemplateRef, viewChild }                                                                                                                                                                                                               from "@angular/core";
import { toObservable, toSignal }                                                                                                                                                                                                                                                                                                                        from "@angular/core/rxjs-interop";
import { Meta }                                                                                                                                                                                                                                                                                                                                          from "@angular/platform-browser";
import { ActivatedRoute, RouterOutlet, type Routes }                                                                                                                                                                                                                                                                                                     from "@angular/router";
import { PROJECT_ROUTES }                                                                                                                                                                                                                                                                                                                                from "@bowstring/core";
import { type AboveComponent, type AsideComponent, type BannerComponent, type BelowComponent, ChildRouteHeaderDirective, type FooterComponent, type HeaderComponent, type InspectorComponent, RouteAboveDirective, RouteAsideDirective, RouteBannerDirective, RouteBelowDirective, RouteFooterDirective, RouteHeaderDirective, RouteInspectorDirective } from "@bowstring/surface";
import { combineLatestWith, map, mergeWith, type Observable, of, startWith, switchMap }                                                                                                                                                                                                                                                                  from "rxjs";
import { projectRoutesProvider }                                                                                                                                                                                                                                                                                                                         from "../routes";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers:       [ projectRoutesProvider ],
    template:        "",

    standalone: true,
  },
)
export class RouteComponent
  implements OnInit {

  private readonly aboveTemplateRef$Self: Signal<TemplateRef<AboveComponent> | undefined>         = viewChild<RouteAboveDirective, TemplateRef<AboveComponent>>(
    RouteAboveDirective,
    { read: TemplateRef<AboveComponent> },
  );
  private readonly asideTemplateRef$Self: Signal<TemplateRef<AsideComponent> | undefined>         = viewChild<RouteAsideDirective, TemplateRef<AsideComponent>>(
    RouteAsideDirective,
    { read: TemplateRef<AsideComponent> },
  );
  private readonly bannerTemplateRef$Self: Signal<TemplateRef<BannerComponent> | undefined>       = viewChild<RouteBannerDirective, TemplateRef<BannerComponent>>(
    RouteBannerDirective,
    { read: TemplateRef<BannerComponent> },
  );
  private readonly belowTemplateRef$Self: Signal<TemplateRef<BelowComponent> | undefined>         = viewChild<RouteBelowDirective, TemplateRef<BelowComponent>>(
    RouteBelowDirective,
    { read: TemplateRef<BelowComponent> },
  );
  private readonly inspectorTemplateRef$Self: Signal<TemplateRef<InspectorComponent> | undefined> = viewChild<RouteInspectorDirective, TemplateRef<InspectorComponent>>(
    RouteInspectorDirective,
    { read: TemplateRef<InspectorComponent> },
  );
  private readonly subheaderTemplateRef$Self: Signal<TemplateRef<HeaderComponent> | undefined>    = viewChild<ChildRouteHeaderDirective, TemplateRef<HeaderComponent>>(
    ChildRouteHeaderDirective,
    { read: TemplateRef<HeaderComponent> },
  );

  protected readonly activatedRoute: ActivatedRoute                      = inject<ActivatedRoute>(ActivatedRoute);
  protected readonly injector: Injector                                  = inject<Injector>(Injector);
  protected readonly meta: Meta                                          = inject<Meta>(Meta);
  protected readonly projectRoutes: Routes                               = inject<Routes>(PROJECT_ROUTES);
  protected readonly routerOutlet$: Signal<RouterOutlet | undefined>     = viewChild<RouterOutlet>(RouterOutlet);
  protected readonly routerOutletActivated$: Signal<boolean | undefined> = toSignal<boolean | undefined>(
    toObservable<RouterOutlet | undefined>(this.routerOutlet$).pipe<boolean | undefined, boolean | undefined>(
      switchMap<RouterOutlet | undefined, Observable<boolean | undefined>>(
        (routerOutlet?: RouterOutlet): Observable<boolean | undefined> => routerOutlet ? routerOutlet.activateEvents.pipe<true, boolean>(
          map<RouteComponent, true>((): true => true),
          mergeWith<true, [ false ]>(routerOutlet.deactivateEvents.pipe<false>(map<RouteComponent, false>((): false => false))),
        ) : of<undefined>(undefined),
      ),
      startWith<boolean | undefined, [ boolean ]>(!!this.activatedRoute.children.length),
    ),
    { requireSync: true },
  );

  public readonly aboveTemplateRef$: Signal<TemplateRef<AboveComponent> | undefined>         = toSignal<TemplateRef<AboveComponent> | undefined>(
    toObservable(this.aboveTemplateRef$Self).pipe<[ TemplateRef<AboveComponent> | undefined, TemplateRef<AboveComponent> | undefined ], TemplateRef<AboveComponent> | undefined>(
      combineLatestWith<TemplateRef<AboveComponent> | undefined, [ TemplateRef<AboveComponent> | undefined ]>(
        toObservable<RouterOutlet | undefined>(this.routerOutlet$).pipe<TemplateRef<AboveComponent> | undefined>(
          switchMap<RouterOutlet | undefined, Observable<TemplateRef<AboveComponent> | undefined>>(
            (routerOutlet?: RouterOutlet): Observable<TemplateRef<AboveComponent> | undefined> => routerOutlet?.activateEvents.pipe<RouteComponent | undefined, TemplateRef<AboveComponent> | undefined>(
              startWith<RouteComponent, [ RouteComponent | undefined ]>(routerOutlet?.isActivated ? routerOutlet.component as RouteComponent : undefined),
              switchMap<RouteComponent | undefined, Observable<TemplateRef<AboveComponent> | undefined>>(
                (routeComponent?: RouteComponent): Observable<TemplateRef<AboveComponent> | undefined> => routeComponent ? toObservable<TemplateRef<AboveComponent> | undefined>(
                  routeComponent.aboveTemplateRef$,
                  { injector: this.injector },
                ) : of<undefined>(undefined),
              ),
            ) || of<undefined>(undefined),
          ),
        ),
      ),
      map<[ TemplateRef<AboveComponent> | undefined, TemplateRef<AboveComponent> | undefined ], TemplateRef<AboveComponent> | undefined>(
        (
          [
            aboveTemplateRefSelf,
            aboveTemplateRefChild,
          ]: [ TemplateRef<AboveComponent> | undefined, TemplateRef<AboveComponent> | undefined ],
        ): TemplateRef<AboveComponent> | undefined => aboveTemplateRefChild || aboveTemplateRefSelf,
      ),
    ),
  );
  public readonly asideTemplateRef$: Signal<TemplateRef<AsideComponent> | undefined>         = toSignal<TemplateRef<AsideComponent> | undefined>(
    toObservable(this.asideTemplateRef$Self).pipe<[ TemplateRef<AsideComponent> | undefined, TemplateRef<AsideComponent> | undefined ], TemplateRef<AsideComponent> | undefined>(
      combineLatestWith<TemplateRef<AsideComponent> | undefined, [ TemplateRef<AsideComponent> | undefined ]>(
        toObservable<RouterOutlet | undefined>(this.routerOutlet$).pipe<TemplateRef<AsideComponent> | undefined>(
          switchMap<RouterOutlet | undefined, Observable<TemplateRef<AsideComponent> | undefined>>(
            (routerOutlet?: RouterOutlet): Observable<TemplateRef<AsideComponent> | undefined> => routerOutlet?.activateEvents.pipe<RouteComponent | undefined, TemplateRef<AsideComponent> | undefined>(
              startWith<RouteComponent, [ RouteComponent | undefined ]>(routerOutlet?.isActivated ? routerOutlet.component as RouteComponent : undefined),
              switchMap<RouteComponent | undefined, Observable<TemplateRef<AsideComponent> | undefined>>(
                (routeComponent?: RouteComponent): Observable<TemplateRef<AsideComponent> | undefined> => routeComponent ? toObservable<TemplateRef<AsideComponent> | undefined>(
                  routeComponent.asideTemplateRef$,
                  { injector: this.injector },
                ) : of<undefined>(undefined),
              ),
            ) || of<undefined>(undefined),
          ),
        ),
      ),
      map<[ TemplateRef<AsideComponent> | undefined, TemplateRef<AsideComponent> | undefined ], TemplateRef<AsideComponent> | undefined>(
        (
          [
            asideTemplateRefSelf,
            asideTemplateRefChild,
          ]: [ TemplateRef<AsideComponent> | undefined, TemplateRef<AsideComponent> | undefined ],
        ): TemplateRef<AsideComponent> | undefined => asideTemplateRefChild || asideTemplateRefSelf,
      ),
    ),
  );
  public readonly bannerTemplateRef$: Signal<TemplateRef<BannerComponent> | undefined>       = toSignal<TemplateRef<BannerComponent> | undefined>(
    toObservable(this.bannerTemplateRef$Self).pipe<[ TemplateRef<BannerComponent> | undefined, TemplateRef<BannerComponent> | undefined ], TemplateRef<BannerComponent> | undefined>(
      combineLatestWith<TemplateRef<BannerComponent> | undefined, [ TemplateRef<BannerComponent> | undefined ]>(
        toObservable<RouterOutlet | undefined>(this.routerOutlet$).pipe<TemplateRef<BannerComponent> | undefined>(
          switchMap<RouterOutlet | undefined, Observable<TemplateRef<BannerComponent> | undefined>>(
            (routerOutlet?: RouterOutlet): Observable<TemplateRef<BannerComponent> | undefined> => routerOutlet?.activateEvents.pipe<RouteComponent | undefined, TemplateRef<BannerComponent> | undefined>(
              startWith<RouteComponent, [ RouteComponent | undefined ]>(routerOutlet?.isActivated ? routerOutlet.component as RouteComponent : undefined),
              switchMap<RouteComponent | undefined, Observable<TemplateRef<BannerComponent> | undefined>>(
                (routeComponent?: RouteComponent): Observable<TemplateRef<BannerComponent> | undefined> => routeComponent ? toObservable<TemplateRef<BannerComponent> | undefined>(
                  routeComponent.bannerTemplateRef$,
                  { injector: this.injector },
                ) : of<undefined>(undefined),
              ),
            ) || of<undefined>(undefined),
          ),
        ),
      ),
      map<[ TemplateRef<BannerComponent> | undefined, TemplateRef<BannerComponent> | undefined ], TemplateRef<BannerComponent> | undefined>(
        (
          [
            bannerTemplateRefSelf,
            bannerTemplateRefChild,
          ]: [ TemplateRef<BannerComponent> | undefined, TemplateRef<BannerComponent> | undefined ],
        ): TemplateRef<BannerComponent> | undefined => bannerTemplateRefChild || bannerTemplateRefSelf,
      ),
    ),
  );
  public readonly belowTemplateRef$: Signal<TemplateRef<BelowComponent> | undefined>         = toSignal<TemplateRef<BelowComponent> | undefined>(
    toObservable(this.belowTemplateRef$Self).pipe<[ TemplateRef<BelowComponent> | undefined, TemplateRef<BelowComponent> | undefined ], TemplateRef<BelowComponent> | undefined>(
      combineLatestWith<TemplateRef<BelowComponent> | undefined, [ TemplateRef<BelowComponent> | undefined ]>(
        toObservable<RouterOutlet | undefined>(this.routerOutlet$).pipe<TemplateRef<BelowComponent> | undefined>(
          switchMap<RouterOutlet | undefined, Observable<TemplateRef<BelowComponent> | undefined>>(
            (routerOutlet?: RouterOutlet): Observable<TemplateRef<BelowComponent> | undefined> => routerOutlet?.activateEvents.pipe<RouteComponent | undefined, TemplateRef<BelowComponent> | undefined>(
              startWith<RouteComponent, [ RouteComponent | undefined ]>(routerOutlet?.isActivated ? routerOutlet.component as RouteComponent : undefined),
              switchMap<RouteComponent | undefined, Observable<TemplateRef<BelowComponent> | undefined>>(
                (routeComponent?: RouteComponent): Observable<TemplateRef<BelowComponent> | undefined> => routeComponent ? toObservable<TemplateRef<BelowComponent> | undefined>(
                  routeComponent.belowTemplateRef$,
                  { injector: this.injector },
                ) : of<undefined>(undefined),
              ),
            ) || of<undefined>(undefined),
          ),
        ),
      ),
      map<[ TemplateRef<BelowComponent> | undefined, TemplateRef<BelowComponent> | undefined ], TemplateRef<BelowComponent> | undefined>(
        (
          [
            belowTemplateRefSelf,
            belowTemplateRefChild,
          ]: [ TemplateRef<BelowComponent> | undefined, TemplateRef<BelowComponent> | undefined ],
        ): TemplateRef<BelowComponent> | undefined => belowTemplateRefChild || belowTemplateRefSelf,
      ),
    ),
  );
  public readonly descriptionInput$: InputSignal<string>                                     = input.required<string>({ alias: "description" });
  public readonly footerTemplateRef$: Signal<TemplateRef<FooterComponent> | undefined>       = viewChild<RouteFooterDirective, TemplateRef<FooterComponent>>(
    RouteFooterDirective,
    { read: TemplateRef<FooterComponent> },
  );
  public readonly headerTemplateRef$: Signal<TemplateRef<HeaderComponent> | undefined>       = viewChild<RouteHeaderDirective, TemplateRef<HeaderComponent>>(
    RouteHeaderDirective,
    { read: TemplateRef<HeaderComponent> },
  );
  public readonly inspectorTemplateRef$: Signal<TemplateRef<InspectorComponent> | undefined> = toSignal<TemplateRef<InspectorComponent> | undefined>(
    toObservable(this.inspectorTemplateRef$Self).pipe<[ TemplateRef<InspectorComponent> | undefined, TemplateRef<InspectorComponent> | undefined ], TemplateRef<InspectorComponent> | undefined>(
      combineLatestWith<TemplateRef<InspectorComponent> | undefined, [ TemplateRef<InspectorComponent> | undefined ]>(
        toObservable<RouterOutlet | undefined>(this.routerOutlet$).pipe<TemplateRef<InspectorComponent> | undefined>(
          switchMap<RouterOutlet | undefined, Observable<TemplateRef<InspectorComponent> | undefined>>(
            (routerOutlet?: RouterOutlet): Observable<TemplateRef<InspectorComponent> | undefined> => routerOutlet?.activateEvents.pipe<RouteComponent | undefined, TemplateRef<InspectorComponent> | undefined>(
              startWith<RouteComponent, [ RouteComponent | undefined ]>(routerOutlet?.isActivated ? routerOutlet.component as RouteComponent : undefined),
              switchMap<RouteComponent | undefined, Observable<TemplateRef<InspectorComponent> | undefined>>(
                (routeComponent?: RouteComponent): Observable<TemplateRef<InspectorComponent> | undefined> => routeComponent ? toObservable<TemplateRef<InspectorComponent> | undefined>(
                  routeComponent.inspectorTemplateRef$,
                  { injector: this.injector },
                ) : of<undefined>(undefined),
              ),
            ) || of<undefined>(undefined),
          ),
        ),
      ),
      map<[ TemplateRef<InspectorComponent> | undefined, TemplateRef<InspectorComponent> | undefined ], TemplateRef<InspectorComponent> | undefined>(
        (
          [
            inspectorTemplateRefSelf,
            inspectorTemplateRefChild,
          ]: [ TemplateRef<InspectorComponent> | undefined, TemplateRef<InspectorComponent> | undefined ],
        ): TemplateRef<InspectorComponent> | undefined => inspectorTemplateRefChild || inspectorTemplateRefSelf,
      ),
    ),
  );
  public readonly subheaderTemplateRef$: Signal<TemplateRef<HeaderComponent> | undefined>    = toSignal<TemplateRef<HeaderComponent> | undefined>(
    toObservable(this.subheaderTemplateRef$Self).pipe<[ TemplateRef<HeaderComponent> | undefined, TemplateRef<HeaderComponent> | undefined ], TemplateRef<HeaderComponent> | undefined>(
      combineLatestWith<TemplateRef<HeaderComponent> | undefined, [ TemplateRef<HeaderComponent> | undefined ]>(
        toObservable<RouterOutlet | undefined>(this.routerOutlet$).pipe<TemplateRef<HeaderComponent> | undefined>(
          switchMap<RouterOutlet | undefined, Observable<TemplateRef<HeaderComponent> | undefined>>(
            (routerOutlet?: RouterOutlet): Observable<TemplateRef<HeaderComponent> | undefined> => routerOutlet?.activateEvents.pipe<RouteComponent | undefined, TemplateRef<HeaderComponent> | undefined>(
              startWith<RouteComponent, [ RouteComponent | undefined ]>(routerOutlet?.isActivated ? routerOutlet.component as RouteComponent : undefined),
              switchMap<RouteComponent | undefined, Observable<TemplateRef<HeaderComponent> | undefined>>(
                (routeComponent?: RouteComponent): Observable<TemplateRef<HeaderComponent> | undefined> => routeComponent ? toObservable<TemplateRef<HeaderComponent> | undefined>(
                  routeComponent.subheaderTemplateRef$,
                  { injector: this.injector },
                ) : of<undefined>(undefined),
              ),
            ) || of<undefined>(undefined),
          ),
        ),
      ),
      map<[ TemplateRef<HeaderComponent> | undefined, TemplateRef<HeaderComponent> | undefined ], TemplateRef<HeaderComponent> | undefined>(
        (
          [
            subheaderTemplateRefSelf,
            subheaderTemplateRefChild,
          ]: [ TemplateRef<HeaderComponent> | undefined, TemplateRef<HeaderComponent> | undefined ],
        ): TemplateRef<HeaderComponent> | undefined => subheaderTemplateRefChild || subheaderTemplateRefSelf,
      ),
    ),
  );

  public ngOnInit(): void {
    this.meta.updateTag(
      {
        name:    "description",
        content: this.descriptionInput$(),
      },
    );
  }

}
