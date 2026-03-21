/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { isPlatformBrowser }               from "@angular/common";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { type Environment, ENVIRONMENT }   from "@bowstring/core";
import { importLibrary, setOptions }       from "@googlemaps/js-api-loader";


@Injectable({ providedIn: "root" })
export class GoogleMapsApiLoaderService {

  private readonly environment: Environment         = inject<Environment>(ENVIRONMENT);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  private coreLibrary?: google.maps.CoreLibrary | null;
  private coreLibraryPromise?: Promise<google.maps.CoreLibrary | null>;
  private drawingLibrary?: google.maps.DrawingLibrary | null;
  private drawingLibraryPromise?: Promise<google.maps.DrawingLibrary | null>;
  private elevationLibrary?: google.maps.ElevationLibrary | null;
  private elevationLibraryPromise?: Promise<google.maps.ElevationLibrary | null>;
  private geocodingLibrary?: google.maps.GeocodingLibrary | null;
  private geocodingLibraryPromise?: Promise<google.maps.GeocodingLibrary | null>;
  private geometryLibrary?: google.maps.GeometryLibrary | null;
  private geometryLibraryPromise?: Promise<google.maps.GeometryLibrary | null>;
  private journeySharingLibrary?: google.maps.JourneySharingLibrary | null;
  private journeySharingLibraryPromise?: Promise<google.maps.JourneySharingLibrary | null>;
  private mapsLibrary?: google.maps.MapsLibrary | null;
  private mapsLibraryPromise?: Promise<google.maps.MapsLibrary | null>;
  private maps3dLibrary?: google.maps.Maps3DLibrary | null;
  private maps3dLibraryPromise?: Promise<google.maps.Maps3DLibrary | null>;
  private markerLibrary?: google.maps.MarkerLibrary | null;
  private markerLibraryPromise?: Promise<google.maps.MarkerLibrary | null>;
  private placesLibrary?: google.maps.PlacesLibrary | null;
  private placesLibraryPromise?: Promise<google.maps.PlacesLibrary | null>;
  private routesLibrary?: google.maps.RoutesLibrary | null;
  private routesLibraryPromise?: Promise<google.maps.RoutesLibrary | null>;
  private streetViewLibrary?: google.maps.StreetViewLibrary | null;
  private streetViewLibraryPromise?: Promise<google.maps.StreetViewLibrary | null>;
  private visualizationLibrary?: google.maps.VisualizationLibrary | null;
  private visualizationLibraryPromise?: Promise<google.maps.VisualizationLibrary | null>;

  private setOptions(): void {
    setOptions(
      {
        key: this.environment.apis.firebase.apiKey,
        v:   "weekly",
      },
    );
  }

