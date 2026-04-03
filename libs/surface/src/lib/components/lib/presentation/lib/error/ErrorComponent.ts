/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { DOCUMENT, isPlatformBrowser, NgTemplateOutlet }                                                                                                            from "@angular/common";
import { afterRender, ChangeDetectionStrategy, Component, computed, type ElementRef, inject, model, type ModelSignal, PLATFORM_ID, type Signal, signal, viewChild } from "@angular/core";
import { takeUntilDestroyed, toObservable, toSignal }                                                                                                               from "@angular/core/rxjs-interop";
import { RxSsrService }                                                                                                                                             from "@bowstring/core";
import { loadSymbol, type Symbol, type SymbolName }                                                                                                                 from "@bowstring/symbols";
import { delayWhen, filter, from, fromEvent, map, Observable, type Observer, of, switchMap, type TeardownLogic, timer }                                             from "rxjs";
import { ContainerDirective, ElevatedDirective, FlexboxContainerDirective, HoverTransformingDirective, WarningDirective, WellRoundedDirective }                     from "../../../../../directives";
import { HapticsService }                                                                                                                                           from "../../../../../services";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    host:            {
      "[class.openOrClosing]":                                  "openOrClosing$()",
      "[class.open]":                                           "openModelWithTransform$()",
      "[style.--bowstring--close-control--xmark-aspect-ratio]": "xmarkAspectRatio$()",
      "[style.--bowstring--close-control--xmark-height-ratio]": "xmarkHeightRatio$()",
      "[style.--bowstring--error--height]":                     "height$()",
    },
    hostDirectives:  [
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
      { directive: WarningDirective },
      {
        directive: WellRoundedDirective,
        inputs:    [ "level" ],
      },
    ],
    imports:         [
      HoverTransformingDirective,
      NgTemplateOutlet,
      WellRoundedDirective,
    ],
    selector:        "bowstring--error",
    styleUrl:        "ErrorComponent.sass",
    templateUrl:     "ErrorComponent.html",

    standalone: true,
  },
)
export class ErrorComponent {

  constructor() {
    afterRender(
      (): void => {
        const closeControlHtmlButtonElementRef: ElementRef<HTMLButtonElement> | undefined = this.closeControlHtmlButtonElementRef$();

        if (closeControlHtmlButtonElementRef) {
          this.closeControlHoverTransformingDirective$()?.htmlElementRef$.set(closeControlHtmlButtonElementRef);
          this.closeControlWellRoundedDirective$()?.htmlElementRef$.set(closeControlHtmlButtonElementRef);
        }

        this.wellRoundedDirective.htmlElementRef$.set(this.htmlDivElementRef$());
      },
    );

    if (this.document.defaultView) {
      fromEvent<KeyboardEvent>(
        this.document.defaultView,
        "keydown",
      ).pipe<KeyboardEvent>(takeUntilDestroyed<KeyboardEvent>()).subscribe(this.onKeydown);
      fromEvent<KeyboardEvent>(
        this.document.defaultView,
        "keyup",
      ).pipe<KeyboardEvent>(takeUntilDestroyed<KeyboardEvent>()).subscribe(this.onKeyup);
    }
  }

  private readonly closeControlHoverTransformingDirective$: Signal<HoverTransformingDirective | undefined> = viewChild<HoverTransformingDirective>("closeControlHoverTransformingDirective");
  private readonly closeControlHtmlButtonElementRef$: Signal<ElementRef<HTMLButtonElement> | undefined>    = viewChild<ElementRef<HTMLButtonElement>>("closeControlHtmlButtonElement");
  private readonly closeControlWellRoundedDirective$: Signal<WellRoundedDirective | undefined>             = viewChild<WellRoundedDirective>("closeControlWellRoundedDirective");
  private readonly document: Document                                                                      = inject<Document>(DOCUMENT);
  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>>                                  = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");
  private readonly platformId: NonNullable<unknown>                                                        = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly rxSsrService: RxSsrService                                                              = inject<RxSsrService>(RxSsrService);

