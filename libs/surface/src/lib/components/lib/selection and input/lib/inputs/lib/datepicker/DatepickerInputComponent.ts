/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { NgTemplateOutlet }                                                                                                from "@angular/common";
import { afterRender, ChangeDetectionStrategy, Component, type ElementRef, forwardRef }                                    from "@angular/core";
import { toObservable }                                                                                                    from "@angular/core/rxjs-interop";
import { NG_VALUE_ACCESSOR }                                                                                               from "@angular/forms";
import { InsertZwnjsPipe }                                                                                                 from "@bowstring/core";
import { firstValueFrom }                                                                                                  from "rxjs";
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
        useExisting: forwardRef((): typeof DatepickerInputComponent => DatepickerInputComponent),
      },
    ],
    selector:        "bowstring--datepicker-input",
    styleUrl:        "DatepickerInputComponent.sass",
    templateUrl:     "DatepickerInputComponent.html",

    standalone: true,
  },
)
export class DatepickerInputComponent
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

  protected override value: Date | "" = new Date();

  protected override onInput(): void {
    const value: string = this.htmlInputElementRef$().nativeElement.value;

    this.value = value && new Date(value);

    this.onChange?.();
  }

  public override writeValue(value?: Date): void {
    this.value = value || "";

    firstValueFrom<ElementRef<HTMLInputElement> | undefined>(
      toObservable<ElementRef<HTMLInputElement> | undefined>(
        this.htmlInputElementRef$,
        { injector: this.injector },
      ),
    ).then<void>(
      (htmlInputElementRef?: ElementRef<HTMLInputElement>): void => {
        if (htmlInputElementRef)
          this.renderer2.setProperty(
            htmlInputElementRef.nativeElement,
            "value",
            this.value && ((date: Date): string => `${ date.getFullYear() }-${ ((date.getMonth() + 1).toString().length === 1 ? "0" : "") + (date.getMonth() + 1) }-${ (date.getDate().toString().length === 1 ? "0" : "") + date.getDate() }`)(new Date(this.value.getTime() + this.value.getTimezoneOffset() * 60000)),
          );
      },
    );
  }

}
