/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { ChangeDetectionStrategy, Component }                                                                                                                                                       from "@angular/core";
import { DateFormat, DatePipe }                                                                                                                                                                     from "@bowstring/core";
import { ArticleComponent, CapsuleComponent, FlexboxContainerComponent, HeaderComponent, HeadingGroupComponent, LabelComponent, LinkComponent, ListComponent, ListItemDirective, SectionComponent } from "@bowstring/surface";
import { RouteComponent }                                                                                                                                                                           from "../../../../";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      ArticleComponent,
      CapsuleComponent,
      DatePipe,
      FlexboxContainerComponent,
      HeaderComponent,
      HeadingGroupComponent,
      LabelComponent,
      LinkComponent,
      ListComponent,
      ListItemDirective,
      SectionComponent,
    ],
    styleUrl:        "PrivacyRouteComponent.sass",
    templateUrl:     "PrivacyRouteComponent.html",

    standalone: true,
  },
)
export class PrivacyRouteComponent
  extends RouteComponent {

  protected readonly DateFormat: typeof DateFormat = DateFormat;
  protected readonly updatedDate: Date             = new Date("2026-01-19T00:00:00.000Z");

}