  protected readonly containerDirective: ContainerDirective = inject<ContainerDirective>(ContainerDirective);
  protected readonly hapticsService: HapticsService         = inject<HapticsService>(HapticsService);
  protected readonly height$: Signal<number | undefined>    = isPlatformBrowser(this.platformId) ? toSignal<number>(
    toObservable<ElementRef<HTMLDivElement>>(this.htmlDivElementRef$).pipe<number>(
      switchMap<ElementRef<HTMLDivElement>, Observable<number>>(
        ({ nativeElement: htmlElement }: ElementRef<HTMLDivElement>): Observable<number> => new Observable<number>(
          (heightObserver: Observer<number>): TeardownLogic => {
            const resizeObserver: ResizeObserver = new ResizeObserver(([ { target: element } ]: Array<ResizeObserverEntry>): void => heightObserver.next(element.getBoundingClientRect().height));

            resizeObserver.observe(htmlElement);

            return (): void => resizeObserver.disconnect();
          },
        ),
      ),
    ),
  ) : signal<undefined>(undefined);

  public readonly openModel$: ModelSignal<"" | boolean | `${ boolean }`> = model<"" | boolean | `${ boolean }`>(
    false,
    { alias: "open" },
  );
  public readonly openModelWithTransform$: Signal<boolean>               = computed<boolean>((): boolean => this.openModel$() === "" || this.openModel$() === true || this.openModel$() === "true");

  protected readonly openOrClosing$: Signal<boolean | undefined>   = isPlatformBrowser(this.platformId) ? toSignal<boolean | undefined>(
    toObservable<boolean | undefined>(this.openModelWithTransform$).pipe<boolean | undefined, boolean | undefined>(
      delayWhen<boolean | undefined>((open?: boolean): Observable<number> => open ? timer(0) : timer(180)),
      map<boolean | undefined, boolean | undefined>((): boolean | undefined => this.openModelWithTransform$()),
    ),
  ) : signal<undefined>(undefined);
  protected readonly wellRoundedDirective: WellRoundedDirective    = inject<WellRoundedDirective>(WellRoundedDirective);
  protected readonly xmarkSymbol$: Signal<Symbol | undefined>      = toSignal<Symbol>(
    of<SymbolName>("Xmark").pipe<Symbol>(
      this.rxSsrService.wrap<SymbolName, Symbol>(
        switchMap<SymbolName, Observable<Symbol>>(
          (symbolName: SymbolName): Observable<Symbol> => from<Promise<Symbol>>(loadSymbol(symbolName)),
        ),
        "Symbol:Xmark",
      ),
    ),
  );
  protected readonly xmarkAspectRatio$: Signal<number | undefined> = toSignal<number>(
    toObservable<Symbol | undefined>(this.xmarkSymbol$).pipe<Symbol, number>(
      filter<Symbol | undefined, Symbol>((xmarkSymbol?: Symbol): xmarkSymbol is Symbol => !!xmarkSymbol),
      map<Symbol, number>((xmarkSymbol: Symbol): number => xmarkSymbol.viewBoxWidth / xmarkSymbol.viewBoxHeight),
    ),
  );
  protected readonly xmarkHeightRatio$: Signal<number | undefined> = toSignal<number>(
    toObservable<Symbol | undefined>(this.xmarkSymbol$).pipe<Symbol, number>(
      filter<Symbol | undefined, Symbol>((xmarkSymbol?: Symbol): xmarkSymbol is Symbol => !!xmarkSymbol),
      map<Symbol, number>((xmarkSymbol: Symbol): number => xmarkSymbol.viewBoxHeight / 27.5742),
    ),
  );

  protected onKeydown(keyboardEvent: KeyboardEvent): void {
    if (keyboardEvent.code === "Escape" && this.openModelWithTransform$()) {
      keyboardEvent.preventDefault();
      keyboardEvent.stopPropagation();
    }
  }
  protected onKeyup(keyboardEvent: KeyboardEvent): void {
    if (keyboardEvent.code === "Escape" && this.openModelWithTransform$()) {
      keyboardEvent.preventDefault();
      keyboardEvent.stopPropagation();

      this.openModel$.set(false);
    }
  }

}
