/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { inject, Pipe, PipeTransform } from "@angular/core";
import { LOCALE_ID, type LocaleId }    from "@bowstring/i18n";


@Pipe(
  {
    name: "bowstringGetRegionDisplayName",

    standalone: true,
  },
)
export class GetRegionDisplayNamePipe
  implements PipeTransform {

  private readonly localeId: LocaleId = inject<LocaleId>(LOCALE_ID);

  public transform(value: string): string
  public transform(value?: null): ""
  public transform(value?: string | null): string | "" {
    if (value)
      return new Intl.DisplayNames(
        [ this.localeId ],
        { type: "region" },
      ).of(value) || value;

    return "";
  }

}
