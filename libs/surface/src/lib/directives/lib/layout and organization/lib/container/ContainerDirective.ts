/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { booleanAttribute, contentChild, Directive, input, type InputSignal, type InputSignalWithTransform, numberAttribute, type Signal, TemplateRef }                                                                                         from "@angular/core";
import { type BaselineAlignment, type DistributedAlignment, type FlexPositionalAlignment, type Inherit, type NormalAlignment, type Overflow, type Position, type ScalarString, type ScrollSnapAlign, type ScrollSnapStop, type ScrollSnapType } from "@bowstring/core";
import { ContainerBadgeSymbolDirective }                                                                                                                                                                                                        from "../../../structural";
import { FlexboxChildDirective }                                                                                                                                                                                                                from "../flexbox child/FlexboxChildDirective";
import { GridChildDirective }                                                                                                                                                                                                                   from "../grid child/GridChildDirective";


@Directive(
  {
    host:           {
      "[class.hideScrollbar]":                                             "hideScrollbarInput$()",
      "[style.--bowstring--container-directive--align-self-input]":        "alignSelfInput$()",
      "[style.--bowstring--container-directive--aspect-ratio-input]":      "aspectRatioInput$()",
      "[style.--bowstring--container-directive--margin-bottom-input]":     "marginBottomInput$()",
      "[style.--bowstring--container-directive--margin-sides-input]":      "marginSidesInput$()",
      "[style.--bowstring--container-directive--margin-top-input]":        "marginTopInput$()",
      "[style.--bowstring--container-directive--overflow-x-input]":        "overflowXInput$()",
      "[style.--bowstring--container-directive--overflow-y-input]":        "overflowYInput$()",
      "[style.--bowstring--container-directive--padding-bottom-input]":    "paddingBottomInput$()",
      "[style.--bowstring--container-directive--padding-sides-input]":     "paddingSidesInput$()",
      "[style.--bowstring--container-directive--padding-top-input]":       "paddingTopInput$()",
      "[style.--bowstring--container-directive--position-bottom-input]":   "positionBottomInput$()",
      "[style.--bowstring--container-directive--position-input]":          "positionInput$()",
      "[style.--bowstring--container-directive--position-left-input]":     "positionLeftInput$()",
      "[style.--bowstring--container-directive--position-right-input]":    "positionRightInput$()",
      "[style.--bowstring--container-directive--position-top-input]":      "positionTopInput$()",
      "[style.--bowstring--container-directive--scroll-snap-align-input]": "scrollSnapAlignInput$()",
      "[style.--bowstring--container-directive--scroll-snap-stop-input]":  "scrollSnapStopInput$()",
      "[style.--bowstring--container-directive--scroll-snap-type-input]":  "scrollSnapTypeInput$()",
    },
    hostDirectives: [
      {
        directive: FlexboxChildDirective,
        inputs:    [
          "flexBasis",
          "flexGrow",
          "flexShrink",
        ],
      },
      {
        directive: GridChildDirective,
        inputs:    [
          "gridColumnEnd",
          "gridColumnStart",
          "gridRowEnd",
          "gridRowStart",
        ],
      },
    ],

    standalone: true,
  },
)
export class ContainerDirective {

  public readonly alignSelfInput$: InputSignal<BaselineAlignment | DistributedAlignment | NormalAlignment | FlexPositionalAlignment | Inherit | undefined> = input<BaselineAlignment | DistributedAlignment | NormalAlignment | FlexPositionalAlignment | Inherit | undefined>(
    undefined,
    { alias: "alignSelf" },
  );
  public readonly aspectRatioInput$: InputSignalWithTransform<number | undefined, number | `${ number }`>                                                  = input<number | undefined, number | `${ number }`>(
    undefined,
    {
      alias:     "aspectRatio",
      transform: numberAttribute,
    },
  );
  public readonly badgeSymbolTemplateRef$: Signal<TemplateRef<ContainerBadgeSymbolDirective> | undefined>                                                  = contentChild<ContainerBadgeSymbolDirective, TemplateRef<ContainerBadgeSymbolDirective>>(
    ContainerBadgeSymbolDirective,
    {
      descendants: false,
      read:        TemplateRef,
    },
  );
  public readonly hideScrollbarInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`>                                        = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "hideScrollbar",
      transform: booleanAttribute,
    },
  );
  public readonly marginBottomInput$: InputSignal<ScalarString | Inherit | undefined>                                                                      = input<ScalarString | Inherit | undefined>(
    undefined,
    { alias: "marginBottom" },
  );
  public readonly marginSidesInput$: InputSignal<ScalarString | Inherit | undefined>                                                                       = input<ScalarString | Inherit | undefined>(
    undefined,
    { alias: "marginSides" },
  );
  public readonly marginTopInput$: InputSignal<ScalarString | Inherit | undefined>                                                                         = input<ScalarString | Inherit | undefined>(
    undefined,
    { alias: "marginTop" },
  );
  public readonly overflowXInput$: InputSignal<Overflow | Inherit | undefined>                                                                             = input<Overflow | Inherit | undefined>(
    undefined,
    { alias: "overflowX" },
  );
  public readonly overflowYInput$: InputSignal<Overflow | Inherit | undefined>                                                                             = input<Overflow | Inherit | undefined>(
    undefined,
    { alias: "overflowY" },
  );
  public readonly paddingBottomInput$: InputSignal<ScalarString | Inherit | undefined>                                                                     = input<ScalarString | Inherit | undefined>(
    undefined,
    { alias: "paddingBottom" },
  );
  public readonly positionInput$: InputSignal<Position | Inherit | undefined>                                                                              = input<Position | Inherit | undefined>(
    undefined,
    { alias: "position" },
  );
  public readonly paddingSidesInput$: InputSignal<ScalarString | Inherit | undefined>                                                                      = input<ScalarString | Inherit | undefined>(
    undefined,
    { alias: "paddingSides" },
  );
  public readonly paddingTopInput$: InputSignal<ScalarString | Inherit | undefined>                                                                        = input<ScalarString | Inherit | undefined>(
    undefined,
    { alias: "paddingTop" },
  );
  public readonly positionBottomInput$: InputSignal<ScalarString | Inherit | undefined>                                                                    = input<ScalarString | Inherit | undefined>(
    undefined,
    { alias: "positionBottom" },
  );
  public readonly positionLeftInput$: InputSignal<ScalarString | Inherit | undefined>                                                                      = input<ScalarString | Inherit | undefined>(
    undefined,
    { alias: "positionLeft" },
  );
  public readonly positionRightInput$: InputSignal<ScalarString | Inherit | undefined>                                                                     = input<ScalarString | Inherit | undefined>(
    undefined,
    { alias: "positionRight" },
  );
  public readonly positionTopInput$: InputSignal<ScalarString | Inherit | undefined>                                                                       = input<ScalarString | Inherit | undefined>(
    undefined,
    { alias: "positionTop" },
  );
  public readonly scrollSnapAlignInput$: InputSignal<ScrollSnapAlign | Inherit | undefined>                                                                = input<ScrollSnapAlign | Inherit | undefined>(
    undefined,
    { alias: "scrollSnapAlign" },
  );
  public readonly scrollSnapStopInput$: InputSignal<ScrollSnapStop | Inherit | undefined>                                                                  = input<ScrollSnapStop | Inherit | undefined>(
    undefined,
    { alias: "scrollSnapStop" },
  );
  public readonly scrollSnapTypeInput$: InputSignal<ScrollSnapType | Inherit | undefined>                                                                  = input<ScrollSnapType | Inherit | undefined>(
    undefined,
    { alias: "scrollSnapType" },
  );

}
