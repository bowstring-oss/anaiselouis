/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { Pipe, PipeTransform }     from "@angular/core";
import { type Route, type Routes } from "@angular/router";


@Pipe(
  {
    name: "bowstringFindRouteByPath",

    standalone: true,
  },
)
export class FindRouteByPathPipe
  implements PipeTransform {

  public transform(
    value: Routes,
    path?: string,
  ): Route
  public transform(
    value?: null,
    path?: string,
  ): undefined
  public transform(
    value?: Routes | null,
    path?: string,
  ): Route | undefined {
    if (value)
      return value.find((route: Route): boolean => route.path === path);

    return undefined;
  }

}
