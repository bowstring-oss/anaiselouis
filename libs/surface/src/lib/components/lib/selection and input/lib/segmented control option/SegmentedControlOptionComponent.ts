/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { isPlatformBrowser, NgTemplateOutlet }                                                                                                                                                             from "@angular/common";
import { afterRender, booleanAttribute, ChangeDetectionStrategy, Component, type ElementRef, inject, input, type InputSignal, type InputSignalWithTransform, PLATFORM_ID, signal, type Signal, viewChild } from "@angular/core";
import { toObservable, toSignal }                                                                                                                                                                          from "@angular/core/rxjs-interop";
import { Observable, type Observer, switchMap, type TeardownLogic }                                                                                                                                        from "rxjs";
import { ContainerDirective, FlexboxContainerDirective }                                                                                                                                                   from "../../../../../directives";
import { SEGMENTED_CONTROL_VALUE_ACCESSOR }                                                                                                                                                                from "../../../../../injection tokens";
import { type SegmentedControlValueAccessor }                                                                                                                                                              from "../../../../../interfaces";
import { HapticsService }                                                                                                                                                                                  from "../../../../../services";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    host:            {
      "[class.disabled]": "disabledInput$()",
      "[class.selected]": "afterRender && segmentedControlValueAccessor.getOptionIndex(segmentedControlValueAccessor.value) === segmentedControlValueAccessor.getOptionIndex(valueInput$())",
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
    selector:        "bowstring--segmented-control-option",
    styleUrl:        "SegmentedControlOptionComponent.sass",
    templateUrl:     "SegmentedControlOptionComponent.html",
    imports:         [ NgTemplateOutlet ],

    standalone: true,
  },
)
export class SegmentedControlOptionComponent {

  constructor() {
    afterRender((): void => void (this.afterRender = true));
  }

  private readonly htmlButtonElementRef$: Signal<ElementRef<HTMLButtonElement>> = viewChild.required<ElementRef<HTMLButtonElement>>("htmlButtonElement");
  private readonly platformId: NonNullable<unknown>                             = inject<NonNullable<unknown>>(PLATFORM_ID);

  protected readonly containerDirective: ContainerDirective                       = inject<ContainerDirective>(ContainerDirective);
  protected readonly hapticsService: HapticsService                               = inject<HapticsService>(HapticsService);
  protected readonly segmentedControlValueAccessor: SegmentedControlValueAccessor = inject<SegmentedControlValueAccessor>(
    SEGMENTED_CONTROL_VALUE_ACCESSOR,
    { host: true },
  );

  public readonly disabledInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }` | undefined> = input<boolean | undefined, "" | boolean | `${ boolean }` | undefined>(
    undefined,
    {
      alias:     "disabled",
      transform: booleanAttribute,
    },
  );
  public readonly valueInput$: InputSignal<string>                                                                         = input.required<string>({ alias: "value" });
  public readonly width$: Signal<number | undefined>                                                                       = isPlatformBrowser(this.platformId) ? toSignal<number>(
    toObservable<ElementRef<HTMLButtonElement>>(this.htmlButtonElementRef$).pipe<number>(
      switchMap<ElementRef<HTMLButtonElement>, Observable<number>>(
        ({ nativeElement: htmlButtonElement }: ElementRef<HTMLButtonElement>): Observable<number> => new Observable<number>(
          (widthObserver: Observer<number>): TeardownLogic => {
            const resizeObserver: ResizeObserver = new ResizeObserver(([ { target: element } ]: Array<ResizeObserverEntry>): void => widthObserver.next(element.getBoundingClientRect().width));

            resizeObserver.observe(htmlButtonElement);

            return (): void => resizeObserver.disconnect();
          },
        ),
      ),
    ),
  ) : signal<undefined>(undefined);

  protected afterRender: boolean = false as const;

}
