/*
 * Copyright © 2026 Anaïse Louis. All rights reserved.
 */

import { ChangeDetectionStrategy, Component, inject }                           from "@angular/core";
import { RouterOutlet, type Routes }                                            from "@angular/router";
import { FindRouteByPathPipe }                                                  from "@bowstring/core";
import { HeaderComponent, LabelComponent, LinkComponent, RouteHeaderDirective } from "@bowstring/surface";
import { RouteComponent }                                                       from "../../../../";
import { WORKS_ROUTES, worksRoutesProvider }                                    from "./children";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      FindRouteByPathPipe,
      HeaderComponent,
      LabelComponent,
      LinkComponent,
      RouteHeaderDirective,
      RouterOutlet,
    ],
    providers:       [ worksRoutesProvider ],
    styleUrl:        "WorksRouteComponent.sass",
    templateUrl:     "WorksRouteComponent.html",

    standalone: true,
  },
)
export class WorksRouteComponent
  extends RouteComponent {

  protected readonly worksRoutes: Routes = inject<Routes>(WORKS_ROUTES);

}
