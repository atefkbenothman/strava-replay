"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { generateStravaAuthURL, exchangeCodeForToken } from "@/lib/strava-utils"

import StravaConnectButton from "@/components/login/strava-connect-button"

export default function StravaAuthorize() {
  const router = useRouter()

  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false)

  useEffect(() => {
    const checkAuthorizing = async () => {
      // check if we have been redirected back from the strava auth page
      const urlParams = new URLSearchParams(window.location.href)
      if (urlParams.has("code")) {
        setIsAuthorizing(true)
        const accessToken = await exchangeCodeForToken(urlParams.get("code") as string)
        sessionStorage.setItem("accessToken", accessToken)
        router.push("/activities")
      }
    }
    checkAuthorizing()
  }, [])

  return (
    <div>
      {isAuthorizing ? (
        <p>authorizing...</p>
      ) : (
        <StravaConnectButton authorizeURL={generateStravaAuthURL()} />
      )}
    </div>
  )
}