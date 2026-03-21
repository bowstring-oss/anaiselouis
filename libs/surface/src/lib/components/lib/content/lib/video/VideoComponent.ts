/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { NgTemplateOutlet }                                                                                                                                                                            from "@angular/common";
import { afterRender, booleanAttribute, ChangeDetectionStrategy, Component, type ElementRef, inject, input, type InputSignal, type InputSignalWithTransform, numberAttribute, type Signal, viewChild } from "@angular/core";
import { CanvasDirective, ContainerDirective, ElevatedDirective, FlexboxContainerDirective, WellRoundedDirective }                                                                                     from "../../../../../directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives:  [
      { directive: CanvasDirective },
      {
        directive: ElevatedDirective,
        inputs:    [
          "level",
          "materialOpacity",
        ],
      },
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
      {
        directive: WellRoundedDirective,
        inputs:    [ "level" ],
      },
    ],
    selector:        "bowstring--video",
    styleUrl:        "VideoComponent.sass",
    templateUrl:     "VideoComponent.html",
    imports:         [ NgTemplateOutlet ],

    standalone: true,
  },
)
export class VideoComponent {

  constructor() {
    afterRender((): void => this.wellRoundedDirective.htmlElementRef$.set(this.htmlDivElementRef$()));
  }

  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>>     = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");
  private readonly htmlVideoElementRef$: Signal<ElementRef<HTMLVideoElement>> = viewChild.required<ElementRef<HTMLVideoElement>>("htmlVideoElement");

  protected readonly containerDirective: ContainerDirective     = inject<ContainerDirective>(ContainerDirective);
  protected readonly wellRoundedDirective: WellRoundedDirective = inject<WellRoundedDirective>(WellRoundedDirective);

  public readonly autoplayInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`>                = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "autoplay",
      transform: booleanAttribute,
    },
  );
  public readonly controlsInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`>                = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "controls",
      transform: booleanAttribute,
    },
  );
  public readonly disablePictureInPictureInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`> = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "disablePictureInPicture",
      transform: booleanAttribute,
    },
  );
  public readonly disableRemotePlaybackInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`>   = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "disableRemotePlayback",
      transform: booleanAttribute,
    },
  );
  public readonly heightInput$: InputSignalWithTransform<number, number | `${ number }`>                                      = input.required<number, number | `${ number }`>(
    {
      alias:     "height",
      transform: numberAttribute,
    },
  );
  public readonly loopInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`>                    = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "loop",
      transform: booleanAttribute,
    },
  );
  public readonly mutedInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`>                   = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "muted",
      transform: booleanAttribute,
    },
  );
  public readonly preloadInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`>                 = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "preload",
      transform: booleanAttribute,
    },
  );
  public readonly srcInput$: InputSignal<string>                                                                              = input.required<string>({ alias: "src" });
  public readonly widthInput$: InputSignalWithTransform<number, number | `${ number }`>                                       = input.required<number, number | `${ number }`>(
    {
      alias:     "width",
      transform: numberAttribute,
    },
  );

  public async pause(): Promise<void> {
    return this.htmlVideoElementRef$().nativeElement.pause();
  }
  public async play(): Promise<void> {
    return this.htmlVideoElementRef$().nativeElement.play();
  }

}
