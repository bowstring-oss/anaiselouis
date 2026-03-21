/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { Directive, input, type InputSignal, type InputSignalWithTransform, numberAttribute } from "@angular/core";
import { type Auto, type Inherit, type ScalarString }                                         from "@bowstring/core";


@Directive(
  {
    host: {
      "[style.--bowstring--flexbox-child-directive--flex-basis-input]":  "flexBasisInput$()",
      "[style.--bowstring--flexbox-child-directive--flex-grow-input]":   "flexGrowInput$()",
      "[style.--bowstring--flexbox-child-directive--flex-shrink-input]": "flexShrinkInput$()",
    },

    standalone: true,
  },
)
export class FlexboxChildDirective {

  public readonly flexBasisInput$: InputSignal<Auto | ScalarString | Inherit | undefined>                     = input<Auto | ScalarString | Inherit | undefined>(
    undefined,
    { alias: "flexBasis" },
  );
  public readonly flexGrowInput$: InputSignalWithTransform<number | undefined, "" | number | `${ number }`>   = input<number | undefined, "" | number | `${ number }`>(
    undefined,
    {
      alias:     "flexGrow",
      transform: numberAttribute,
    },
  );
  public readonly flexShrinkInput$: InputSignalWithTransform<number | undefined, "" | number | `${ number }`> = input<number | undefined, "" | number | `${ number }`>(
    undefined,
    {
      alias:     "flexShrink",
      transform: numberAttribute,
    },
  );

}
