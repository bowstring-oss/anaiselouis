/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { NgTemplateOutlet }                                                                                   from "@angular/common";
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, type InputSignalWithTransform } from "@angular/core";
import { ContainerDirective, FlexboxContainerDirective }                                                      from "../../../../../directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    host:            {
      "[class.styleFirstLetter]":    "styleFirstLetter$()",
      "[class.styleFirstParagraph]": "styleFirstParagraph$()",
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
    ],
    imports:         [ NgTemplateOutlet ],
    selector:        "bowstring--heading-group",
    styleUrl:        "HeadingGroupComponent.sass",
    templateUrl:     "HeadingGroupComponent.html",

    standalone: true,
  },
)
export class HeadingGroupComponent {

  protected readonly containerDirective: ContainerDirective = inject<ContainerDirective>(ContainerDirective);

  public readonly styleFirstLetter$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`>    = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "styleFirstLetter",
      transform: booleanAttribute,
    },
  );
  public readonly styleFirstParagraph$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`> = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "styleFirstParagraph",
      transform: booleanAttribute,
    },
  );

}
