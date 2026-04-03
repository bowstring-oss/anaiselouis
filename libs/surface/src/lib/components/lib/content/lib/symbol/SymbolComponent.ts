/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { NgTemplateOutlet }                                                                                                                  from "@angular/common";
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, type InputSignal, type InputSignalWithTransform, type Signal } from "@angular/core";
import { toObservable, toSignal }                                                                                                            from "@angular/core/rxjs-interop";
import { RxSsrService }                                                                                                                      from "@bowstring/core";
import { loadSymbol, type Symbol, type SymbolName }                                                                                          from "@bowstring/symbols";
import { filter, from, map, type Observable, of, switchMap }                                                                                 from "rxjs";
import { ContainerDirective, FlexboxContainerDirective, InlinableDirective }                                                                 from "../../../../../directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    host:            {
      "[class.badge]":                             "badgeInput$()",
      "[class.fixedWidth]":                        "fixedWidthInput$()",
      "[style.--bowstring--symbol--aspect-ratio]": "aspectRatio$()",
      "[style.--bowstring--symbol--height-ratio]": "heightRatio$()",
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
      {
        directive: InlinableDirective,
        inputs:    [ "inline" ],
      },
    ],
    imports:         [ NgTemplateOutlet ],
    selector:        "bowstring--symbol",
    styleUrl:        "SymbolComponent.sass",
    templateUrl:     "SymbolComponent.html",

    standalone: true,
  },
)
export class SymbolComponent {

  private readonly rxSsrService: RxSsrService = inject<RxSsrService>(RxSsrService);

  protected readonly containerDirective: ContainerDirective = inject<ContainerDirective>(ContainerDirective);

  public readonly input$: InputSignal<SymbolName> = input.required<SymbolName>({ alias: "input" });

  protected readonly symbol$: Signal<Symbol | undefined>      = toSignal<Symbol>(
    toObservable<SymbolName>(this.input$).pipe<Symbol>(
      switchMap<SymbolName, Observable<Symbol>>(
        (input: SymbolName): Observable<Symbol> => of<SymbolName>(input).pipe<Symbol>(
          this.rxSsrService.wrap<SymbolName, Symbol>(
            switchMap<SymbolName, Observable<Symbol>>((symbolName: SymbolName): Observable<Symbol> => from<Promise<Symbol>>(loadSymbol(symbolName))),
            `Symbol:${ input }`,
          ),
        ),
      ),
    ),
  );
  protected readonly aspectRatio$: Signal<number | undefined> = toSignal<number>(
    toObservable<Symbol | undefined>(this.symbol$).pipe<Symbol, number>(
      filter<Symbol | undefined, Symbol>((symbol?: Symbol): symbol is Symbol => !!symbol),
      map<Symbol, number>((symbol: Symbol): number => symbol.viewBoxWidth / symbol.viewBoxHeight),
    ),
  );
  protected readonly heightRatio$: Signal<number | undefined> = toSignal<number>(
    toObservable<Symbol | undefined>(this.symbol$).pipe<Symbol, number>(
      filter<Symbol | undefined, Symbol>((symbol?: Symbol): symbol is Symbol => !!symbol),
      map<Symbol, number>((symbol: Symbol): number => symbol.viewBoxHeight / 27.5742),
    ),
  );

  public readonly badgeInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }` | undefined>      = input<boolean | undefined, "" | boolean | `${ boolean }` | undefined>(
    undefined,
    {
      alias:     "badge",
      transform: booleanAttribute,
    },
  );
  public readonly fixedWidthInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }` | undefined> = input<boolean | undefined, "" | boolean | `${ boolean }` | undefined>(
    undefined,
    {
      alias:     "fixedWidth",
      transform: booleanAttribute,
    },
  );

}
