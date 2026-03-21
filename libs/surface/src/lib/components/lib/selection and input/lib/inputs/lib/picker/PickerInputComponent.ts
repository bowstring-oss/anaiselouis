/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { NgTemplateOutlet }                                                                                                from "@angular/common";
import { afterRender, ChangeDetectionStrategy, Component, forwardRef, type Signal }                                        from "@angular/core";
import { toSignal }                                                                                                        from "@angular/core/rxjs-interop";
import { NG_VALUE_ACCESSOR }                                                                                               from "@angular/forms";
import { InsertZwnjsPipe }                                                                                                 from "@bowstring/core";
import { loadSymbol, type Symbol, type SymbolName }                                                                        from "@bowstring/symbols";
import { from, Observable, of, switchMap }                                                                                 from "rxjs";
import { InputWithOptionsComponent }                                                                                       from "../../../../";
import { CanvasDirective, ElevatedDirective, FlexboxContainerDirective, HoverTransformingDirective, WellRoundedDirective } from "../../../../../../../directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    host:            {
      "[class.placeholder]": "placeholderInput$() && value === ''",
    },
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
        useExisting: forwardRef((): typeof PickerInputComponent => PickerInputComponent),
      },
    ],
    selector:        "bowstring--picker-input",
    styleUrl:        "PickerInputComponent.sass",
    templateUrl:     "PickerInputComponent.html",

    standalone: true,
  },
)
export class PickerInputComponent
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

  protected readonly chevronUpChevronDownSymbol$: Signal<Symbol | undefined> = toSignal<Symbol>(
    of<SymbolName>("ChevronUpChevronDown").pipe<Symbol>(
      this.rxSsrService.wrap<SymbolName, Symbol>(
        switchMap<SymbolName, Observable<Symbol>>(
          (symbolName: SymbolName): Observable<Symbol> => from<Promise<Symbol>>(loadSymbol(symbolName)),
        ),
        "Symbol:ChevronUpChevronDown",
      ),
    ),
  );

}
