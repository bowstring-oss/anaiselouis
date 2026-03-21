/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { Directive, input, type InputSignal }                                                                                                from "@angular/core";
import { type DistributedAlignment, type GridAutoFlow, type GridPositionalAlignment, type Inherit, type NormalAlignment, type ScalarString } from "@bowstring/core";
import { ContainerDirective }                                                                                                                from "../container/ContainerDirective";


@Directive(
  {
    host:           {
      "[style.--bowstring--grid-container-directive--align-content-input]":         "alignContentInput$()",
      "[style.--bowstring--grid-container-directive--align-items-input]":           "alignItemsInput$()",
      "[style.--bowstring--grid-container-directive--gap-column-input]":            "gapColumnInput$()",
      "[style.--bowstring--grid-container-directive--gap-row-input]":               "gapRowInput$()",
      "[style.--bowstring--grid-container-directive--grid-auto-flow-input]":        "gridAutoFlowInput$()",
      "[style.--bowstring--grid-container-directive--grid-auto-columns-input]":     "gridAutoColumnsInput$()",
      "[style.--bowstring--grid-container-directive--grid-auto-rows-input]":        "gridAutoRowsInput$()",
      "[style.--bowstring--grid-container-directive--grid-template-columns-input]": "gridTemplateColumnsInput$()",
      "[style.--bowstring--grid-container-directive--grid-template-rows-input]":    "gridTemplateRowsInput$()",
      "[style.--bowstring--grid-container-directive--justify-content-input]":       "justifyContentInput$()",
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
export class GridContainerDirective {

  public readonly alignContentInput$: InputSignal<DistributedAlignment | GridPositionalAlignment | NormalAlignment | undefined>   = input<DistributedAlignment | GridPositionalAlignment | NormalAlignment | undefined>(
    undefined,
    { alias: "alignContent" },
  );
  public readonly alignItemsInput$: InputSignal<DistributedAlignment | GridPositionalAlignment | NormalAlignment | undefined>     = input<DistributedAlignment | GridPositionalAlignment | NormalAlignment | undefined>(
    undefined,
    { alias: "alignItems" },
  );
  public readonly gapColumnInput$: InputSignal<ScalarString | Inherit | undefined>                                                = input<ScalarString | Inherit | undefined>(
    undefined,
    { alias: "gapColumn" },
  );
  public readonly gapRowInput$: InputSignal<ScalarString | Inherit | undefined>                                                   = input<ScalarString | Inherit | undefined>(
    undefined,
    { alias: "gapRow" },
  );
  public readonly gridAutoFlowInput$: InputSignal<GridAutoFlow | Inherit | undefined>                                             = input<GridAutoFlow | Inherit | undefined>(
    undefined,
    { alias: "gridAutoFlow" },
  );
  public readonly gridAutoColumnsInput$: InputSignal<ScalarString | Inherit | undefined>                                          = input<ScalarString | Inherit | undefined>(
    undefined,
    { alias: "gridAutoColumns" },
  );
  public readonly gridAutoRowsInput$: InputSignal<ScalarString | Inherit | undefined>                                             = input<ScalarString | Inherit | undefined>(
    undefined,
    { alias: "gridAutoRows" },
  );
  public readonly gridTemplateColumnsInput$: InputSignal<string | undefined>                                                      = input<string | undefined>(
    undefined,
    { alias: "gridTemplateColumns" },
  );
  public readonly gridTemplateRowsInput$: InputSignal<string | undefined>                                                         = input<string | undefined>(
    undefined,
    { alias: "gridTemplateRows" },
  );
  public readonly justifyContentInput$: InputSignal<DistributedAlignment | GridPositionalAlignment | NormalAlignment | undefined> = input<DistributedAlignment | GridPositionalAlignment | NormalAlignment | undefined>(
    undefined,
    { alias: "justifyContent" },
  );

}
