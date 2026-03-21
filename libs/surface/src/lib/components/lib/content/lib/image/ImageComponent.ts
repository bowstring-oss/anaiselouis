/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { NgOptimizedImage, NgTemplateOutlet }                                                                                                                                                                          from "@angular/common";
import { afterRender, booleanAttribute, ChangeDetectionStrategy, Component, type ElementRef, inject, input, type InputSignal, type InputSignalWithTransform, numberAttribute, type OutputRef, type Signal, viewChild } from "@angular/core";
import { outputFromObservable, toObservable, toSignal }                                                                                                                                                                from "@angular/core/rxjs-interop";
import { RouterLink, RouterLinkActive }                                                                                                                                                                                from "@angular/router";
import { type Dimensions }                                                                                                                                                                                             from "@bowstring/core";
import { combineLatestWith, fromEvent, map, type Observable, of, startWith, Subject, switchMap }                                                                                                                       from "rxjs";
import { CanvasDirective, ContainerDirective, ElevatedDirective, HoverTransformingDirective, WellRoundedDirective }                                                                                                    from "../../../../../directives";
import { HapticsService }                                                                                                                                                                                              from "../../../../../services";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    host:            {
      "[class.appearance-circular]":              "appearanceInput$() === 'circular'",
      "[class.appearance-transparent]":           "appearanceInput$() === 'transparent'",
      "[class.disabled]":                         "disabled$()",
      "[class.outputObservedOrHasUrlInput]":      "outputSubject.observed || urlInput$()",
      "[style.--bowstring--image--aspect-ratio]": "(widthInput$() || imageDimensions$()?.width || 0) + '/' + (heightInput$() || imageDimensions$()?.height || 0)",
    },
    hostDirectives:  [
      { directive: CanvasDirective },
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
      {
        directive: ElevatedDirective,
        inputs:    [
          "level",
          "materialOpacity",
        ],
      },
      { directive: HoverTransformingDirective },
      {
        directive: WellRoundedDirective,
        inputs:    [ "level" ],
      },
    ],
    imports:         [
      NgOptimizedImage,
      NgTemplateOutlet,
      RouterLink,
      RouterLinkActive,
    ],
    selector:        "bowstring--image",
    styleUrl:        "ImageComponent.sass",
    templateUrl:     "ImageComponent.html",

    standalone: true,
  },
)
export class ImageComponent {

  constructor() {
    afterRender(
      (): void => {
        this.hoverTransformingDirective.htmlElementRef$.set(this.htmlImageElementRef$());
        this.wellRoundedDirective.htmlElementRef$.set(this.htmlImageElementRef$());
      },
    );
  }

  private readonly htmlImageElementRef$: Signal<ElementRef<HTMLImageElement>> = viewChild.required<ElementRef<HTMLImageElement>>("htmlImageElement");
  private readonly routerLinkActive$: Signal<RouterLinkActive | undefined>    = viewChild<RouterLinkActive>(RouterLinkActive);

  protected readonly containerDirective: ContainerDirective                 = inject<ContainerDirective>(ContainerDirective);
  protected readonly hapticsService: HapticsService                         = inject<HapticsService>(HapticsService);
  protected readonly hoverTransformingDirective: HoverTransformingDirective = inject<HoverTransformingDirective>(HoverTransformingDirective);
  protected readonly imageDimensions$: Signal<Dimensions | undefined>       = toSignal<Dimensions | undefined>(
    toObservable<ElementRef<HTMLImageElement>>(this.htmlImageElementRef$).pipe<Dimensions>(
      switchMap<ElementRef<HTMLImageElement>, Observable<Dimensions>>(
        ({ nativeElement: htmlImageElement }: ElementRef<HTMLImageElement>): Observable<Dimensions> => fromEvent<Event>(
          htmlImageElement,
          "load",
        ).pipe<Dimensions>(
          map<Event, Dimensions>(
            (): Dimensions => ({
              height: htmlImageElement.height,
              width:  htmlImageElement.width,
            }),
          ),
        ),
      ),
    ),
  );
  protected readonly outputSubject: Subject<void>                           = new Subject<void>();
  protected readonly wellRoundedDirective: WellRoundedDirective             = inject<WellRoundedDirective>(WellRoundedDirective);

  public readonly altInput$: InputSignal<string | undefined>                                                               = input<string | undefined>(
    undefined,
    { alias: "alt" },
  );
  public readonly appearanceInput$: InputSignal<"circular" | "transparent" | undefined>                                    = input<"circular" | "transparent" | undefined>(
    undefined,
    { alias: "appearance" },
  );
  public readonly disabledInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }` | undefined> = input<boolean | undefined, "" | boolean | `${ boolean }` | undefined>(
    undefined,
    {
      alias:     "disabled",
      transform: booleanAttribute,
    },
  );
  public readonly disabled$: Signal<boolean | undefined>                                                                   = toSignal<boolean>(
    toObservable<boolean | undefined>(this.disabledInput$).pipe<[ boolean | undefined, boolean | undefined ], boolean>(
      combineLatestWith<boolean | undefined, [ boolean | undefined ]>(toObservable<RouterLinkActive | undefined>(this.routerLinkActive$).pipe<boolean | undefined>(switchMap<RouterLinkActive | undefined, Observable<boolean | undefined>>((routerLinkActive?: RouterLinkActive): Observable<boolean | undefined> => routerLinkActive?.isActiveChange.pipe<boolean | undefined>(startWith<boolean, [ boolean | undefined ]>(routerLinkActive?.isActive)) || of<undefined>(undefined)))),
      map<[ boolean | undefined, boolean | undefined ], boolean>(
        (
          [
            disabledInput,
            routerLinkActive,
          ]: [ boolean | undefined, boolean | undefined ],
        ): boolean => disabledInput || routerLinkActive || false,
      ),
    ),
  );
  public readonly exactInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }` | undefined>    = input<boolean | undefined, "" | boolean | `${ boolean }` | undefined>(
    undefined,
    {
      alias:     "exact",
      transform: booleanAttribute,
    },
  );
  public readonly heightInput$: InputSignalWithTransform<number | undefined, "" | number | `${ number }`>                  = input<number | undefined, "" | number | `${ number }`>(
    undefined,
    {
      alias:     "height",
      transform: numberAttribute,
    },
  );
  public readonly input$: InputSignal<string | URL>                                                                        = input.required<string | URL>({ alias: "input" });
  public readonly loadingInput$: InputSignal<"auto" | "eager" | "lazy" | undefined>                                        = input<"auto" | "eager" | "lazy" | undefined>(
    undefined,
    { alias: "loading" },
  );
  public readonly output: OutputRef<void>                                                                                  = outputFromObservable<void>(
    this.outputSubject,
    { alias: "output" },
  );
  public readonly urlInput$: InputSignal<string | undefined>                                                               = input<string | undefined>(
    undefined,
    { alias: "url" },
  );
  public readonly widthInput$: InputSignalWithTransform<number | undefined, "" | number | `${ number }`>                   = input<number | undefined, "" | number | `${ number }`>(
    undefined,
    {
      alias:     "width",
      transform: numberAttribute,
    },
  );

}
