/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { DOCUMENT, isPlatformBrowser }                                                                                                                   from "@angular/common";
import { computed, Directive, type ElementRef, inject, PLATFORM_ID, type Signal, signal, type WritableSignal }                                           from "@angular/core";
import { toObservable, toSignal }                                                                                                                        from "@angular/core/rxjs-interop";
import { animationFrameScheduler, delayWhen, filter, fromEvent, map, mergeWith, Observable, observeOn, startWith, Subject, switchMap, takeUntil, timer } from "rxjs";
import { GlassMaskIdTickService }                                                                                                                        from "../../../../../services";


@Directive(
  {
    exportAs: "hoverTransformingDirective",
    host:     {
      "[class.focusedOrUnfocusing]":                                           "focusedOrUnfocusing$()",
      "[class.focused]":                                                       "focused$()",
      "[class.pressedOrUnpressing]":                                           "pressedOrUnpressing$()",
      "[class.pressed]":                                                       "pressed$()",
      "[class.transformedOrUntransforming]":                                   "transformedOrUntransforming$()",
      "[class.transformed]":                                                   "transformed$()",
      "[style.--bowstring--hover-transforming-directive--last-translation-x]": "lastTranslation$()?.x",
      "[style.--bowstring--hover-transforming-directive--last-translation-y]": "lastTranslation$()?.y",
      "[style.--bowstring--hover-transforming-directive--translation-x]":      "translation$().x",
      "[style.--bowstring--hover-transforming-directive--translation-y]":      "translation$().y",
    },
    selector: "[bowstringHoverTransformingDirective]",

    standalone: true,
  },
)
export class HoverTransformingDirective {

  private readonly document: Document                             = inject<Document>(DOCUMENT);
  private readonly glassMaskIdTickService: GlassMaskIdTickService = inject<GlassMaskIdTickService>(GlassMaskIdTickService);
  private readonly platformId: NonNullable<unknown>               = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly pressedCancelledSubject: Subject<void>         = new Subject<void>();

  public readonly htmlElementRef$: WritableSignal<ElementRef<HTMLElement> | undefined> = signal<undefined>(undefined);

