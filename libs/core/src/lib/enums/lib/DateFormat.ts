/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

/** A format for localized dates and/or times. */
export enum DateFormat {

  /** Presents the weekday, month, day, year, time, and full time zone.
   *
   * @example en-US: "Thursday, January 1, 1970, 12:00:00 AM GMT+00:00" */
  Full        = "full",

  /** Presents the weekday, month, day, and year.
   *
   * @example en-US: "Thursday, January 1, 1970" */
  FullDate    = "fullDate",

  /** Presents the time and full time zone.
   *
   * @example en-US: "12:00:00 AM GMT+00:00" */
  FullTime    = "fullTime",

  /** Presents the month, day, year, time, and time zone.
   *
   * @example en-US: "January 1, 1970, 12:00:00 AM GMT+0" */
  Long        = "long",

  /** Presents the month, day, and year.
   *
   * @example en-US: "January 1, 1970" */
  LongDate    = "longDate",

  /** Presents the month and year.
   *
   * @example en-US: "January 1970" */
  LongMonth   = "longMonth",

  /** Presents the time and time zone.
   *
   * @example en-US: "12:00:00 AM GMT+0" */
  LongTime    = "longTime",

  /** Presents the abbreviated month, day, year, and time.
   *
   * @example en-US: "Jan 1, 1970, 12:00:00 AM" */
  Medium      = "medium",

  /** Presents the abbreviated month, day, and year.
   *
   * @example en-US: "Jan 1, 1970" */
  MediumDate  = "mediumDate",

  /** Presents the abbreviated month and year.
   *
   * @example en-US: "Jan 1970" */
  MediumMonth = "mediumMonth",

  /** Presents the time.
   *
   * @example en-US: "12:00:00 AM" */
  MediumTime  = "mediumTime",

  /** Presents the numeric month, day, 2-digit year, and time excluding seconds.
   *
   * @example en-US: "1/1/70, 12:00 AM" */
  Short       = "short",

  /** Presents the numeric month, day, and 2-digit year.
   *
   * @example en-US: "1/1/70" */
  ShortDate   = "shortDate",

  /** Presents the month and year in 2-digit numeric form.
   *
   * @example en-US: "01/70" */
  ShortMonth  = "shortMonth",

  /** Presents the time excluding seconds.
   *
   * @example en-US: "12:00 AM" */
  ShortTime   = "shortTime",

}
