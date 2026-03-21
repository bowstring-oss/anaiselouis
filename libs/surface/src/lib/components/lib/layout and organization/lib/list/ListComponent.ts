/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { NgTemplateOutlet }                                                                                               from "@angular/common";
import { ChangeDetectionStrategy, Component, contentChildren, inject, input, type InputSignal, type Signal, TemplateRef } from "@angular/core";
import { InlinableDirective, ListItemDirective }                                                                          from "../../../../../directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives:  [
      {
        directive: InlinableDirective,
        inputs:    [ "inline" ],
      },
    ],
    imports:         [ NgTemplateOutlet ],
    selector:        "bowstring--list",
    styleUrl:        "ListComponent.sass",
    templateUrl:     "ListComponent.html",

    standalone: true,
  },
)
export class ListComponent {

  protected readonly inlinableDirective: InlinableDirective                                     = inject<InlinableDirective>(InlinableDirective);
  protected readonly itemTemplateRefs$: Signal<Readonly<Array<TemplateRef<ListItemDirective>>>> = contentChildren<ListItemDirective, TemplateRef<ListItemDirective>>(
    ListItemDirective,
    {
      descendants: false,
      read:        TemplateRef,
    },
  );

  public typeInput$: InputSignal<"ordered" | "unordered" | undefined> = input<"ordered" | "unordered" | undefined>(
    undefined,
    { alias: "type" },
  );

}
