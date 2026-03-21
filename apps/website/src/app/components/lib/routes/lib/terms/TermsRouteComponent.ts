/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { ChangeDetectionStrategy, Component, inject }                                                                                              from "@angular/core";
import { CONFIG_LIB, type ConfigLib }                                                                                                              from "@bowstring/config";
import { DateFormat, DatePipe, type Environment, ENVIRONMENT }                                                                                     from "@bowstring/core";
import { ArticleComponent, CapsuleComponent, FlexboxContainerComponent, HeaderComponent, HeadingGroupComponent, LabelComponent, SectionComponent } from "@bowstring/surface";
import { RouteComponent }                                                                                                                          from "../../../../";


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
      SectionComponent,
    ],
    styleUrl:        "TermsRouteComponent.sass",
    templateUrl:     "TermsRouteComponent.html",

    standalone: true,
  },
)
export class TermsRouteComponent
  extends RouteComponent {

  protected readonly configLib: ConfigLib          = inject<ConfigLib>(CONFIG_LIB);
  protected readonly DateFormat: typeof DateFormat = DateFormat;
  protected readonly environment: Environment      = inject<Environment>(ENVIRONMENT);
  protected readonly updatedDate: Date             = new Date("2025-04-13T00:00:00.000Z");

}