  protected readonly focused$: Signal<boolean>                                          = toSignal<boolean>(
    toObservable<ElementRef<HTMLElement> | undefined>(this.htmlElementRef$).pipe<ElementRef<HTMLElement>, boolean, boolean>(
      filter<ElementRef<HTMLElement> | undefined, ElementRef<HTMLElement>>((htmlElementRef?: ElementRef<HTMLElement>): htmlElementRef is ElementRef<HTMLDivElement> => !!htmlElementRef),
      switchMap<ElementRef<HTMLElement>, Observable<boolean>>(
        ({ nativeElement: htmlElement }: ElementRef<HTMLElement>): Observable<boolean> => fromEvent<FocusEvent>(
          htmlElement,
          "focusin",
          { passive: true },
        ).pipe<boolean, boolean>(
          switchMap<FocusEvent, Observable<boolean>>(
            (): Observable<boolean> => fromEvent<FocusEvent>(
              htmlElement,
              "focusout",
              { passive: true },
            ).pipe<false, boolean, boolean>(
              map<FocusEvent, false>((): false => false),
              startWith<false, [ true ]>(true),
              observeOn<boolean>(animationFrameScheduler),
            ),
          ),
          observeOn<boolean>(animationFrameScheduler),
        ),
      ),
      startWith<boolean, [ false ]>(false),
    ),
    { requireSync: true },
  );
  protected readonly focusedOrUnfocusing$: Signal<boolean>                              = isPlatformBrowser(this.platformId) ? toSignal<boolean>(
    toObservable<boolean>(this.focused$).pipe<boolean, boolean, boolean>(
      delayWhen<boolean>((focused: boolean): Observable<number> => focused ? timer(0) : timer(200)),
      map<boolean, boolean>(
        (): boolean => {
          this.glassMaskIdTickService.tickedSubject.next();

          return this.focused$();
        },
      ),
      startWith<boolean>(this.focused$()),
    ),
    { requireSync: true },
  ) : signal<false>(false);
  protected readonly translation$: Signal<{ "x": number, "y": number }>                 = isPlatformBrowser(this.platformId) && this.document.defaultView ? ((window: Window & typeof globalThis) => toSignal<{ "x": number, "y": number }>(
    toObservable<ElementRef<HTMLElement> | undefined>(this.htmlElementRef$).pipe<ElementRef<HTMLElement>, { "x": number, "y": number }, { "x": number, "y": number }>(
      filter<ElementRef<HTMLElement> | undefined, ElementRef<HTMLElement>>((htmlElementRef?: ElementRef<HTMLElement>): htmlElementRef is ElementRef<HTMLDivElement> => !!htmlElementRef),
      switchMap<ElementRef<HTMLElement>, Observable<{ "x": number, "y": number }>>(
        ({ nativeElement: htmlElement }: ElementRef<HTMLElement>): Observable<{ "x": number, "y": number }> => fromEvent<PointerEvent>(
          window,
          "pointermove",
          { passive: true },
        ).pipe<PointerEvent, { "x": number, "y": number }, { "x": number, "y": number }>(
          filter<PointerEvent>(({ pointerType }: PointerEvent): boolean => pointerType === "mouse"),
          map<PointerEvent, { "x": number, "y": number }>(
            (
              {
                x,
                y,
              }: PointerEvent,
            ): { "x": number, "y": number } => {
              if (!htmlElement.contains(this.document.elementFromPoint(
                x,
                y,
              )))
                return {
                  x: 0,
                  y: 0,
                };

              const domRect: DOMRect = htmlElement.getBoundingClientRect();

              if (x < domRect.left || x > domRect.right || y < domRect.top || y > domRect.bottom)
                return {
                  x: 0,
                  y: 0,
                };

              return {
                x: ((2 * ((x - domRect.left) / domRect.width)) - 1) / 8,
                y: ((2 * ((y - domRect.top) / domRect.height)) - 1) / 8,
              };
            },
          ),
          observeOn<{ "x": number, "y": number }>(animationFrameScheduler),
        ),
      ),
      startWith<{ "x": number, "y": number }, [ { "x": 0, "y": 0 } ]>({ x: 0, y: 0 }),
    ),
    { requireSync: true },
  ))(this.document.defaultView) : signal<{ "x": 0, "y": 0 }>({ x: 0, y: 0 });
  protected readonly lastTranslation$: Signal<{ "x": number, "y": number } | undefined> = isPlatformBrowser(this.platformId) ? toSignal<{ "x": number, "y": number }>(toObservable<{ "x": number, "y": number }>(this.translation$).pipe<{ "x": number, "y": number }>(filter<{ "x": number, "y": number }>(({ x, y }: { "x": number, "y": number }): boolean => x !== 0 || y !== 0))) : signal<undefined>(undefined);
  protected readonly pressed$: Signal<boolean>                                          = isPlatformBrowser(this.platformId) && this.document.defaultView ? ((window: Window & typeof globalThis): Signal<boolean> => toSignal<boolean>(
    toObservable<ElementRef<HTMLElement> | undefined>(this.htmlElementRef$).pipe<ElementRef<HTMLElement>, boolean, boolean>(
      filter<ElementRef<HTMLElement> | undefined, ElementRef<HTMLElement>>((htmlElementRef?: ElementRef<HTMLElement>): htmlElementRef is ElementRef<HTMLElement> => !!htmlElementRef),
      switchMap<ElementRef<HTMLElement>, Observable<boolean>>(
        ({ nativeElement: htmlElement }: ElementRef<HTMLElement>): Observable<boolean> => fromEvent<PointerEvent>(
          htmlElement,
          "pointerdown",
          { passive: true },
        ).pipe<boolean, boolean, boolean>(
          switchMap<PointerEvent, Observable<boolean>>(
            (): Observable<boolean> => fromEvent<PointerEvent>(
              htmlElement,
              "pointercancel",
              { passive: true },
            ).pipe<void | PointerEvent | DragEvent, false, boolean, boolean>(
              mergeWith<PointerEvent, [ PointerEvent, DragEvent, void ]>(
                fromEvent<PointerEvent>(
                  window,
                  "pointerup",
                  { passive: true },
                ),
                fromEvent<DragEvent>(
                  htmlElement,
                  "dragstart",
                  { passive: true },
                ),
                this.pressedCancelledSubject,
              ),
              map<void | PointerEvent | DragEvent, false>((): false => false),
              mergeWith<false, [ boolean ]>(
                fromEvent<PointerEvent>(
                  htmlElement,
                  "pointerleave",
                  { passive: true },
                ).pipe<boolean, boolean>(
                  switchMap<PointerEvent, Observable<boolean>>(
                    (): Observable<boolean> => fromEvent<PointerEvent>(
                      htmlElement,
                      "pointerenter",
                      { passive: true },
                    ).pipe<true, boolean>(
                      map<PointerEvent, true>((): true => true),
                      startWith<boolean, [ false ]>(false),
                    ),
                  ),
                  takeUntil<boolean>(
                    fromEvent<PointerEvent>(
                      htmlElement,
                      "pointercancel",
                      { passive: true },
                    ).pipe<void | PointerEvent | DragEvent>(
                      mergeWith<PointerEvent, [ PointerEvent, DragEvent, void ]>(
                        fromEvent<PointerEvent>(
                          window,
                          "pointerup",
                          { passive: true },
                        ),
                        fromEvent<DragEvent>(
                          htmlElement,
                          "dragstart",
                          { passive: true },
                        ),
                        this.pressedCancelledSubject,
                      ),
                    ),
                  ),
                ),
              ),
              startWith<boolean, [ true ]>(true),
            ),
          ),
          mergeWith<boolean, [ boolean ]>(
            fromEvent<KeyboardEvent>(
              htmlElement,
              "keydown",
              { passive: true },
            ).pipe<KeyboardEvent, boolean>(
              filter<KeyboardEvent>(({ code }: KeyboardEvent): boolean => code === "Enter" || code === "Space"),
              switchMap<KeyboardEvent, Observable<boolean>>(
                (): Observable<boolean> => fromEvent<KeyboardEvent>(
                  htmlElement,
                  "keyup",
                  { passive: true },
                ).pipe<KeyboardEvent, false, boolean>(
                  filter<KeyboardEvent>(({ code }: KeyboardEvent): boolean => code === "Enter" || code === "Space"),
                  map<KeyboardEvent, false>((): false => false),
                  startWith<boolean, [ true ]>(true),
                ),
              ),
            ),
          ),
          observeOn<boolean>(animationFrameScheduler),
        ),
      ),
      startWith<boolean, [ false ]>(false),
    ),
    { requireSync: true },
  ))(this.document.defaultView) : signal<false>(false);
  protected readonly pressedOrUnpressing$: Signal<boolean>                              = isPlatformBrowser(this.platformId) ? toSignal<boolean>(
    toObservable<boolean>(this.pressed$).pipe<boolean, boolean, boolean>(
      delayWhen<boolean>((pressed: boolean): Observable<number> => pressed ? timer(0) : timer(50)),
      map<boolean, boolean>(
        (): boolean => {
          this.glassMaskIdTickService.tickedSubject.next();

          return this.pressed$();
        },
      ),
      startWith<boolean>(this.pressed$()),
    ),
    { requireSync: true },
  ) : signal<false>(false);
  protected readonly transformed$: Signal<boolean>                                      = computed<boolean>((): boolean => this.translation$().x !== 0 || this.translation$().y !== 0);
  protected readonly transformedOrUntransforming$: Signal<boolean>                      = isPlatformBrowser(this.platformId) ? toSignal<boolean>(
    toObservable<boolean>(this.transformed$).pipe<boolean, boolean, boolean>(
      delayWhen<boolean>((transformed: boolean): Observable<number> => transformed ? timer(0) : timer(200)),
      map<boolean, boolean>(
        (): boolean => {
          this.glassMaskIdTickService.tickedSubject.next();

          return this.transformed$();
        },
      ),
      startWith<boolean>(this.transformed$()),
    ),
    { requireSync: true },
  ) : signal<false>(false);

  public cancelPressed(): void {
    setTimeout((): void => this.pressedCancelledSubject.next());
  }

}
