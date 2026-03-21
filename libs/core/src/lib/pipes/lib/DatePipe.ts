/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { formatDate }                  from "@angular/common";
import { inject, Pipe, PipeTransform } from "@angular/core";
import { LOCALE_ID, type LocaleId }    from "@bowstring/i18n";
import { type Request }                from "express";
import { DateFormat }                  from "../../enums";
import { REQUEST }                     from "../../injection tokens";
import { type Timestamp }              from "../../types";


@Pipe(
  {
    name: "bowstringDate",

    standalone: true,
  },
)
export class DatePipe
  implements PipeTransform {

  private readonly localeId: LocaleId      = inject<LocaleId>(LOCALE_ID);
  private readonly request: Request | null = inject<Request | null>(
    REQUEST,
    { optional: true },
  );

  /**
   * @param value The {@link Date}, {@link Timestamp}, or milliseconds since the Unix epoch to format.
   * @param format The {@link DateFormat} to use.
   * @param timeZone The IANA time zone to use.
   * @param locale The Unicode locale to use. */
  public transform(
    value: Date | Timestamp | number,
    format?: DateFormat,
    timeZone?: string,
    locale?: string,
  ): string;
  public transform(
    value?: null,
    format?: DateFormat,
    timeZone?: string,
    locale?: string,
  ): "";
  public transform(
    value?: Date | Timestamp | number | null,
    format?: DateFormat,
    timeZone?: string,
    locale?: string,
  ): string | "" {
    if (value) {
      let dateTimeFormat: Intl.DateTimeFormat;
      let rejectedTimeZone: string | undefined;

      if (format === DateFormat.LongMonth || format === DateFormat.MediumMonth || format === DateFormat.ShortMonth) {
        try {
          dateTimeFormat = Intl.DateTimeFormat(
            locale || this.localeId,
            {
              month:    format === DateFormat.LongMonth ? "long" : format === DateFormat.MediumMonth ? "short" : "2-digit",
              timeZone: timeZone || this.request?.headersDistinct["time-zone"]?.[0],
              year:     format === DateFormat.LongMonth || format === DateFormat.MediumMonth ? "numeric" : "2-digit",
            },
          );
        } catch {
          dateTimeFormat = Intl.DateTimeFormat(
            locale || this.localeId,
            {
              month:    format === DateFormat.LongMonth ? "long" : format === DateFormat.MediumMonth ? "short" : "2-digit",
              timeZone: this.request?.headersDistinct["time-zone"]?.[0],
              year:     format === DateFormat.LongMonth || format === DateFormat.MediumMonth ? "numeric" : "2-digit",
            },
          );
        }

        return dateTimeFormat.format(typeof value === "object" ? "seconds" in value && "nanoseconds" in value ? value.seconds * 1000 + value.nanoseconds / 1000000 : value : value);
      }

      try {
        dateTimeFormat = Intl.DateTimeFormat(
          "en-US",
          {
            timeZone:     timeZone || this.request?.headersDistinct["time-zone"]?.[0],
            timeZoneName: "longOffset",
          },
        );
      } catch {
        dateTimeFormat   = Intl.DateTimeFormat(
          "en-US",
          {
            timeZone:     this.request?.headersDistinct["time-zone"]?.[0],
            timeZoneName: "longOffset",
          },
        );
        rejectedTimeZone = timeZone;
      }

      return formatDate(
        typeof value === "object" ? "seconds" in value && "nanoseconds" in value ? value.seconds * 1000 + value.nanoseconds / 1000000 : value : value,
        format || "mediumDate",
        locale || this.localeId,
        rejectedTimeZone || dateTimeFormat.formatToParts(typeof value === "object" ? "seconds" in value && "nanoseconds" in value ? value.seconds * 1000 + value.nanoseconds / 1000000 : value : value).filter<Intl.DateTimeFormatPart & { "type": "timeZoneName" }>((dateTimeFormatPart: Intl.DateTimeFormatPart): dateTimeFormatPart is Intl.DateTimeFormatPart & { "type": "timeZoneName" } => dateTimeFormatPart.type === "timeZoneName")[0]?.value.replace(
            "GMT",
            "",
          ).replace(
            ":",
            "",
          ) || "GMT",
      );
    }

    return "";
  }

}
