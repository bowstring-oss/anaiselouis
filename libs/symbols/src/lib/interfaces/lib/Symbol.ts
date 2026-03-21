/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

/** Represents the SVG data of a symbol. */
export interface Symbol {
  "paths": Array<{
    "definition": string;
    "opacity": number;
  }>;
  "viewBoxHeight": number;
  "viewBoxWidth": number;
}
