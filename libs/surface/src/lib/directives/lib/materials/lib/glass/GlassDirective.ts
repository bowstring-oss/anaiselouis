/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { Directive, input, type InputSignalWithTransform, numberAttribute } from "@angular/core";


@Directive(
  {
    host: { "[style.--bowstring--glass-directive--material-opacity-input]": "materialOpacityInput$()" },

    standalone: true,
  },
)
export class GlassDirective {

  public readonly materialOpacityInput$: InputSignalWithTransform<number | undefined, "" | number | `${ number }`> = input<number | undefined, "" | number | `${ number }`>(
    undefined,
    {
      alias:     "materialOpacity",
      transform: numberAttribute,
    },
  );

}