  public async load(library: "core"): Promise<google.maps.CoreLibrary | null>
  public async load(library: "drawing"): Promise<google.maps.DrawingLibrary | null>
  public async load(library: "elevation"): Promise<google.maps.ElevationLibrary | null>
  public async load(library: "geocoding"): Promise<google.maps.GeocodingLibrary | null>
  public async load(library: "geometry"): Promise<google.maps.GeometryLibrary | null>
  public async load(library: "journeySharing"): Promise<google.maps.JourneySharingLibrary | null>
  public async load(library: "maps"): Promise<google.maps.MapsLibrary | null>
  public async load(library: "maps3d"): Promise<google.maps.Maps3DLibrary | null>
  public async load(library: "marker"): Promise<google.maps.MarkerLibrary | null>
  public async load(library: "places"): Promise<google.maps.PlacesLibrary | null>
  public async load(library: "routes"): Promise<google.maps.RoutesLibrary | null>
  public async load(library: "streetView"): Promise<google.maps.StreetViewLibrary | null>
  public async load(library: "visualization"): Promise<google.maps.VisualizationLibrary | null>
  public async load(library: "core" | "drawing" | "elevation" | "geocoding" | "geometry" | "journeySharing" | "maps" | "maps3d" | "marker" | "places" | "routes" | "streetView" | "visualization"): Promise<google.maps.CoreLibrary | google.maps.DrawingLibrary | google.maps.ElevationLibrary | google.maps.GeocodingLibrary | google.maps.GeometryLibrary | google.maps.JourneySharingLibrary | google.maps.MapsLibrary | google.maps.Maps3DLibrary | google.maps.MarkerLibrary | google.maps.PlacesLibrary | google.maps.RoutesLibrary | google.maps.StreetViewLibrary | google.maps.VisualizationLibrary | null> {
    if (!isPlatformBrowser(this.platformId))
      return null;

    switch (library) {
      case "core":
        if (this.coreLibrary !== undefined)
          return this.coreLibrary;

        this.setOptions();

        return this.coreLibraryPromise ??= importLibrary<"core">("core").then<google.maps.CoreLibrary, null>(
          (coreLibrary: google.maps.CoreLibrary): google.maps.CoreLibrary => this.coreLibrary = coreLibrary,
          (error: Error): null => {
            console.error(error);

            return this.coreLibrary = null;
          },
        );
      case "drawing":
        if (this.drawingLibrary !== undefined)
          return this.drawingLibrary;

        this.setOptions();

        return this.drawingLibraryPromise ??= importLibrary<"drawing">("drawing").then<google.maps.DrawingLibrary, null>(
          (drawingLibrary: google.maps.DrawingLibrary): google.maps.DrawingLibrary => this.drawingLibrary = drawingLibrary,
          (error: Error): null => {
            console.error(error);

            return this.drawingLibrary = null;
          },
        );
      case "elevation":
        if (this.elevationLibrary !== undefined)
          return this.elevationLibrary;

        this.setOptions();

        return this.elevationLibraryPromise ??= importLibrary<"elevation">("elevation").then<google.maps.ElevationLibrary, null>(
          (elevationLibrary: google.maps.ElevationLibrary): google.maps.ElevationLibrary => this.elevationLibrary = elevationLibrary,
          (error: Error): null => {
            console.error(error);

            return this.elevationLibrary = null;
          },
        );
      case "geocoding":
        if (this.geocodingLibrary !== undefined)
          return this.geocodingLibrary;

        this.setOptions();

        return this.geocodingLibraryPromise ??= importLibrary<"geocoding">("geocoding").then<google.maps.GeocodingLibrary, null>(
          (geocodingLibrary: google.maps.GeocodingLibrary): google.maps.GeocodingLibrary => this.geocodingLibrary = geocodingLibrary,
          (error: Error): null => {
            console.error(error);

            return this.geocodingLibrary = null;
          },
        );
      case "geometry":
        if (this.geometryLibrary !== undefined)
          return this.geometryLibrary;

        this.setOptions();

        return this.geometryLibraryPromise ??= importLibrary<"geometry">("geometry").then<google.maps.GeometryLibrary, null>(
          (geometryLibrary: google.maps.GeometryLibrary): google.maps.GeometryLibrary => this.geometryLibrary = geometryLibrary,
          (error: Error): null => {
            console.error(error);

            return this.geometryLibrary = null;
          },
        );
      case "journeySharing":
        if (this.journeySharingLibrary !== undefined)
          return this.journeySharingLibrary;

        this.setOptions();

        return this.journeySharingLibraryPromise ??= importLibrary<"journeySharing">("journeySharing").then<google.maps.JourneySharingLibrary, null>(
          (journeySharingLibrary: google.maps.JourneySharingLibrary): google.maps.JourneySharingLibrary => this.journeySharingLibrary = journeySharingLibrary,
          (error: Error): null => {
            console.error(error);

            return this.journeySharingLibrary = null;
          },
        );
      case "maps":
        if (this.mapsLibrary !== undefined)
          return this.mapsLibrary;

        this.setOptions();

        return this.mapsLibraryPromise ??= importLibrary<"maps">("maps").then<google.maps.MapsLibrary, null>(
          (mapsLibrary: google.maps.MapsLibrary): google.maps.MapsLibrary => this.mapsLibrary = mapsLibrary,
          (error: Error): null => {
            console.error(error);

            return this.mapsLibrary = null;
          },
        );
      case "maps3d":
        if (this.maps3dLibrary !== undefined)
          return this.maps3dLibrary;

        this.setOptions();

        return this.maps3dLibraryPromise ??= importLibrary<"maps3d">("maps3d").then<google.maps.Maps3DLibrary, null>(
          (maps3dLibrary: google.maps.Maps3DLibrary): google.maps.Maps3DLibrary => this.maps3dLibrary = maps3dLibrary,
          (error: Error): null => {
            console.error(error);

            return this.maps3dLibrary = null;
          },
        );
      case "marker":
        if (this.markerLibrary !== undefined)
          return this.markerLibrary;

        this.setOptions();

        return this.markerLibraryPromise ??= importLibrary<"marker">("marker").then<google.maps.MarkerLibrary, null>(
          (markerLibrary: google.maps.MarkerLibrary): google.maps.MarkerLibrary => this.markerLibrary = markerLibrary,
          (error: Error): null => {
            console.error(error);

            return this.markerLibrary = null;
          },
        );
      case "places":
        if (this.placesLibrary !== undefined)
          return this.placesLibrary;

        this.setOptions();

        return this.placesLibraryPromise ??= importLibrary<"places">("places").then<google.maps.PlacesLibrary, null>(
          (placesLibrary: google.maps.PlacesLibrary): google.maps.PlacesLibrary => this.placesLibrary = placesLibrary,
          (error: Error): null => {
            console.error(error);

            return this.placesLibrary = null;
          },
        );
      case "routes":
        if (this.routesLibrary !== undefined)
          return this.routesLibrary;

        this.setOptions();

        return this.routesLibraryPromise ??= importLibrary<"routes">("routes").then<google.maps.RoutesLibrary, null>(
          (routesLibrary: google.maps.RoutesLibrary): google.maps.RoutesLibrary => this.routesLibrary = routesLibrary,
          (error: Error): null => {
            console.error(error);

            return this.routesLibrary = null;
          },
        );
      case "streetView":
        if (this.streetViewLibrary !== undefined)
          return this.streetViewLibrary;

        this.setOptions();

        return this.streetViewLibraryPromise ??= importLibrary<"streetView">("streetView").then<google.maps.StreetViewLibrary, null>(
          (streetViewLibrary: google.maps.StreetViewLibrary): google.maps.StreetViewLibrary => this.streetViewLibrary = streetViewLibrary,
          (error: Error): null => {
            console.error(error);

            return this.streetViewLibrary = null;
          },
        );
      case "visualization":
        if (this.visualizationLibrary !== undefined)
          return this.visualizationLibrary;

        this.setOptions();

        return this.visualizationLibraryPromise ??= importLibrary<"visualization">("visualization").then<google.maps.VisualizationLibrary, null>(
          (visualizationLibrary: google.maps.VisualizationLibrary): google.maps.VisualizationLibrary => this.visualizationLibrary = visualizationLibrary,
          (error: Error): null => {
            console.error(error);

            return this.visualizationLibrary = null;
          },
        );
    }
  }

}
