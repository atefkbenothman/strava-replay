"use client"

import Image from "next/image"
import Link from "next/link"

import connectWithStravaLogo from "@/public/connect-with-strava.svg"

interface Props {
  authorizeURL: string
}

export default function StravaConnectButton({ authorizeURL }: Props) {
  return (
    <div>
      <Link href={authorizeURL}>
        <Image src={connectWithStravaLogo} alt="Connect with Strava Logo" width={180} />
      </Link>
    </div>
  )
}