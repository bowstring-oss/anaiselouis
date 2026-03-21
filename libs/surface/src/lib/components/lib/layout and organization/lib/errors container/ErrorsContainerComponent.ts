/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { isPlatformBrowser, NgTemplateOutlet }                                                                      from "@angular/common";
import { ChangeDetectionStrategy, Component, type ElementRef, inject, PLATFORM_ID, type Signal, signal, viewChild } from "@angular/core";
import { toObservable, toSignal }                                                                                   from "@angular/core/rxjs-interop";
import { Observable, type Observer, switchMap, type TeardownLogic }                                                 from "rxjs";
import { ContainerDirective, FlexboxContainerDirective }                                                            from "../../../../../directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    host:            {
      "[class.openOrClosing]":                         "true",
      "[class.open]":                                  "true",
      "[style.--bowstring--errors-container--height]": "height$()",
    },
    hostDirectives:  [
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
    imports:         [ NgTemplateOutlet ],
    selector:        "bowstring--errors-container",
    styleUrl:        "ErrorsContainerComponent.sass",
    templateUrl:     "ErrorsContainerComponent.html",

    standalone: true,
  },
)
export class ErrorsContainerComponent {

  private readonly platformId: NonNullable<unknown>                       = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");

  protected readonly containerDirective: ContainerDirective = inject<ContainerDirective>(ContainerDirective);
  protected readonly height$: Signal<number | undefined>    = isPlatformBrowser(this.platformId) ? toSignal<number>(
    toObservable<ElementRef<HTMLDivElement>>(this.htmlDivElementRef$).pipe<number>(
      switchMap<ElementRef<HTMLDivElement>, Observable<number>>(
        ({ nativeElement: htmlElement }: ElementRef<HTMLDivElement>): Observable<number> => new Observable<number>(
          (heightObserver: Observer<number>): TeardownLogic => {
            const resizeObserver: ResizeObserver = new ResizeObserver(([ { target: element } ]: Array<ResizeObserverEntry>): void => heightObserver.next(element.getBoundingClientRect().height));

            resizeObserver.observe(htmlElement);

            return (): void => resizeObserver.disconnect();
          },
        ),
      ),
    ),
  ) : signal<undefined>(undefined);

}
