/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { NgTemplateOutlet }                                                                                                          from "@angular/common";
import { afterRender, ChangeDetectionStrategy, Component, type ElementRef, inject, input, type InputSignal, type Signal, viewChild } from "@angular/core";
import { toObservable, toSignal }                                                                                                    from "@angular/core/rxjs-interop";
import { GoogleMap }                                                                                                                 from "@angular/google-maps";
import { map, startWith }                                                                                                            from "rxjs";
import { CanvasDirective, ContainerDirective, ElevatedDirective, WellRoundedDirective }                                              from "../../../../../directives";
import { GoogleMapsApiLoaderService }                                                                                                from "../../../../../services";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives:  [
      { directive: CanvasDirective },
      {
        directive: ContainerDirective,
        inputs:    [
          "alignSelf",
          "aspectRatio",
          "hideScrollbar",
          "marginBottom",
          "marginSides",
          "marginTop",
          "overflowX",
          "overflowY",
          "paddingBottom",
          "paddingSides",
          "paddingTop",
          "position",
          "positionBottom",
          "positionLeft",
          "positionRight",
          "positionTop",
          "scrollSnapAlign",
          "scrollSnapStop",
          "scrollSnapType",
        ],
      },
      {
        directive: ElevatedDirective,
        inputs:    [
          "level",
          "materialOpacity",
        ],
      },
      {
        directive: WellRoundedDirective,
        inputs:    [ "level" ],
      },
    ],
    imports:         [
      GoogleMap,
      NgTemplateOutlet,
    ],
    selector:        "bowstring--map",
    styleUrl:        "MapComponent.sass",
    templateUrl:     "MapComponent.html",

    standalone: true,
  },
)
export class MapComponent {

  constructor() {
    afterRender((): void => this.wellRoundedDirective.htmlElementRef$.set(this.htmlDivElementRef$()));

    this.googleMapsApiLoaderService.load("maps").then<void, never>(
      (mapsLibrary: google.maps.MapsLibrary | null): void => {
        if (!mapsLibrary)
          return void (0);

        console.log("Google Maps JavaScript API Maps library ready");
      },
      (error: Error): never => {
        console.error("Something went wrong.");

        throw error;
      },
    );
  }

  private readonly googleMapsApiLoaderService: GoogleMapsApiLoaderService = inject<GoogleMapsApiLoaderService>(GoogleMapsApiLoaderService);
  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");

  protected readonly containerDirective: ContainerDirective = inject<ContainerDirective>(ContainerDirective);

  public readonly optionsInput$: InputSignal<google.maps.MapOptions | undefined> = input<google.maps.MapOptions | undefined>(
    undefined,
    { alias: "options" },
  );

  protected readonly options$: Signal<google.maps.MapOptions>   = toSignal<google.maps.MapOptions>(
    toObservable<google.maps.MapOptions | undefined>(this.optionsInput$).pipe<google.maps.MapOptions | undefined, google.maps.MapOptions>(
      startWith<google.maps.MapOptions | undefined>(this.optionsInput$()),
      map<google.maps.MapOptions | undefined, google.maps.MapOptions>(
        (optionsInput?: google.maps.MapOptions): google.maps.MapOptions => ({
          draggableCursor: "grab",
          draggingCursor:  "grabbing",
          ...optionsInput,
        }),
      ),
    ),
    { requireSync: true },
  );
  protected readonly wellRoundedDirective: WellRoundedDirective = inject<WellRoundedDirective>(WellRoundedDirective);

}
