/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { booleanAttribute, Directive, input, type InputSignalWithTransform } from "@angular/core";
import { ContainerDirective }                                                from "../container/ContainerDirective";


@Directive(
  {
    host:           { "[class.inline]": "inlineInput$()" },
    hostDirectives: [
      {
        directive: ContainerDirective,
        inputs:    [
          "alignSelf",
          "aspectRatio",
          "hideScrollbar",
          "marginBottom",
          "marginSides",
          "marginTop",
          "overflowX",
          "overflowY",
          "paddingBottom",
          "paddingSides",
          "paddingTop",
          "position",
          "positionBottom",
          "positionLeft",
          "positionRight",
          "positionTop",
          "scrollSnapAlign",
          "scrollSnapStop",
          "scrollSnapType",
        ],
      },
    ],

    standalone: true,
  },
)
export class InlinableDirective {

  public readonly inlineInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }` | undefined> = input<boolean | undefined, "" | boolean | `${ boolean }` | undefined>(
    undefined,
    {
      alias:     "inline",
      transform: booleanAttribute,
    },
  );

}
