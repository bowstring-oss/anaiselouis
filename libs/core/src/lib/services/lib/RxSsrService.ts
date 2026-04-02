/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { isPlatformServer }                                                                                                            from "@angular/common";
import { ExperimentalPendingTasks as PendingTasks, inject, Injectable, makeStateKey, PLATFORM_ID, type StateKey, TransferState }       from "@angular/core";
import { distinctUntilChanged, finalize, type MonoTypeOperatorFunction, type Observable, type OperatorFunction, startWith, take, tap } from "rxjs";
import { validate }                                                                                                                    from "uuid";


@Injectable({ providedIn: "root" })
export class RxSsrService {

  private readonly pendingTasks: PendingTasks       = inject<PendingTasks>(PendingTasks);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly transferState: TransferState     = inject<TransferState>(TransferState);

  public useState<T>(id: string): MonoTypeOperatorFunction<T> {
    const stateKey: StateKey<T> = makeStateKey<T>(id);

    return (inputObservable: Observable<T>): Observable<T> => {
      let removeTask: () => void = (): void => void (0);

      if (isPlatformServer(this.platformId))
        return inputObservable.pipe<T, T, T, T>(
          distinctUntilChanged<T>(),
          tap<T>(
            (input: T): void => {
              removeTask = this.pendingTasks.add();

              setTimeout(removeTask);

              this.transferState.set<T>(
                stateKey,
                input,
              );
            },
          ),
          take<T>(1),
          finalize<T>((): void => void setTimeout(removeTask)),
        );

      const state: T | undefined = this.transferState.get<T | undefined>(
        stateKey,
        undefined,
      );

      if (validate(id))
        this.transferState.remove<T>(stateKey);

      if (state !== undefined)
        return inputObservable.pipe<T, T, T, T, T>(
          distinctUntilChanged<T>(),
          tap<T>(
            (): void => {
              removeTask = this.pendingTasks.add();

              setTimeout(removeTask);
            },
          ),
          startWith<T>(state),
          distinctUntilChanged<T>(),
          finalize<T>((): void => void setTimeout(removeTask)),
        );

      return inputObservable.pipe<T, T, T>(
        distinctUntilChanged<T>(),
        tap<T>((): void => {
          removeTask = this.pendingTasks.add();

          setTimeout(removeTask);
        }),
        finalize<T>((): void => void setTimeout(removeTask)),
      );
    };
  }
  public wrap<T, R = T>(
    operatorFunction: OperatorFunction<T, R>,
    id: string,
  ): OperatorFunction<T, R> {
    const stateKey: StateKey<R> = makeStateKey<R>(id);

    return (inputObservable: Observable<T>): Observable<R> => {
      let removeTask: () => void = (): void => void (0);

      if (isPlatformServer(this.platformId))
        return inputObservable.pipe<T, T, R, R, R, R>(
          distinctUntilChanged<T>(),
          tap<T>((): void => void (removeTask = this.pendingTasks.add())),
          operatorFunction,
          tap<R>(
            (input: R): void => {
              setTimeout(removeTask);

              this.transferState.set<R>(
                stateKey,
                input,
              );
            },
          ),
          take<R>(1),
          finalize<R>((): void => void setTimeout(removeTask)),
        );

      const state: R | undefined = this.transferState.get<R | undefined>(
        stateKey,
        undefined,
      );

      if (validate(id))
        this.transferState.remove<R>(stateKey);

      if (state !== undefined)
        return inputObservable.pipe<T, T, R, R, R, R, R>(
          distinctUntilChanged<T>(),
          tap<T>((): void => void (removeTask = this.pendingTasks.add())),
          operatorFunction,
          tap<R>((): void => void setTimeout(removeTask)),
          startWith<R>(state),
          distinctUntilChanged<R>(),
          finalize<R>((): void => void setTimeout(removeTask)),
        );

      return inputObservable.pipe<T, T, R, R, R>(
        distinctUntilChanged<T>(),
        tap<T>((): void => void (removeTask = this.pendingTasks.add())),
        operatorFunction,
        tap<R>((): void => void setTimeout(removeTask)),
        finalize<R>((): void => void setTimeout(removeTask)),
      );
    };
  }

}
