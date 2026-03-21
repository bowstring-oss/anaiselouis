/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { isPlatformBrowser, NgTemplateOutlet }                                                                                                                                                                                                      from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, contentChildren, type ElementRef, inject, Injector, input, type InputSignalWithTransform, numberAttribute, PLATFORM_ID, runInInjectionContext, signal, type Signal, TemplateRef, viewChild } from "@angular/core";
import { toObservable, toSignal }                                                                                                                                                                                                                   from "@angular/core/rxjs-interop";
import { ViewportService }                                                                                                                                                                                                                          from "@bowstring/core";
import { combineLatestWith, distinctUntilChanged, fromEvent, map, Observable, scan, startWith, switchMap }                                                                                                                                          from "rxjs";
import { ContainerDirective, ScrollStackItemDirective }                                                                                                                                                                                             from "../../../../../directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    host:            {
      "[style.--bowstring--scroll-stack--items-count]":                "itemsCount$()",
      "[style.--bowstring--scroll-stack--last-snapped-item-index]":    "lastSnappedItemIndex$()",
      "[style.--bowstring--scroll-stack--minimum-aspect-ratio-input]": "minimumAspectRatioInput$()",
      "[style.--bowstring--scroll-stack--viewport-vertical-offset]":   "viewportVerticalOffset$()",
    },
    hostDirectives:  [
      {
        directive: ContainerDirective,
        inputs:    [
          "alignSelf",
          "aspectRatio",
          "hideScrollbar",
          "marginBottom",
          "marginSides",
          "marginTop",
          "overflowX",
          "overflowY",
          "paddingBottom",
          "paddingSides",
          "paddingTop",
          "position",
          "positionBottom",
          "positionLeft",
          "positionRight",
          "positionTop",
          "scrollSnapAlign",
          "scrollSnapStop",
          "scrollSnapType",
        ],
      },
    ],
    imports:         [ NgTemplateOutlet ],
    selector:        "bowstring--scroll-stack",
    styleUrl:        "ScrollStackComponent.sass",
    templateUrl:     "ScrollStackComponent.html",

    standalone: true,
  },
)
export class ScrollStackComponent {

  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>>      = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");
  private readonly innerHtmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("innerHtmlDivElement");
  private readonly platformId: NonNullable<unknown>                            = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly injector: Injector                                          = inject<Injector>(Injector);

  protected readonly containerDirective: ContainerDirective                                            = inject<ContainerDirective>(ContainerDirective);
  protected readonly itemTemplateRefs$: Signal<Readonly<Array<TemplateRef<ScrollStackItemDirective>>>> = contentChildren<ScrollStackItemDirective, TemplateRef<ScrollStackItemDirective>>(
    ScrollStackItemDirective,
    {
      descendants: false,
      read:        TemplateRef,
    },
  );
  protected readonly itemsCount$: Signal<number>                                                       = computed<number>((): number => this.itemTemplateRefs$().length);
  protected readonly lastSnappedItemIndex$: Signal<number | undefined>                                 = isPlatformBrowser(this.platformId) ? toSignal<number | undefined>(
    toObservable<ElementRef<HTMLDivElement>>(this.innerHtmlDivElementRef$).pipe<number | undefined>(
      switchMap<ElementRef<HTMLDivElement>, Observable<number | undefined>>(
        ({ nativeElement: innerHtmlDivElement }: ElementRef<HTMLDivElement>): Observable<number | undefined> => fromEvent<Event>(
          innerHtmlDivElement,
          "scroll",
          { passive: true },
        ).pipe<Event | null, number, number, number | undefined>(
          startWith<Event, [ null ]>(null),
          map<Event | null, number>((): number => 1 + innerHtmlDivElement.scrollLeft / innerHtmlDivElement.clientWidth),
          distinctUntilChanged<number>(),
          scan<number, number | undefined>(
            (
              lastEmittedItemIndex: number | undefined,
              currentItemIndex: number,
            ): number | undefined => Number.isInteger(Math.round(currentItemIndex * 100) / 100) || Math.abs(currentItemIndex - (lastEmittedItemIndex || 0)) >= 1 ? Math.round(currentItemIndex * 100) / 100 : lastEmittedItemIndex,
          ),
        ),
      ),
    ),
  ) : signal<undefined>(undefined);
  protected readonly viewportService: ViewportService                                                  = inject<ViewportService>(ViewportService);
  protected readonly viewportVerticalOffset$: Signal<number | undefined>                               = isPlatformBrowser(this.platformId) ? toSignal<number | undefined>(
    toObservable<ElementRef<HTMLDivElement>>(this.htmlDivElementRef$).pipe<number | undefined>(
      switchMap<ElementRef<HTMLDivElement>, Observable<number | undefined>>(
        ({ nativeElement: htmlDivElement }: ElementRef<HTMLDivElement>): Observable<number | undefined> => runInInjectionContext<Observable<number | undefined>>(
          this.injector,
          (): Observable<number | undefined> => toObservable<number | undefined>(this.viewportService.height$).pipe<[ number | undefined, number | undefined, number | undefined ], number | undefined>(
            combineLatestWith<number | undefined, [ number | undefined, number | undefined ]>(
              toObservable<number | undefined>(this.viewportService.width$),
              toObservable<number | undefined>(this.viewportService.scrollTop$),
            ),
            map<[ number | undefined, number | undefined, number | undefined ], number | undefined>(
              ([ viewportHeight ]: [ number | undefined, number | undefined, number | undefined ]): number | undefined => {
                const domRect: DOMRect = htmlDivElement.getBoundingClientRect();

                return domRect.top + domRect.height / 2 - (viewportHeight || 0) / 2;
              },
            ),
          ),
        ),
      ),
    ),
  ) : signal<undefined>(undefined);

  public readonly minimumAspectRatioInput$: InputSignalWithTransform<number, number | `${ number }`> = input.required<number, number | `${ number }`>(
    {
      alias:     "minimumAspectRatio",
      transform: numberAttribute,
    },
  );

}
