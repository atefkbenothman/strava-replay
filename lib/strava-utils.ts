export const generateStravaAuthURL = (): string => {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || ""
  const redirectURI = "http://localhost:3000/"
  const responseType = "code"
  const approvalPrompt = "force"
  const scope = "read_all,activity:read_all,profile:read_all"
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: responseType,
    redirect_uri: redirectURI,
    approval_prompt: approvalPrompt,
    scope: scope
  }).toString()
  const baseURL = "https://strava.com/oauth/authorize"
  const authorizeURL = `${baseURL}?${params}`
  return authorizeURL
}

export const exchangeCodeForToken = async (code: string): Promise<string> => {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || ""
  const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET || ""
  const grantType = "authorization_code"
  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    code: code,
    grant_type: grantType
  })
  const baseURL = "https://www.strava.com/oauth/token"
  const exchangeURL = `${baseURL}?${params}`
  const res = await fetch(exchangeURL, {
    method: "POST"
  })
  if (!res.ok) {
    throw new Error("error exchanging code for access token")
  }
  const data = await res.json()
  return data.access_token
}

export const getAthleteActivities = async (accessToken: string) => {
  const numActs = 15
  const baseURL = `https://www.strava.com/api/v3/athlete/activities?per_page=${numActs}`
  const res = await fetch(baseURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + accessToken
    }
  })
  if (!res.ok) {
    throw new Error(`error retrieving ${baseURL}`)
  }
  const data = await res.json()
  return data
}

export const fetchActivityStream = async (activityId: string, accessToken: string) => {
  const baseURL = `https://www.strava.com/api/v3/activities/${activityId}/streams?keys=time,distance,latlng,heartrate,cadence,temp,velocity_smooth,watts,grade_smooth,moving,altitude&key_by_type=true`
  const res = await fetch(baseURL, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken
    }
  })
  if (!res.ok) {
    throw new Error(`error retrieving ${baseURL}`)
  }
  const data = await res.json()
  return data
}