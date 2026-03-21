/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { NgTemplateOutlet }                                                                                                from "@angular/common";
import { afterRender, ChangeDetectionStrategy, Component, forwardRef, signal, type Signal }                                from "@angular/core";
import { NG_VALUE_ACCESSOR }                                                                                               from "@angular/forms";
import { InsertZwnjsPipe }                                                                                                 from "@bowstring/core";
import { v7 as uuidV7 }                                                                                                    from "uuid";
import { InputWithOptionsComponent }                                                                                       from "../../../../";
import { CanvasDirective, ElevatedDirective, FlexboxContainerDirective, HoverTransformingDirective, WellRoundedDirective } from "../../../../../../../directives";


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
        useExisting: forwardRef((): typeof ComboboxInputComponent => ComboboxInputComponent),
      },
    ],
    selector:        "bowstring--combobox-input",
    styleUrl:        "ComboboxInputComponent.sass",
    templateUrl:     "ComboboxInputComponent.html",

    standalone: true,
  },
)
export class ComboboxInputComponent
  extends InputWithOptionsComponent {

  constructor() {
    super();

    afterRender(
      (): void => {
        this.hoverTransformingDirective.htmlElementRef$.set(this.htmlDivElementRef$());
        this.wellRoundedDirective.htmlElementRef$.set(this.htmlDivElementRef$());
      },
    );
  }

  public readonly optionsId$: Signal<`bowstring--input-directive--options-${ string }`> = signal<`bowstring--input-directive--options-${ string }`>(`bowstring--input-directive--options-${ uuidV7() }`);

}
