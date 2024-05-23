"use client"

import { useEffect, useRef, useState } from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import ActivityList from "@/components/activities/activity-list"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { ActivityType } from "@/lib/types"
import { getAthleteActivities } from "@/lib/strava-utils"

const Title = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3 items-center">
        <p className="text-3xl font-medium">Activities</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </div>
      <p className="text-muted-foreground">Choose an activity to replay</p>
    </div>
  )
}

export default function Activities() {
  const [activities, setActivities] = useState<ActivityType[]>([])
  const [currPage, setCurrPage] = useState<number>(1)
  const accessTokenRef = useRef<string>("")

  const getActivities = async (page: number) => {
    if (accessTokenRef.current) {
      const acts = await getAthleteActivities(accessTokenRef.current, page)
      setActivities(acts)
    }
  }

  // get access token from session storage
  useEffect(() => {
    if (sessionStorage.hasOwnProperty("accessToken")) {
      const accessToken = sessionStorage.getItem("accessToken") as string
      accessTokenRef.current = accessToken
      getActivities(currPage)
    }
  }, [])

  const handleNextPage = () => {
    getActivities(currPage + 1)
    setCurrPage((currPage) => currPage + 1)
  }

  const handlePrevPage = () => {
    getActivities(currPage - 1)
    setCurrPage((currPage) => currPage - 1)
  }

  return (
    <div className="w-screen h-screen bg-background text-foreground">
      <div className="flex justify-center h-full">
        <div className="flex flex-col w-1/3 text-foreground gap-10 my-10">
          <Title />
          <ScrollArea className="h-full w-full">
            <ActivityList activities={activities} />
          </ScrollArea>
          <Pagination>
            <PaginationContent>
              {currPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={handlePrevPage} />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext onClick={handleNextPage} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}