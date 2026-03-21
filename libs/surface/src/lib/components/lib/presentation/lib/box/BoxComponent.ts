/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { NgTemplateOutlet }                                                                                                          from "@angular/common";
import { afterRender, ChangeDetectionStrategy, Component, type ElementRef, inject, input, type InputSignal, type Signal, viewChild } from "@angular/core";
import { ContainerDirective, ElevatedDirective, FlexboxContainerDirective, GlassDirective, PrimaryDirective, WellRoundedDirective }  from "../../../../../directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    host:            { "[class.material-primary]": "materialInput$() === 'primary'" },
    hostDirectives:  [
      {
        directive: ElevatedDirective,
        inputs:    [
          "level",
          "materialOpacity",
        ],
      },
      {
        directive: FlexboxContainerDirective,
        inputs:    [
          "alignContent",
          "alignItems",
          "flexDirection",
          "flexWrap",
          "gapColumn",
          "gapRow",
          "justifyContent",
        ],
      },
      {
        directive: GlassDirective,
        inputs:    [ "materialOpacity" ],
      },
      { directive: PrimaryDirective },
      {
        directive: WellRoundedDirective,
        inputs:    [ "level" ],
      },
    ],
    imports:         [ NgTemplateOutlet ],
    selector:        "bowstring--box",
    styleUrl:        "BoxComponent.sass",
    templateUrl:     "BoxComponent.html",

    standalone: true,
  },
)
export class BoxComponent {

  constructor() {
    afterRender((): void => this.wellRoundedDirective.htmlElementRef$.set(this.htmlDivElementRef$()));
  }

  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");

  protected readonly containerDirective: ContainerDirective     = inject<ContainerDirective>(ContainerDirective);
  protected readonly wellRoundedDirective: WellRoundedDirective = inject<WellRoundedDirective>(WellRoundedDirective);

  public readonly materialInput$: InputSignal<"primary" | undefined> = input<"primary" | undefined>(
    undefined,
    { alias: "material" },
  );

}
