/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { DOCUMENT, isPlatformBrowser }                                                                                        from "@angular/common";
import { inject, Injectable, PLATFORM_ID, type Signal, signal }                                                               from "@angular/core";
import { toSignal }                                                                                                           from "@angular/core/rxjs-interop";
import { delay, fromEvent, mergeMap, mergeWith, Observable, type Observer, of, scan, startWith, Subject, type TeardownLogic } from "rxjs";


@Injectable({ providedIn: "root" })
export class GlassMaskIdTickService {

  private readonly document: Document               = inject<Document>(DOCUMENT);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  public readonly tickedSubject: Subject<void>    = new Subject<void>();
  public readonly glassMaskIdTick$: Signal<0 | 1> = isPlatformBrowser(this.platformId) && this.document.defaultView?.visualViewport ? toSignal(
    this.tickedSubject.pipe<void | Event, void, 0 | 1, 0 | 1>(
      mergeWith<void, [ void, Event, Event ]>(
        new Observable<void>(
          (bodyDimensionsObserver: Observer<void>): TeardownLogic => {
            bodyDimensionsObserver.next();

            const resizeObserver: ResizeObserver = new ResizeObserver((): void => bodyDimensionsObserver.next());

            resizeObserver.observe(this.document.body);

            return (): void => resizeObserver.disconnect();
          },
        ),
        fromEvent<Event>(
          this.document.defaultView.visualViewport,
          "resize",
          { passive: true },
        ),
        fromEvent<Event>(
          this.document.defaultView,
          "scrollend",
          { passive: true },
        ),
      ),
      mergeMap<void | Event, Observable<void>>(
        (): Observable<void> => of<[ void ]>(void (0)).pipe<void>(
          mergeWith<void, [ void, void, void ]>(
            of<[ void ]>(void (0)).pipe<void>(delay<void>(30)),
            of<[ void ]>(void (0)).pipe<void>(delay<void>(60)),
            of<[ void ]>(void (0)).pipe<void>(delay<void>(120)),
          ),
        ),
      ),
      scan<void, 0 | 1>(
        (accumulator: 0 | 1): 0 | 1 => accumulator ? 0 : 1,
        0,
      ),
      startWith<0 | 1, [ 0 ]>(0),
    ),
    { requireSync: true },
  ) : signal<0>(0);

}
