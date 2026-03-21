/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { NgTemplateOutlet }                                                  from "@angular/common";
import { ChangeDetectionStrategy, Component, inject }                        from "@angular/core";
import { CONFIG_LIB, type ConfigLib }                                        from "@bowstring/config";
import { ContainerDirective, FlexboxContainerDirective, InlinableDirective } from "../../../../../directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    host:            {
      "[style.--bowstring--logo--baseline-y]":     "configLib.brand.logo.baselineY",
      "[style.--bowstring--logo--viewbox-height]": "configLib.brand.logo.viewBoxHeight",
    },
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
        directive: InlinableDirective,
        inputs:    [ "inline" ],
      },
    ],
    imports:         [ NgTemplateOutlet ],
    selector:        "bowstring--logo",
    styleUrl:        "LogoComponent.sass",
    templateUrl:     "LogoComponent.html",

    standalone: true,
  },
)
export class LogoComponent {

  protected readonly configLib: ConfigLib                   = inject<ConfigLib>(CONFIG_LIB);
  protected readonly containerDirective: ContainerDirective = inject<ContainerDirective>(ContainerDirective);

}
