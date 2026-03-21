/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { Directive, inject, signal, type Signal } from "@angular/core";
import { CONFIG_LIB, type ConfigLib }             from "@bowstring/config";
import { type Color }                             from "@bowstring/core";


@Directive(
  {
    host: {
      "[style.--bowstring--primary-directive--background-dark]":  "backgroundDark$()",
      "[style.--bowstring--primary-directive--background-light]": "backgroundLight$()",
      "[style.--bowstring--primary-directive--foreground-dark]":  "foregroundDark$()",
      "[style.--bowstring--primary-directive--foreground-light]": "foregroundLight$()",
    },

    standalone: true,
  },
)
export class PrimaryDirective {

  private readonly configLib: ConfigLib = inject<ConfigLib>(CONFIG_LIB);

  protected readonly backgroundDark$: Signal<`hsl(${ number }, ${ number }%, ${ number }%)`>  = signal<`hsl(${ number }, ${ number }%, ${ number }%)`>(((color: Color): `hsl(${ number }, ${ number }%, ${ number }%)` => `hsl(${ color.hue }, ${ 100 * Math.max(0, Math.min(1, (1 - 0.0625) * color.saturation)) }%, ${ 100 * Math.max(0, Math.min(1, (1 - 0.0625) * color.lightness)) }%)`)(this.configLib.brand.primaryColor));
  protected readonly backgroundLight$: Signal<`hsl(${ number }, ${ number }%, ${ number }%)`> = signal<`hsl(${ number }, ${ number }%, ${ number }%)`>(((color: Color): `hsl(${ number }, ${ number }%, ${ number }%)` => `hsl(${ color.hue }, ${ 100 * Math.max(0, Math.min(1, (1 + 0.0625) * color.saturation)) }%, ${ 100 * Math.max(0, Math.min(1, (1 + 0.0625) * color.lightness)) }%)`)(this.configLib.brand.primaryColor));
  protected readonly foregroundDark$: Signal<`hsl(${ number }, ${ number }%, ${ number }%)`>  = signal<`hsl(${ number }, ${ number }%, ${ number }%)`>(((color: Color): `hsl(${ number }, ${ number }%, ${ number }%)` => `hsl(${ color.hue }, ${ 100 * Math.max(0, Math.min(1, Math.pow(color.saturation, color.lightness > 0.5 ? 2.9375 : 0.1875))) }%, ${ 100 * Math.max(0, Math.min(1, Math.pow(color.lightness, color.lightness > 0.5 ? 2.9375 : 0.1875))) }%)`)(this.configLib.brand.primaryColor));
  protected readonly foregroundLight$: Signal<`hsl(${ number }, ${ number }%, ${ number }%)`> = signal<`hsl(${ number }, ${ number }%, ${ number }%)`>(((color: Color): `hsl(${ number }, ${ number }%, ${ number }%)` => `hsl(${ color.hue }, ${ 100 * Math.max(0, Math.min(1, Math.pow(color.saturation, color.lightness > 0.5 ? 2.8125 : 0.0625))) }%, ${ 100 * Math.max(0, Math.min(1, Math.pow(color.lightness, color.lightness > 0.5 ? 2.8125 : 0.0625))) }%)`)(this.configLib.brand.primaryColor));

}
