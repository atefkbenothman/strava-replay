"use client"

import { useState, useRef, useEffect } from "react"

import { Button } from "@/components/ui/button"

import { ActivityDetailsType } from "@/lib/types"

import polyline from "@mapbox/polyline"
import mapboxgl from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css'

interface Props {
  activityDetails: ActivityDetailsType | undefined
  togglePlay: () => void
  traceCoordinates: number[][]
}

export default function ActivityMap({ activityDetails, togglePlay, traceCoordinates }: Props) {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""
  const mapRef = useRef<mapboxgl.Map>()

  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [coordinates, setCoordinates] = useState<number[][]>([])

  useEffect(() => {
    if (mapRef.current && traceCoordinates && traceCoordinates.length > 0) {
      const map = mapRef.current
      const geojson = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: traceCoordinates
            }
          }
        ]
      }
      const traceSource = map.getSource("trace") as mapboxgl.GeoJSONSource
      traceSource.setData(geojson as any)
      map.panTo(traceCoordinates.at(-1) as [number, number])
      map.setCenter(traceCoordinates.at(-1) as [number, number])
      map.zoomTo(14)
    }
  }, [traceCoordinates])

  const loadTraceRoute = () => {
    if (mapRef.current) {
      const map = mapRef.current
      const origin_coords = coordinates[0]
      const featureData = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: origin_coords
            }
          }
        ]
      }
      map.addSource("trace", {
        type: "geojson",
        data: featureData as any
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

  const loadOriginalRoute = (coords: number[][]) => {
    if (mapRef.current) {
      const map = mapRef.current
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coords
          }
        }
      })
      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
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

  // initialize map
  useEffect(() => {
    if (activityDetails) {
      // convert polyline to geojson
      const coords = polyline.toGeoJSON(activityDetails.map.summary_polyline).coordinates
      setCoordinates(coords)

      const map = new mapboxgl.Map({
        container: 'map',
        // style: "mapbox://styles/mapbox/outdoors-v12",
        style: "mapbox://styles/mapbox/standard",
        // style: "mapbox://styles/mapbox/dark-v11",
        center: coords[0] as [number, number],
        zoom: 11,
      })
      mapRef.current = map

      map.on("load", async () => {
        loadOriginalRoute(coords)
        loadTraceRoute()
      })
    }
  }, [activityDetails])

  const togglePlayingState = () => {
    setIsPlaying(!isPlaying)
    togglePlay()
    // clear route layer
    if (mapRef.current) {
      const map = mapRef.current
      if (map.getLayer("route") && map.getSource("route")) {
        map.removeLayer("route")
        map.removeSource("route")
      }
    }
  }

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col gap-4">
        <div id="map" className="w-full h-full rounded" />
        {isPlaying ? (
          <Button className="rounded" variant="secondary" onClick={togglePlayingState}>Pause</Button>
        ): (
          <Button className="rounded" variant="secondary" onClick={togglePlayingState}>Play</Button>
        )}
      </div>
    </div>
  )
}