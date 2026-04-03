/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { inject, InjectionToken, type Type, type ValueProvider } from "@angular/core";
import { type ActivatedRouteSnapshot, type Route, type Routes }  from "@angular/router";
import { CONFIG_LIB, type ConfigLib }                            from "@bowstring/config";
import projectRoutes                                             from "../../../projectRoutes";


const parentRoute: Route | undefined        = projectRoutes.find<Route & { "path": "works" }>((route: Route): route is Route & { "path": "works" } => route.path === "works");
const parentDescription: string | undefined = parentRoute?.data?.["description"];
const parentTitle: string | undefined       = parentRoute?.data?.["title"];

if (!parentDescription)
  throw new Error("Missing parent description");

if (!parentTitle)
  throw new Error("Missing parent title");

const worksRoutes: Routes = [
  {
    data:          {
      description: parentDescription,
      title:       parentTitle,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./home/HomeWorksRouteComponent").then<Type<unknown>>(({ HomeWorksRouteComponent }: typeof import("./home/HomeWorksRouteComponent")): Type<unknown> => HomeWorksRouteComponent),
    path:          "",
    pathMatch:     "full",
    title:         ({ data: { title: routeTitle } }: ActivatedRouteSnapshot): string => `${ routeTitle } - ${ inject<ConfigLib>(CONFIG_LIB).brand.title }`,
  },
  {
    data:          {
      description: $localize`:@@apps--Website--Components--Routes--Works-Work_1--Meta--Description:...`,
      title:       $localize`:@@apps--Website--Components--Routes--Works-Work_1--Meta--Title:Work 1`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./work/WorkWorksRouteComponent").then<Type<unknown>>(({ WorkWorksRouteComponent }: typeof import("./work/WorkWorksRouteComponent")): Type<unknown> => WorkWorksRouteComponent),
    path:          "work",
    title:         ({ data: { title: routeTitle } }: ActivatedRouteSnapshot): string => `${ routeTitle } - ${ inject<ConfigLib>(CONFIG_LIB).brand.title } ${ parentTitle }`,
  },
];

export const WORKS_ROUTES: InjectionToken<Routes> = new InjectionToken<Routes>("WORKS_ROUTES");
export const worksRoutesProvider: ValueProvider   = {
  provide:  WORKS_ROUTES,
  useValue: worksRoutes,
};

export default worksRoutes;
