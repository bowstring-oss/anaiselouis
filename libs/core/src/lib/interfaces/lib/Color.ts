/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

/** Represents a color using HSL (hue, saturation, and lightness). */
export interface Color {
  /** The hue component of the {@link Color}.
   *
   * @remarks **Must be from 0 to 360.** */
  "hue": number;
  /** The lightness component of the {@link Color}.
   *
   * @remarks **Must be from 0 (black) to 1 (white).** */
  "lightness": number;
  /** The saturation component of the {@link Color}.
   *
   * @remarks **Must be from 0 (grayscale) to 1 (full saturation).** */
  "saturation": number;
}
