/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { Directive, input, type InputSignal } from "@angular/core";


@Directive(
  {
    host: {
      "[style.--bowstring--grid-child-directive--grid-column-end-input]":   "gridColumnEndInput$()",
      "[style.--bowstring--grid-child-directive--grid-column-start-input]": "gridColumnStartInput$()",
      "[style.--bowstring--grid-child-directive--grid-row-end-input]":      "gridRowEndInput$()",
      "[style.--bowstring--grid-child-directive--grid-row-start-input]":    "gridRowStartInput$()",
    },

    standalone: true,
  },
)
export class GridChildDirective {

  public readonly gridColumnEndInput$: InputSignal<string | undefined>   = input<string | undefined>(
    undefined,
    { alias: "gridColumnEnd" },
  );
  public readonly gridColumnStartInput$: InputSignal<string | undefined> = input<string | undefined>(
    undefined,
    { alias: "gridColumnStart" },
  );
  public readonly gridRowEndInput$: InputSignal<string | undefined>      = input<string | undefined>(
    undefined,
    { alias: "gridRowEnd" },
  );
  public readonly gridRowStartInput$: InputSignal<string | undefined>    = input<string | undefined>(
    undefined,
    { alias: "gridRowStart" },
  );

}
