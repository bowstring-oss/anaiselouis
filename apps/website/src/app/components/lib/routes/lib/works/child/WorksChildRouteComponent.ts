/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { type Routes }                                from "@angular/router";
import { RouteComponent }                             from "../../../../route/RouteComponent";
import { WORKS_ROUTES, worksRoutesProvider }          from "../children";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers:       [ worksRoutesProvider ],
    template:        "",

    standalone: true,
  },
)
export class WorksChildRouteComponent
  extends RouteComponent {

  protected readonly worksRoutes: Routes = inject<Routes>(WORKS_ROUTES);

}
