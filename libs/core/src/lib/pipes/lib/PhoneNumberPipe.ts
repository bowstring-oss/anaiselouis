/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { Pipe, PipeTransform }                                     from "@angular/core";
import { ParseError, parsePhoneNumberWithError, type PhoneNumber } from "libphonenumber-js";


@Pipe(
  {
    name: "bowstringPhoneNumber",

    standalone: true,
  },
)
export class PhoneNumberPipe
  implements PipeTransform {

  /**
   * @param value The string to format. */
  public transform(value: string): string;
  public transform(value?: null): "";
  public transform(value?: string | null): string | "" {
    if (value) {
      let phoneNumber: PhoneNumber | undefined;

      try {
        phoneNumber = parsePhoneNumberWithError(value);
      } catch (error: unknown) {
        if (!(error instanceof ParseError))
          throw error;
      }

      return phoneNumber ? `+${ phoneNumber.countryCallingCode } ${ phoneNumber.formatNational() }` : "";
    }

    return "";
  }

}
