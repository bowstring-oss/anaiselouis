/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

/** Represents the SVG data of a logo. */
export interface Logo {
  "baselineY": number;
  "focusHover"?: {
    "paths"?: Array<{
      "definition": string;
      "opacity": number;
    }>;
    "rects"?: Array<{
      "height": number;
      "width": number;
      "x": number;
      "y": number;
    }>;
  };
  "paths"?: Array<{
    "definition": string;
    "opacity": number;
  }>;
  "rects"?: Array<{
    "height": number;
    "width": number;
    "x": number;
    "y": number;
  }>;
  "viewBoxHeight": number;
  "viewBoxWidth": number;
}
