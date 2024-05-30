"use client"

import { useState, useRef, useEffect } from "react"

import { useContext } from "react"
import { ActivityProviderContext } from "@/app/activities/[id]/page"

import polyline from "@mapbox/polyline"
import mapboxgl from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css'

export default function ActivityMap() {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""
  const mapRef = useRef<mapboxgl.Map>()

  const { activitySummary, isPlaying, routeCoordinates } = useContext(ActivityProviderContext)

  const loadOriginalRoute = (routeCoords: [number, number][]) => {
    if (mapRef.current) {
      const map = mapRef.current

      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: routeCoords
          }
        }
      })

      map.addLayer({
        id: "route",
        source: "route",
        type: "line",
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "red",
          "line-opacity": 0.75,
          "line-width": 3
        }
      })

    }
  }

  const initializeTraceRoute = (routeCoords: [number, number][]) => {
    if (mapRef.current) {
      const map = mapRef.current
      const origin_coords = routeCoords[0]

      map.addSource("trace", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [origin_coords]
              }
            }
          ]
        }
      })

      map.addLayer({
        id: "trace",
        type: "line",
        source: "trace",
        paint: {
          "line-color": "blue",
          "line-opacity": 1,
          "line-width": 3
        }
      })

    }

  }

  useEffect(() => {
    if (isPlaying && routeCoordinates.length > 0 && mapRef.current) {
      const map = mapRef.current
      const feature = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: routeCoordinates
            }
          }
        ]
      }
      const traceSource = map.getSource("trace") as mapboxgl.GeoJSONSource
      traceSource.setData(feature as any)
      map.panTo(routeCoordinates.at(-1) as [number, number])
      map.setCenter(routeCoordinates.at(-1) as [number, number])
      map.zoomTo(14)
    }
  }, [routeCoordinates])

  useEffect(() => {
    if (activitySummary.map) {
      const routeCoords = polyline.toGeoJSON(activitySummary.map.summary_polyline).coordinates as [number, number][]

      const map = new mapboxgl.Map({
        container: "map",
        // style: "mapbox://styles/mapbox/standard",
        style: "mapbox://styles/mapbox/dark-v11",
        center: [routeCoords[0][0], routeCoords[0][1]],
        zoom: 11
      })
      mapRef.current = map

      map.on("load", async () => {
        loadOriginalRoute(routeCoords)
        initializeTraceRoute(routeCoords)
      })
    }
  }, [activitySummary])

  return (
    <div className="w-full h-full">
      <div id="map" className="w-full h-full rounded" />
    </div>
  )
}