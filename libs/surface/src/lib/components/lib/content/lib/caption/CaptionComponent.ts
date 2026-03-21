/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { NgTemplateOutlet }                           from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ContainerDirective }                         from "../../../../../directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives:  [
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
    imports:         [ NgTemplateOutlet ],
    selector:        "bowstring--caption",
    styleUrl:        "CaptionComponent.sass",
    templateUrl:     "CaptionComponent.html",

    standalone: true,
  },
)
export class CaptionComponent {

  protected readonly containerDirective: ContainerDirective = inject<ContainerDirective>(ContainerDirective);

}
