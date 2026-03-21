/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { Pipe, PipeTransform } from "@angular/core";


@Pipe(
  {
    name: "bowstringInsertZwnjs",

    standalone: true,
  },
)
export class InsertZwnjsPipe
  implements PipeTransform {

  /**
   * @param value The string to format. */
  public transform(value: string): string;
  public transform(value?: null): "";
  public transform(value?: string | null): string | "" {
    if (value)
      return value.replace(
        /\b(\w)/g,
        `$1&zwnj;`,
      );

    return "";
  }

}
