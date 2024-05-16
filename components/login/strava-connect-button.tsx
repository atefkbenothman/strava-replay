"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import connectWithStravaLogo from "@/public/connect-with-strava.svg"

interface Props {
  authorizeURL: string
}

export default function StravaConnectButton({ authorizeURL }: Props) {
  const router = useRouter()

  return (
    <div>
      <button onClick={() => router.push(authorizeURL)}>
        <Image src={connectWithStravaLogo} alt="Connect with Strava Logo" />
      </button>
    </div>
  )
}