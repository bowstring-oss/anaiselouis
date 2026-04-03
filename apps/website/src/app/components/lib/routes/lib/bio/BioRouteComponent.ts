/*
 * Copyright © 2026 Anaïse Louis. All rights reserved.
 */

import { ChangeDetectionStrategy, Component }    from "@angular/core";
import { FindRouteByPathPipe }                   from "@bowstring/core";
import { HeaderComponent, RouteHeaderDirective } from "@bowstring/surface";
import { RouteComponent }                        from "../../../../";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      FindRouteByPathPipe,
      HeaderComponent,
      RouteHeaderDirective,
    ],
    styleUrl:        "BioRouteComponent.sass",
    templateUrl:     "BioRouteComponent.html",

    standalone: true,
  },
)
export class BioRouteComponent
  extends RouteComponent {
}
