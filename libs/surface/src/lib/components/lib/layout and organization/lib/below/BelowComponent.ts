/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { NgTemplateOutlet }                   from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FlexboxContainerDirective }          from "../../../../../directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
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
    selector:        "bowstring--below",
    styleUrl:        "BelowComponent.sass",
    templateUrl:     "BelowComponent.html",

    standalone: true,
  },
)
export class BelowComponent {
}
