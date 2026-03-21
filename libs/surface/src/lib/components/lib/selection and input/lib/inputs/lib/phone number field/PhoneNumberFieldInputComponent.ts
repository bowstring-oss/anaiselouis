/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { NgTemplateOutlet }                                                                                                        from "@angular/common";
import { afterRender, ChangeDetectionStrategy, Component, effect, type ElementRef, forwardRef, input, type InputSignal }           from "@angular/core";
import { toObservable }                                                                                                            from "@angular/core/rxjs-interop";
import { NG_VALUE_ACCESSOR }                                                                                                       from "@angular/forms";
import { InsertZwnjsPipe }                                                                                                         from "@bowstring/core";
import { AsYouType, type CountryCode, getCountries, getCountryCallingCode, parseIncompletePhoneNumber, validatePhoneNumberLength } from "libphonenumber-js";
import { firstValueFrom }                                                                                                          from "rxjs";
import { CanvasDirective, ElevatedDirective, FlexboxContainerDirective, HoverTransformingDirective, WellRoundedDirective }         from "../../../../../../../directives";
import { InputComponent }                                                                                                          from "../../../input/InputComponent";


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
        useExisting: forwardRef((): typeof PhoneNumberFieldInputComponent => PhoneNumberFieldInputComponent),
      },
    ],
    selector:        "bowstring--phone-number-field-input",
    styleUrl:        "PhoneNumberFieldInputComponent.sass",
    templateUrl:     "PhoneNumberFieldInputComponent.html",

    standalone: true,
  },
)
export class PhoneNumberFieldInputComponent
  extends InputComponent {

  constructor() {
    super();

    afterRender(
      (): void => {
        this.hoverTransformingDirective.htmlElementRef$.set(this.htmlDivElementRef$());
        this.wellRoundedDirective.htmlElementRef$.set(this.htmlDivElementRef$());
      },
    );

    effect(
      (): void => {
        if (typeof this.value === "string")
          this.renderer2.setProperty(
            this.htmlInputElementRef$().nativeElement,
            "value",
            new AsYouType(getCountries().find((countryCode: CountryCode): boolean => getCountryCallingCode(countryCode) === this.countryCallingCodeInput$())).input(this.value),
          );
      },
    );
  }

  public readonly countryCallingCodeInput$: InputSignal<string> = input.required<string>({ alias: "countryCallingCode" });

  protected override onInput(): void {
    this.value = parseIncompletePhoneNumber(
      this.htmlInputElementRef$().nativeElement.value.slice(
        0,
        validatePhoneNumberLength(`+${ this.countryCallingCodeInput$() } ${ this.htmlInputElementRef$().nativeElement.value }`) === "TOO_LONG" ? - 1 : this.htmlInputElementRef$().nativeElement.value.length,
      ),
    );

    this.onChange?.();

    const asYouType: AsYouType = new AsYouType(getCountries().find((countryCode: CountryCode): boolean => getCountryCallingCode(countryCode) === this.countryCallingCodeInput$()));

    let formattedValue: string = asYouType.input(this.value);
    let template: string       = asYouType.getTemplate();

    while (template && template.charAt(template.length - 1) !== "x") {
      formattedValue = formattedValue.slice(
        0,
        formattedValue.length - 1,
      );
      template       = template.slice(
        0,
        template.length - 1,
      );
    }

    this.renderer2.setProperty(
      this.htmlInputElementRef$().nativeElement,
      "value",
      formattedValue,
    );
  }

  public override writeValue(value?: string): void {
    this.value = value || "";

    firstValueFrom<ElementRef<HTMLInputElement> | undefined>(
      toObservable<ElementRef<HTMLInputElement> | undefined>(
        this.htmlInputElementRef$,
        { injector: this.injector },
      ),
    ).then<void>(
      (htmlInputElementRef?: ElementRef<HTMLInputElement>): void => {
        if (htmlInputElementRef)
          firstValueFrom<string>(
            toObservable<string>(
              this.countryCallingCodeInput$,
              { injector: this.injector },
            ),
          ).then<void>(
            (countryCallingCodeInput: string): void => {
              if (countryCallingCodeInput) {
                if (typeof this.value === "string") {
                  const asYouType: AsYouType = new AsYouType(
                    getCountries().find(
                      (countryCode: CountryCode): boolean => getCountryCallingCode(countryCode) === countryCallingCodeInput,
                    ),
                  );

                  let formattedValue: string = asYouType.input(this.value);
                  let template: string       = asYouType.getTemplate();

                  while (template && template.charAt(template.length - 1) !== "x") {
                    formattedValue = formattedValue.slice(
                      0,
                      formattedValue.length - 1,
                    );
                    template       = template.slice(
                      0,
                      template.length - 1,
                    );
                  }

                  this.renderer2.setProperty(
                    htmlInputElementRef.nativeElement,
                    "value",
                    formattedValue,
                  );
                }
              } else
                this.renderer2.setProperty(
                  htmlInputElementRef.nativeElement,
                  "value",
                  this.value,
                );
            },
          );
      },
    );
  }

}
