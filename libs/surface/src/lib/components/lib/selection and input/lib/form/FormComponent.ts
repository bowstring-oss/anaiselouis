/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { NgTemplateOutlet }                                                          from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, output, type OutputEmitterRef } from "@angular/core";
import { FormsModule }                                                               from "@angular/forms";
import { ContainerDirective, FlexboxContainerDirective }                             from "../../../../../directives";


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
    imports:         [
      FormsModule,
      NgTemplateOutlet,
    ],
    selector:        "bowstring--form",
    styleUrl:        "FormComponent.sass",
    templateUrl:     "FormComponent.html",

    standalone: true,
  },
)
export class FormComponent {

  protected readonly containerDirective: ContainerDirective = inject<ContainerDirective>(ContainerDirective);

  public readonly output: OutputEmitterRef<void> = output<void>({ alias: "output" });

}
