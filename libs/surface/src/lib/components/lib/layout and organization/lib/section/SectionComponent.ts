/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { NgTemplateOutlet }                              from "@angular/common";
import { ChangeDetectionStrategy, Component, inject }    from "@angular/core";
import { ContainerDirective, FlexboxContainerDirective } from "../../../../../directives";


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
    selector:        "bowstring--section",
    styleUrl:        "SectionComponent.sass",
    templateUrl:     "SectionComponent.html",

    standalone: true,
  },
)
export class SectionComponent {

  protected readonly containerDirective: ContainerDirective = inject<ContainerDirective>(ContainerDirective);

}
