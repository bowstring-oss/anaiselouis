/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { Injectable, signal, type WritableSignal } from "@angular/core";


@Injectable({ providedIn: "root" })
export class ErrorsService {

  public readonly errors$: WritableSignal<Array<string> | undefined> = signal<Array<string> | undefined>(undefined);

  public createError(message: string): void {
    this.errors$.update(
      (errors?: Array<string>): Array<string> => [
        ...errors || [],
        message,
      ],
    );
  }

}
