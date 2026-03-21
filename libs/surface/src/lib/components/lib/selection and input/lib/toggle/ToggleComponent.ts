/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { NgTemplateOutlet }                                                                                                                                                                                                     from "@angular/common";
import { ChangeDetectionStrategy, Component, contentChild, type ElementRef, forwardRef, inject, Injector, input, type InputSignal, model, type ModelSignal, Renderer2, signal, type Signal, TemplateRef, untracked, viewChild } from "@angular/core";
import { toObservable }                                                                                                                                                                                                         from "@angular/core/rxjs-interop";
import { ControlValueAccessor, NG_VALUE_ACCESSOR }                                                                                                                                                                              from "@angular/forms";
import { firstValueFrom }                                                                                                                                                                                                       from "rxjs";
import { v7 as uuidV7 }                                                                                                                                                                                                         from "uuid";
import { CanvasDirective, ContainerDirective, ElevatedDirective, FlexboxContainerDirective, PrimaryDirective, ToggleSymbolDirective }                                                                                           from "../../../../../directives";
import { HapticsService }                                                                                                                                                                                                       from "../../../../../services";


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
      { directive: PrimaryDirective },
    ],
    imports:         [ NgTemplateOutlet ],
    providers:       [
      {
        multi:       true,
        provide:     NG_VALUE_ACCESSOR,
        useExisting: forwardRef((): typeof ToggleComponent => ToggleComponent),
      },
    ],
    selector:        "bowstring--toggle",
    styleUrl:        "ToggleComponent.sass",
    templateUrl:     "ToggleComponent.html",

    standalone: true,
  },
)
export class ToggleComponent
  implements ControlValueAccessor {

  private readonly htmlInputElementRef$: Signal<ElementRef<HTMLInputElement>> = viewChild.required<ElementRef<HTMLInputElement>>("htmlInputElement");
  private readonly injector: Injector                                         = inject<Injector>(Injector);
  private readonly renderer2: Renderer2                                       = inject<Renderer2>(Renderer2);

  protected readonly containerDirective: ContainerDirective                                     = inject<ContainerDirective>(ContainerDirective);
  protected readonly hapticsService: HapticsService                                             = inject<HapticsService>(HapticsService);
  protected readonly inputName$: Signal<`bowstring--toggle--input-${ string }`>                 = signal<`bowstring--toggle--input-${ string }`>(`bowstring--toggle--input-${ uuidV7() }`);
  protected readonly symbolTemplateRef$: Signal<TemplateRef<ToggleSymbolDirective> | undefined> = contentChild<ToggleSymbolDirective, TemplateRef<ToggleSymbolDirective>>(
    ToggleSymbolDirective,
    {
      descendants: false,
      read:        TemplateRef,
    },
  );

  protected value: boolean | "" = "";

  public readonly disabledModel$: ModelSignal<boolean | undefined> = model<boolean | undefined>(
    undefined,
    { alias: "disabled" },
  );
  public readonly labelInput$: InputSignal<string | undefined>     = input<string | undefined>(
    undefined,
    { alias: "label" },
  );

  protected onChange?(): void
  protected onInput(): void {
    this.value = this.htmlInputElementRef$().nativeElement.checked;

    this.onChange?.();
  }
  protected onTouched?(): void

  public registerOnChange(handler: (value: boolean) => void): void {
    this.onChange = (): void => handler(this.value || false);
  }
  public registerOnTouched(handler: () => void): void {
    this.onTouched = (): void => handler();
  }
  public setDisabledState(isDisabled: boolean): void {
    untracked<void>((): void => this.disabledModel$.set(isDisabled));
  }
  public writeValue(value?: boolean): void {
    this.value = value || "";

    firstValueFrom<ElementRef<HTMLInputElement>>(
      toObservable<ElementRef<HTMLInputElement>>(
        this.htmlInputElementRef$,
        { injector: this.injector },
      ),
    ).then<void>(
      (htmlInputElementRef: ElementRef<HTMLInputElement>): void => this.renderer2.setProperty(
        htmlInputElementRef.nativeElement,
        "checked",
        this.value,
      ),
    );
  }

}
