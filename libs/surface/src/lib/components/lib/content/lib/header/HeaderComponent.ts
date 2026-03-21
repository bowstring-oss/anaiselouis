/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { NgTemplateOutlet }                                                   from "@angular/common";
import { ChangeDetectionStrategy, Component, inject }                         from "@angular/core";
import { ContainerDirective, FlexboxContainerDirective, TypographyDirective } from "../../../../../directives";


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
      {
        directive: TypographyDirective,
        inputs:    [ "fontSizeExponent" ],
      },
    ],
    imports:         [ NgTemplateOutlet ],
    selector:        "bowstring--header",
    styleUrl:        "HeaderComponent.sass",
    templateUrl:     "HeaderComponent.html",

    standalone: true,
  },
)
export class HeaderComponent {

  protected readonly containerDirective: ContainerDirective = inject<ContainerDirective>(ContainerDirective);

}
