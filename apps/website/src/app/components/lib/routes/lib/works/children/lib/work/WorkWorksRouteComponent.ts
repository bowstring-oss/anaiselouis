/*
 * Copyright © 2026 Anaïse Louis. All rights reserved.
 */

import { ChangeDetectionStrategy, Component } from "@angular/core";
import { WorksChildRouteComponent }           from "../../../child/WorksChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [],
    styleUrl:        "WorkWorksRouteComponent.sass",
    templateUrl:     "WorkWorksRouteComponent.html",

    standalone: true,
  },
)
export class WorkWorksRouteComponent
  extends WorksChildRouteComponent {
}
