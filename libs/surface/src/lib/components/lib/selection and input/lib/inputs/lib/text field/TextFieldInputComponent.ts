/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { NgTemplateOutlet }                                                                                                from "@angular/common";
import { afterRender, ChangeDetectionStrategy, Component, forwardRef }                                                     from "@angular/core";
import { NG_VALUE_ACCESSOR }                                                                                               from "@angular/forms";
import { InsertZwnjsPipe }                                                                                                 from "@bowstring/core";
import { CanvasDirective, ElevatedDirective, FlexboxContainerDirective, HoverTransformingDirective, WellRoundedDirective } from "../../../../../../../directives";
import { InputComponent }                                                                                                  from "../../../input/InputComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives:  [
      { directive: CanvasDirective },
      {
        directive: ElevatedDirective,
        inputs:    [
          "level",
          "materialOpacity",
        ],
      },
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
      { directive: HoverTransformingDirective },
      {
        directive: WellRoundedDirective,
        inputs:    [ "level" ],
      },
    ],
    imports:         [
      InsertZwnjsPipe,
      NgTemplateOutlet,
    ],
    providers:       [
      {
        multi:       true,
        provide:     NG_VALUE_ACCESSOR,
        useExisting: forwardRef((): typeof TextFieldInputComponent => TextFieldInputComponent),
      },
    ],
    selector:        "bowstring--text-field-input",
    styleUrl:        "TextFieldInputComponent.sass",
    templateUrl:     "TextFieldInputComponent.html",

    standalone: true,
  },
)
export class TextFieldInputComponent
  extends InputComponent {

  constructor() {
    super();

    afterRender(
      (): void => {
        this.hoverTransformingDirective.htmlElementRef$.set(this.htmlDivElementRef$());
        this.wellRoundedDirective.htmlElementRef$.set(this.htmlDivElementRef$());
      },
    );
  }

}
