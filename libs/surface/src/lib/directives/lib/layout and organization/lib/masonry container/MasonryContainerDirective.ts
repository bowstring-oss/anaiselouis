/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { isPlatformBrowser }                                                                                                                                                                                    from "@angular/common";
import { afterRender, computed, Directive, type ElementRef, inject, input, type InputSignal, type InputSignalWithTransform, numberAttribute, OnDestroy, PLATFORM_ID, signal, type Signal, type WritableSignal } from "@angular/core";
import { toObservable, toSignal }                                                                                                                                                                               from "@angular/core/rxjs-interop";
import { type Inherit, type ScalarString }                                                                                                                                                                      from "@bowstring/core";
import type Masonry                                                                                                                                                                                             from "masonry-layout";
import { filter, Observable, type Observer, switchMap, type TeardownLogic }                                                                                                                                     from "rxjs";
import { ContainerDirective }                                                                                                                                                                                   from "../container/ContainerDirective";


@Directive(
  {
    host:           {
      "[style.--bowstring--masonry-container-directive--column-width]":     "columnWidth$()",
      "[style.--bowstring--masonry-container-directive--columns-input]":    "columnsInput$()",
      "[style.--bowstring--masonry-container-directive--gap-column-input]": "gapColumnInput$()",
      "[style.--bowstring--masonry-container-directive--gap-row-input]":    "gapRowInput$()",
    },
    hostDirectives: [
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

    standalone: true,
  },
)
export class MasonryContainerDirective
  implements OnDestroy {

  constructor() {
    afterRender((): void => this.masonry$()?.layout?.());
  }

  private readonly masonry$: Signal<Masonry | undefined> = computed<Masonry | undefined>(
    (): Masonry | undefined => {
      const columnSizerHtmlDivElement: HTMLDivElement | undefined = this.columnSizerHtmlDivElementRef$()?.nativeElement;
      const gutterSizerHtmlDivElement: HTMLDivElement | undefined = this.gutterSizerHtmlDivElementRef$()?.nativeElement;
      const innerHtmlDivElement: HTMLDivElement | undefined       = this.innerHtmlDivElementRef$()?.nativeElement;

      if (columnSizerHtmlDivElement && gutterSizerHtmlDivElement && innerHtmlDivElement)
        return new (require("masonry-layout"))(
          innerHtmlDivElement,
          {
            columnWidth:        columnSizerHtmlDivElement,
            gutter:             gutterSizerHtmlDivElement,
            initLayout:         false,
            itemSelector:       ".bowstringMasonryChild",
            percentPosition:    true,
            transitionDuration: 0,
          },
        );

      return undefined;
    },
  );
  private readonly platformId: NonNullable<unknown>      = inject<NonNullable<unknown>>(PLATFORM_ID);

  public readonly columnSizerHtmlDivElementRef$: WritableSignal<ElementRef<HTMLDivElement> | undefined> = signal<undefined>(undefined);

  protected readonly columnWidth$: Signal<number | undefined> = isPlatformBrowser(this.platformId) ? toSignal<number>(
    toObservable<ElementRef<HTMLDivElement> | undefined>(this.columnSizerHtmlDivElementRef$).pipe<ElementRef<HTMLDivElement>, number>(
      filter<ElementRef<HTMLDivElement> | undefined, ElementRef<HTMLDivElement>>((columnSizerHtmlDivElementRef?: ElementRef<HTMLDivElement>): columnSizerHtmlDivElementRef is ElementRef<HTMLDivElement> => !!columnSizerHtmlDivElementRef),
      switchMap<ElementRef<HTMLDivElement>, Observable<number>>(
        ({ nativeElement: columnSizerHtmlDivElement }: ElementRef<HTMLDivElement>): Observable<number> => new Observable<number>(
          (columnWidthObserver: Observer<number>): TeardownLogic => {
            const resizeObserver: ResizeObserver = new ResizeObserver(([ { target: { clientWidth } } ]: Array<ResizeObserverEntry>): void => columnWidthObserver.next(clientWidth));

            resizeObserver.observe(columnSizerHtmlDivElement);

            return (): void => resizeObserver.disconnect();
          },
        ),
      ),
    ),
  ) : signal<undefined>(undefined);

  public readonly columnsInput$: InputSignalWithTransform<number | undefined, number | `${ number }`>   = input<number | undefined, number | `${ number }`>(
    undefined,
    {
      alias:     "columns",
      transform: numberAttribute,
    },
  );
  public readonly gapColumnInput$: InputSignal<ScalarString | Inherit | undefined>                      = input<ScalarString | Inherit | undefined>(
    undefined,
    { alias: "gapColumn" },
  );
  public readonly gapRowInput$: InputSignal<ScalarString | Inherit | undefined>                         = input<ScalarString | Inherit | undefined>(
    undefined,
    { alias: "gapRow" },
  );
  public readonly gutterSizerHtmlDivElementRef$: WritableSignal<ElementRef<HTMLDivElement> | undefined> = signal<undefined>(undefined);
  public readonly innerHtmlDivElementRef$: WritableSignal<ElementRef<HTMLDivElement> | undefined>       = signal<undefined>(undefined);

  public ngOnDestroy(): void {
    this.masonry$()?.destroy?.();
  }
  public reloadItems(): void {
    this.masonry$()?.reloadItems?.();
  }

}
