/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { DOCUMENT }                                                        from "@angular/common";
import { inject, Injectable, type OnDestroy, Renderer2, RendererFactory2 } from "@angular/core";


@Injectable({ providedIn: "root" })
export class HapticsService
  implements OnDestroy {

  constructor() {
    this.renderer2.appendChild(
      this.document.head,
      this.htmlLabelElement,
    );
    this.renderer2.appendChild(
      this.htmlLabelElement,
      this.htmlInputElement,
    );
    this.renderer2.setAttribute(
      this.htmlInputElement,
      "switch",
      "",
    );
    this.renderer2.setProperty(
      this.htmlInputElement,
      "type",
      "checkbox",
    );
    this.renderer2.setProperty(
      this.htmlLabelElement,
      "ariaHidden",
      "true",
    );
    this.renderer2.setStyle(
      this.htmlLabelElement,
      "display",
      "none",
    );
  }

  private readonly document: Document                 = inject<Document>(DOCUMENT);
  private readonly rendererFactory2: RendererFactory2 = inject<RendererFactory2>(RendererFactory2);
  private readonly renderer2: Renderer2               = this.rendererFactory2.createRenderer(
    this.document.head,
    null,
  );
  private readonly htmlInputElement: HTMLInputElement = this.renderer2.createElement("input");
  private readonly htmlLabelElement: HTMLLabelElement = this.renderer2.createElement("label");

  public ngOnDestroy(): void {
    this.renderer2.removeChild(
      this.document.head,
      this.htmlLabelElement,
    );
    this.renderer2.destroy();
  }
  public trigger(): void {
    if ("vibrate" in navigator)
      return void navigator.vibrate(10);

    this.htmlLabelElement.click();
  }

}
