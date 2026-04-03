/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { DOCUMENT }                                                                                                                                                                                                                                                                                  from "@angular/common";
import { booleanAttribute, ChangeDetectionStrategy, Component, type ElementRef, forwardRef, inject, Injector, input, type InputSignal, type InputSignalWithTransform, model, type ModelSignal, output, OutputEmitterRef, Renderer2, signal, type Signal, untracked, viewChild, type WritableSignal } from "@angular/core";
import { toObservable, toSignal }                                                                                                                                                                                                                                                                    from "@angular/core/rxjs-interop";
import { ControlValueAccessor, NG_VALUE_ACCESSOR }                                                                                                                                                                                                                                                   from "@angular/forms";
import { RxSsrService }                                                                                                                                                                                                                                                                              from "@bowstring/core";
import { loadSymbol, type Symbol, type SymbolName }                                                                                                                                                                                                                                                  from "@bowstring/symbols";
import { filter, firstValueFrom, from, map, Observable, of, switchMap }                                                                                                                                                                                                                              from "rxjs";
import { v7 as uuidV7 }                                                                                                                                                                                                                                                                              from "uuid";
import { ContainerDirective, HoverTransformingDirective, WellRoundedDirective }                                                                                                                                                                                                                      from "../../../../../directives";
import { HapticsService }                                                                                                                                                                                                                                                                            from "../../../../../services";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    host:            {
      "[class.disabled]":                                                          "disabledModel$()",
      "[style.--bowstring--input--close-control--xmark-circle-fill-aspect-ratio]": "xmarkCircleFillAspectRatio$()",
      "[style.--bowstring--input--close-control--xmark-circle-fill-height-ratio]": "xmarkCircleFillHeightRatio$()",
    },
    providers:       [
      {
        multi:       true,
        provide:     NG_VALUE_ACCESSOR,
        useExisting: forwardRef((): typeof InputComponent => InputComponent),
      },
    ],
    template:        "",

    standalone: true,
  },
)
export class InputComponent
  implements ControlValueAccessor {

  protected readonly containerDirective: ContainerDirective                                   = inject<ContainerDirective>(ContainerDirective);
  protected readonly document: Document                                                       = inject<Document>(DOCUMENT);
  protected readonly focused$: WritableSignal<boolean>                                        = signal<false>(false);
  protected readonly hapticsService: HapticsService                                           = inject<HapticsService>(HapticsService);
  protected readonly hoverTransformingDirective: HoverTransformingDirective                   = inject<HoverTransformingDirective>(HoverTransformingDirective);
  protected readonly htmlButtonElementRef$: Signal<ElementRef<HTMLButtonElement> | undefined> = viewChild<ElementRef<HTMLButtonElement>>("htmlButtonElement");
  protected readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>>                   = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");
  protected readonly htmlInputElementRef$: Signal<ElementRef<HTMLInputElement>>               = viewChild.required<ElementRef<HTMLInputElement>>("htmlInputElement");
  protected readonly injector: Injector                                                       = inject<Injector>(Injector);
  protected readonly inputName$: Signal<`bowstring--input-directive--input-${ string }`>      = signal<`bowstring--input-directive--input-${ string }`>(`bowstring--input-directive--input-${ uuidV7() }`);
  protected readonly renderer2: Renderer2                                                     = inject<Renderer2>(Renderer2);
  protected readonly rxSsrService: RxSsrService                                               = inject<RxSsrService>(RxSsrService);
  protected readonly wellRoundedDirective: WellRoundedDirective                               = inject<WellRoundedDirective>(WellRoundedDirective);
  protected readonly xmarkCircleFillSymbol$: Signal<Symbol | undefined>                       = toSignal<Symbol>(
    of<SymbolName>("XmarkCircleFill").pipe<Symbol>(
      this.rxSsrService.wrap<SymbolName, Symbol>(
        switchMap<SymbolName, Observable<Symbol>>(
          (symbolName: SymbolName): Observable<Symbol> => from<Promise<Symbol>>(loadSymbol(symbolName)),
        ),
        "Symbol:XmarkCircleFill",
      ),
    ),
  );
  protected readonly xmarkCircleFillAspectRatio$: Signal<number | undefined>                  = toSignal<number>(
    toObservable<Symbol | undefined>(this.xmarkCircleFillSymbol$).pipe<Symbol, number>(
      filter<Symbol | undefined, Symbol>((xmarkCircleFillSymbol?: Symbol): xmarkCircleFillSymbol is Symbol => !!xmarkCircleFillSymbol),
      map<Symbol, number>((xmarkCircleFillSymbol: Symbol): number => xmarkCircleFillSymbol.viewBoxWidth / xmarkCircleFillSymbol.viewBoxHeight),
    ),
  );
  protected readonly xmarkCircleFillHeightRatio$: Signal<number | undefined>                  = toSignal<number>(
    toObservable<Symbol | undefined>(this.xmarkCircleFillSymbol$).pipe<Symbol, number>(
      filter<Symbol | undefined, Symbol>((xmarkCircleFillSymbol?: Symbol): xmarkCircleFillSymbol is Symbol => !!xmarkCircleFillSymbol),
      map<Symbol, number>((xmarkCircleFillSymbol: Symbol): number => xmarkCircleFillSymbol.viewBoxHeight / 27.5742),
    ),
  );

  protected value: Date | string = "";

  public readonly autocompleteInput$: InputSignal<string | undefined>                                                                  = input<string | undefined>(
    undefined,
    { alias: "autocomplete" },
  );
  public readonly disabledModel$: ModelSignal<boolean | undefined>                                                                     = model<boolean | undefined>(
    undefined,
    { alias: "disabled" },
  );
  public readonly enterKeyHintInput$: InputSignal<"done" | "enter" | "go" | "next" | "previous" | "search" | "send" | undefined>       = input<"done" | "enter" | "go" | "next" | "previous" | "search" | "send" | undefined>(
    undefined,
    { alias: "enterKeyHint" },
  );
  public readonly explicitAutocompleteInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }` | undefined> = input<boolean | undefined, "" | boolean | `${ boolean }` | undefined>(
    undefined,
    {
      alias:     "explicitAutocomplete",
      transform: booleanAttribute,
    },
  );
  public readonly labelInput$: InputSignal<string | undefined>                                                                         = input<string | undefined>(
    undefined,
    { alias: "label" },
  );
  public readonly nextFocused: OutputEmitterRef<void>                                                                                  = output<void>();
  public readonly placeholderInput$: InputSignal<string | undefined>                                                                   = input<string | undefined>(
    undefined,
    { alias: "placeholder" },
  );
  public readonly previousFocused: OutputEmitterRef<void>                                                                              = output<void>();
  public readonly typeInput$: InputSignal<"email" | "password" | undefined>                                                            = input<"email" | "password" | undefined>(
    undefined,
    { alias: "type" },
  );

  protected onBlur(): void {
    setTimeout(
      (): void => {
        this.focused$.set(this.document.activeElement === this.htmlButtonElementRef$()?.nativeElement);

        if (!this.focused$())
          this.onChange?.();
      },
    );
  }
  protected onChange?(): void
  protected onFocus(): void {
    this.focused$.set(true);

    this.onTouched?.();
  }
  protected onInput(): void {
    this.value = this.htmlInputElementRef$().nativeElement.value;

    this.onChange?.();
  }
  protected onPointerdown(): void {
    this.hoverTransformingDirective.cancelPressed();
  }
  protected onSubmit?(): void
  protected onTouched?(): void

  public focus(): void {
    this.htmlInputElementRef$().nativeElement.focus();
  }
  public focusNext(): void {
    this.nextFocused.emit();
  }
  public focusPrevious(): void {
    this.previousFocused.emit();
  }
  public registerOnChange(handler: (value: Date | string) => void): void {
    this.onChange = (): void => handler(this.value);
    this.onSubmit = (): void => handler(this.value);
  }
  public registerOnTouched(handler: () => void): void {
    this.onTouched = handler;
  }
  public setDisabledState(isDisabled: boolean): void {
    untracked<void>((): void => this.disabledModel$.set(isDisabled));
  }
  public writeValue(value?: Date | string): void {
    this.value = value || "";

    firstValueFrom<ElementRef<HTMLInputElement>>(
      toObservable<ElementRef<HTMLInputElement>>(
        this.htmlInputElementRef$,
        { injector: this.injector },
      ),
    ).then<void>(
      (htmlInputElementRef: ElementRef<HTMLInputElement>): void => this.renderer2.setProperty(
        htmlInputElementRef.nativeElement,
        "value",
        this.value,
      ),
    );
  }

}
