/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { type FontFamily } from "../../types";
import { type Color }      from "./Color";
import { type Logo }       from "./Logo";


/** Represents a brand configuration. */
export interface Brand {
  /** The brand's city.
   *
   * If supplied, shows in the footer. */
  "city"?: string;

  /** The copyright holder of a brand shown in the footer alongside the year. */
  "copyrightHolder": string;

  /** The URL for the brand's copyright holder shown in the footer alongside the year. */
  "copyrightHolderUrl": string;

  /** The brand's description for use in SEO tags. */
  "description": string;

  /** The brand's {@link FontFamily}.
   *
   * @example Sans-serif UI font of the user's device:
   * ```ts
   * export const fontFamily: FontFamily = "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
   * ``` */
  "fontFamily": FontFamily;

  /** The brand's {@link Logo}. */
  "logo": Logo;

  /** The brand's newsletter title. */
  "newsletterTitle"?: string;

  /** The brand's primary {@link Color}. */
  "primaryColor": Color;

  /** The brand's roundness. */
  "roundness": 1;

  /** The brand's secondary {@link Color}. */
  "secondaryColor": Color;

  /** The brand's warning {@link Color}. */
  "warningColor": Color;

  /** The brand's IANA time zone.
   *
   * If supplied, shows the current time in the footer. */
  "timeZone"?: string;

  /** The brand's title. */
  "title": string;
}
