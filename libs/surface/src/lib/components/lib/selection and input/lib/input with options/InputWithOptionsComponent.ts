/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { ChangeDetectionStrategy, Component, contentChildren, forwardRef, type Signal } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR }                                      from "@angular/forms";
import { InputComponent }                                                               from "../input/InputComponent";
import { OptionComponent }                                                              from "../option/OptionComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    host:            { "[class.disabled]": "disabledModel$()" },
    providers:       [
      {
        multi:       true,
        provide:     NG_VALUE_ACCESSOR,
        useExisting: forwardRef((): typeof InputWithOptionsComponent => InputWithOptionsComponent),
      },
    ],
    template:        "",

    standalone: true,
  },
)
export class InputWithOptionsComponent
  extends InputComponent
  implements ControlValueAccessor {

  protected readonly optionComponents$: Signal<Readonly<Array<OptionComponent>>> = contentChildren<OptionComponent>(OptionComponent);

  protected override onBlur(): void {
    setTimeout(
      (): void => {
        const value: Date | string = this.value;

        this.focused$.set(this.document.activeElement === this.htmlButtonElementRef$()?.nativeElement);

        if (!this.focused$() && !value || (typeof value === "string" && this.optionComponents$().map<string>(({ valueInput$ }: OptionComponent): string => valueInput$()).includes(value)))
          this.onChange?.();
      },
    );
  }

  public override registerOnChange(handler: (value: Date | string) => void): void {
    this.onChange = (): void => {
      if (!this.value || (typeof this.value === "string" && this.optionComponents$().map<string>(({ valueInput$ }: OptionComponent): string => valueInput$()).includes(this.value)))
        handler(this.value);
    };
    this.onSubmit = (): void => handler(this.value);
  }

}
