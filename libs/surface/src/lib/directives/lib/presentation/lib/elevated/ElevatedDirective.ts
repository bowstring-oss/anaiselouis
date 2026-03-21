/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { Directive, input, type InputSignalWithTransform, numberAttribute } from "@angular/core";


@Directive(
  {
    host: {
      "[style.--bowstring--elevated-directive--level-input]":            "levelInput$()",
      "[style.--bowstring--elevated-directive--material-opacity-input]": "materialOpacityInput$()",
    },

    standalone: true,
  },
)
export class ElevatedDirective {

  public readonly levelInput$: InputSignalWithTransform<number | undefined, "" | number | `${ number }`>           = input<number | undefined, "" | number | `${ number }`>(
    undefined,
    {
      alias:     "level",
      transform: numberAttribute,
    },
  );
  public readonly materialOpacityInput$: InputSignalWithTransform<number | undefined, "" | number | `${ number }`> = input<number | undefined, "" | number | `${ number }`>(
    undefined,
    {
      alias:     "materialOpacity",
      transform: numberAttribute,
    },
  );

}
