export type ActivityType = {
  id: string
  resource_state: number
  external_id: string
  upload_id: number
  name: string
  distance: number
  moving_time: number | string
  elapsed_time: number | string
  total_elevation_gain: number
  type: string
  sport_type: string
  start_date: string
  start_date_local: string
  timezone: string
  utc_offset: number
  start_latlng: [number, number]
  end_latlng: [number, number]
  achievement_count: number
  kudos_count: number
  athlete_count: number
  comment_count: number
  photo: number
  map: {
    polyline: string
    summary_polyline: string
  }
  trainer: boolean
  commute: boolean
  manual: boolean
  private: boolean
  flagged: boolean
  gear_id: string
  from_accepted_tag: boolean
  average_speed: number
  max_speed: number
  average_cadence: number
  average_temp: number
  average_watts: number
  weighted_average_watts: number
  kilojoules: number
  device_watts: boolean
  has_heartrate: boolean
  max_watts: number
  elev_high: number
  elev_low: number
  pr_count: number
  total_photo_count: number
  has_kudoed: boolean
  workout_type: number
  suffer_score: number
  description: string
  calories: number
  gear: {
    id: number
    primary: boolean
    name: string
    distance: number
  }
  hide_from_home: boolean
  device_name: string
  embed_token: string
  segment_leaderboard_opt_out: boolean
  leaderboard_opt_out: boolean
}

export type ActivityStreamType = {
  [key: string]: {
    original_size: number
    resolution: string
    series_type: string
    data: number[]
  }
}

export type StreamFormattedType = {
  altitude?: number
  distance?: number
  grade_smooth?: number
  cadence?: number
  watts?: number
  heartrate?: number
  latlng?: [number, number]
  moving?: boolean
  temp?: number
  time?: number
  velocity_smooth?: number
}

export type ActivityDetailsType = {
  id: number
  external_id: string
  upload_id: number
  name: string
  distance: number
  moving_time: number
  elapsed_time: number
  total_elevation_gain: number
  elev_high: number
  elev_low: number
  type: string
  sport_type: string
  start_date: string
  start_date_local: string
  timezone: string
  start_latlng: [number, number]
  end_latlng: [number, number]
  achievement_count: number
  kudos_count: number
  comment_count: number
  athlete_count: number
  photo_count: number
  total_photo_count: number
  map: {
    id: string
    polyline: string
    summary_polyline: string
  }
  trainer: boolean
  commute: boolean
  manual: boolean
  private: boolean
  flagged: boolean
  workout_type: number
  upload_id_str: string
  average_speed: number
  max_speed: number
  has_kudoed: boolean
  hide_from_home: boolean
  gear_id: string
  kilojoules: number
  average_watts: number
  device_watts: boolean
  max_watts: number
  weighted_average_watts: number
  description: string
  calories: number
  device_name: string
  embed_token: string
}

export type ChartDataType = {
  id: string
  label: string
  units: string
  chart_type: string
  stroke_color?: string
}