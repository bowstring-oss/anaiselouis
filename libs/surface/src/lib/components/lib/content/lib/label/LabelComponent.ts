/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { NgTemplateOutlet }                                                    from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, input, type InputSignal } from "@angular/core";
import { ContainerDirective, InlinableDirective }                              from "../../../../../directives";


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
      {
        directive: InlinableDirective,
        inputs:    [ "inline" ],
      },
    ],
    selector:        "bowstring--label",
    styleUrl:        "LabelComponent.sass",
    templateUrl:     "LabelComponent.html",
    imports:         [ NgTemplateOutlet ],

    standalone: true,
  },
)
export class LabelComponent {

  protected readonly containerDirective: ContainerDirective = inject<ContainerDirective>(ContainerDirective);

  public readonly input$: InputSignal<string> = input.required<string>({ alias: "input" });

}
