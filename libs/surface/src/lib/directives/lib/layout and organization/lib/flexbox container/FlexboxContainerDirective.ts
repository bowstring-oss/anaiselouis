/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { Directive, input, type InputSignal }                                                                                                                                        from "@angular/core";
import { type BaselineAlignment, type DistributedAlignment, type FlexDirection, type FlexPositionalAlignment, type FlexWrap, type Inherit, type NormalAlignment, type ScalarString } from "@bowstring/core";
import { ContainerDirective }                                                                                                                                                        from "../container/ContainerDirective";


@Directive(
  {
    host:           {
      "[style.--bowstring--flexbox-container-directive--align-content-input]":   "alignContentInput$()",
      "[style.--bowstring--flexbox-container-directive--align-items-input]":     "alignItemsInput$()",
      "[style.--bowstring--flexbox-container-directive--flex-direction-input]":  "flexDirectionInput$()",
      "[style.--bowstring--flexbox-container-directive--flex-wrap-input]":       "flexWrapInput$()",
      "[style.--bowstring--flexbox-container-directive--gap-column-input]":      "gapColumnInput$()",
      "[style.--bowstring--flexbox-container-directive--gap-row-input]":         "gapRowInput$()",
      "[style.--bowstring--flexbox-container-directive--justify-content-input]": "justifyContentInput$()",
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
export class FlexboxContainerDirective {

  public readonly alignContentInput$: InputSignal<BaselineAlignment | DistributedAlignment | NormalAlignment | FlexPositionalAlignment | Inherit | undefined> = input<BaselineAlignment | DistributedAlignment | NormalAlignment | FlexPositionalAlignment | Inherit | undefined>(
    undefined,
    { alias: "alignContent" },
  );
  public readonly alignItemsInput$: InputSignal<BaselineAlignment | DistributedAlignment | NormalAlignment | FlexPositionalAlignment | Inherit | undefined>   = input<BaselineAlignment | DistributedAlignment | NormalAlignment | FlexPositionalAlignment | Inherit | undefined>(
    undefined,
    { alias: "alignItems" },
  );
  public readonly flexDirectionInput$: InputSignal<FlexDirection | Inherit | undefined>                                                                       = input<FlexDirection | Inherit | undefined>(
    undefined,
    { alias: "flexDirection" },
  );
  public readonly flexWrapInput$: InputSignal<FlexWrap | Inherit | undefined>                                                                                 = input<FlexWrap | Inherit | undefined>(
    undefined,
    { alias: "flexWrap" },
  );
  public readonly gapColumnInput$: InputSignal<ScalarString | Inherit | undefined>                                                                            = input<ScalarString | Inherit | undefined>(
    undefined,
    { alias: "gapColumn" },
  );
  public readonly gapRowInput$: InputSignal<ScalarString | Inherit | undefined>                                                                               = input<ScalarString | Inherit | undefined>(
    undefined,
    { alias: "gapRow" },
  );
  public readonly justifyContentInput$: InputSignal<DistributedAlignment | NormalAlignment | FlexPositionalAlignment | Inherit | undefined>                   = input<DistributedAlignment | NormalAlignment | FlexPositionalAlignment | Inherit | undefined>(
    undefined,
    { alias: "justifyContent" },
  );

}
