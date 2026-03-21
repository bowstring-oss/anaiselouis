/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { NgTemplateOutlet }                                                                                                                       from "@angular/common";
import { afterRender, ChangeDetectionStrategy, Component, contentChildren, effect, type ElementRef, inject, type Signal, TemplateRef, viewChild } from "@angular/core";
import { ContainerDirective, MasonryChildDirective, MasonryContainerDirective }                                                                   from "../../../../../directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives:  [
      {
        directive: MasonryContainerDirective,
        inputs:    [
          "columns",
          "gapColumn",
          "gapRow",
        ],
      },
    ],
    imports:         [ NgTemplateOutlet ],
    selector:        "bowstring--masonry-container",
    styleUrl:        "MasonryContainerComponent.sass",
    templateUrl:     "MasonryContainerComponent.html",

    standalone: true,
  },
)
export class MasonryContainerComponent {

  constructor() {
    afterRender(
      (): void => {
        this.masonryContainerDirective.columnSizerHtmlDivElementRef$.set(this.columnSizerHtmlDivElementRef$());
        this.masonryContainerDirective.gutterSizerHtmlDivElementRef$.set(this.gutterSizerHtmlDivElementRef$());
        this.masonryContainerDirective.innerHtmlDivElementRef$.set(this.innerHtmlDivElementRef$());
      },
    );

    effect(
      () => {
        if (this.childTemplateRefs$())
          this.masonryContainerDirective.reloadItems();
      },
    );
  }

  private readonly columnSizerHtmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("columnSizerHtmlDivElement");
  private readonly gutterSizerHtmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("gutterSizerHtmlDivElement");
  private readonly innerHtmlDivElementRef$: Signal<ElementRef<HTMLDivElement>>       = viewChild.required<ElementRef<HTMLDivElement>>("innerHtmlDivElement");
  private readonly masonryContainerDirective: MasonryContainerDirective              = inject<MasonryContainerDirective>(MasonryContainerDirective);

  protected readonly childTemplateRefs$: Signal<Readonly<Array<TemplateRef<MasonryChildDirective>>>> = contentChildren<MasonryChildDirective, TemplateRef<MasonryChildDirective>>(
    MasonryChildDirective,
    {
      descendants: false,
      read:        TemplateRef,
    },
  );
  protected readonly containerDirective: ContainerDirective                                          = inject<ContainerDirective>(ContainerDirective);

}
