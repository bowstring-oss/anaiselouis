/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { NgTemplateOutlet }                                                                                                          from "@angular/common";
import { afterRender, ChangeDetectionStrategy, Component, type ElementRef, inject, input, type InputSignal, type Signal, viewChild } from "@angular/core";
import { ContainerDirective, ElevatedDirective, PrimaryDirective, SecondaryDirective, WellRoundedDirective }                         from "../../../../../directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    host:            {
      "[class.material-glass]":     "materialInput$() === 'glass'",
      "[class.material-inverse]":   "materialInput$() === 'inverse'",
      "[class.material-primary]":   "materialInput$() === 'primary'",
      "[class.material-secondary]": "materialInput$() === 'secondary'",
    },
    hostDirectives:  [
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
      {
        directive: ElevatedDirective,
        inputs:    [
          "level",
          "materialOpacity",
        ],
      },
      { directive: PrimaryDirective },
      { directive: SecondaryDirective },
      {
        directive: WellRoundedDirective,
        inputs:    [ "level" ],
      },
    ],
    imports:         [ NgTemplateOutlet ],
    selector:        "bowstring--capsule",
    styleUrl:        "CapsuleComponent.sass",
    templateUrl:     "CapsuleComponent.html",

    standalone: true,
  },
)
export class CapsuleComponent {

  constructor() {
    afterRender((): void => this.wellRoundedDirective.htmlElementRef$.set(this.htmlDivElementRef$()));
  }

  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");

  protected readonly containerDirective: ContainerDirective     = inject<ContainerDirective>(ContainerDirective);
  protected readonly wellRoundedDirective: WellRoundedDirective = inject<WellRoundedDirective>(WellRoundedDirective);

  public readonly materialInput$: InputSignal<"glass" | "inverse" | "primary" | "secondary" | undefined> = input<"glass" | "inverse" | "primary" | "secondary" | undefined>(
    undefined,
    { alias: "material" },
  );

}
