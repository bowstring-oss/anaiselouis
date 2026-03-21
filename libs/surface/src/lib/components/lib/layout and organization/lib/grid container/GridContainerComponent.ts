/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { NgTemplateOutlet }                           from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ContainerDirective, GridContainerDirective } from "../../../../../directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives:  [
      {
        directive: GridContainerDirective,
        inputs:    [
          "alignContent",
          "alignItems",
          "gapColumn",
          "gapRow",
          "gridAutoFlow",
          "gridAutoColumns",
          "gridAutoRows",
          "gridTemplateColumns",
          "gridTemplateRows",
          "justifyContent",
        ],
      },
    ],
    imports:         [ NgTemplateOutlet ],
    selector:        "bowstring--grid-container",
    styleUrl:        "GridContainerComponent.sass",
    templateUrl:     "GridContainerComponent.html",

    standalone: true,
  },
)
export class GridContainerComponent {

  protected readonly containerDirective: ContainerDirective = inject<ContainerDirective>(ContainerDirective);

}
