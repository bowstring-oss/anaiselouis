/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { isPlatformServer }                                                          from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, type OnInit, PLATFORM_ID }      from "@angular/core";
import { CONFIG_LIB, type ConfigLib }                                                from "@bowstring/config";
import { ENVIRONMENT, type Environment, FindRouteByPathPipe, PathService, RESPONSE } from "@bowstring/core";
import { HeaderComponent, HeadingGroupComponent, RouteHeaderDirective }              from "@bowstring/surface";
import { type Response }                                                             from "express";
import { RouteComponent }                                                            from "../../../../";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      FindRouteByPathPipe,
      HeaderComponent,
      HeadingGroupComponent,
      RouteHeaderDirective,
    ],
    styleUrl:        "OtherwiseRouteComponent.sass",
    templateUrl:     "OtherwiseRouteComponent.html",

    standalone: true,
  },
)
export class OtherwiseRouteComponent
  extends RouteComponent
  implements OnInit {

  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly response: Response | null        = inject<Response | null>(
    RESPONSE,
    { optional: true },
  );

  protected readonly configLib: ConfigLib     = inject<ConfigLib>(CONFIG_LIB);
  protected readonly environment: Environment = inject<Environment>(ENVIRONMENT);
  protected readonly pathService: PathService = inject<PathService>(PathService);

  public override ngOnInit(): void {
    super.ngOnInit();

    if (isPlatformServer(this.platformId))
      this.response?.status(404);
  }

}
