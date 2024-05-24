"use client"

import { useEffect, useRef, useState } from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { ActivitiesIcon } from "@/components/svgs/icons"
import ActivityList from "@/components/activities/activity-list"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
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
        <ActivitiesIcon size={7} />
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
    const acts = await getAthleteActivities(accessTokenRef.current, page)
    setActivities(acts)
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