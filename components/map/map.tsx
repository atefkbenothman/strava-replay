"use client"

import { useState, useRef, useEffect } from "react"

import { Button } from "@/components/ui/button"

import mapboxgl from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css'

interface Props {
  togglePlay: () => void
}

export default function ActivityMap({ togglePlay }: Props) {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""
  const mapRef = useRef<mapboxgl.Map>()

  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [-122.3936, 37.7954],
      zoom: 11,
    })
  }, [])

  const togglePlayingState = () => {
    setIsPlaying(!isPlaying)
    togglePlay()
  }

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col gap-2">
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