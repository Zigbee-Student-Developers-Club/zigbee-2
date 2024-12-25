"use client";

import React from "react";
import { useFetchEvents } from "@/lib/SWRhooks/useSWR";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import InfoSection from "@/components/common/InfoSection";
import { format } from "date-fns";
import MotionDivProvider from "@/components/provider/MotionDivProvider";
import { EventType } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { User, Calendar } from "lucide-react";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function AlumniConnect() {
  const { eventList, isLoading, error } = useFetchEvents();

  if (isLoading) {
    return (
      <div className="container mx-auto flex items-center justify-center py-16">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  if (!Array.isArray(eventList) || eventList.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No events available at the moment.
      </div>
    );
  }

  const isEventExpired = (date: string) => {
    return new Date(date) < new Date();
  };

  return (
    <MotionDivProvider>
      <div className="mx-auto max-w-7xl px-4">
        <InfoSection
          imageSrc="/event-img.webp"
          heading="Events"
          text="Yes, we've been really busy and happening lately. Or maybe it's just that we love making it to the headlines time and again. Nevertheless, here's to take you on a quick tour on all our ventures in the recent past."
          background="bg-purple-100"
          darkBackground="dark:bg-violet-600"
          imageHeight={500}
          imageWidth={250}
          placedImage={false}
        />

        <div className="container mx-auto my-16 mt-10 grid max-w-[1200px] gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {eventList.map((event: EventType) => (
            <Card
              key={event.id}
              className="flex flex-col overflow-hidden bg-gray-100 text-black transition-all duration-300 hover:shadow-xl"
            >
              <CardHeader className="p-0">
                <div className="overflow-hidden">
                  <Image
                    className="max-h-48 rounded-t-lg transition-transform duration-300 hover:scale-105"
                    src={event.thumbnail || "/fallback-image.png"}
                    alt={`${event.topic} thumbnail`}
                    width={400}
                    height={200}
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <div className="mb-6">
                  <CardTitle className="text-xl font-bold">
                    {event.topic}
                  </CardTitle>
                  <div className="mt-3 flex items-center gap-2 text-sm text-blue-900">
                    <Badge
                      variant="outline"
                      className="font-bold text-blue-900"
                    >
                      {format(new Date(event.eventDate), "dd MMM ''yy")}
                    </Badge>
                    <span>•</span>
                    <span className="text-sm font-medium text-gray-500">
                      {format(new Date(event.eventDate), "h:mm a (EEEE)")}
                    </span>
                  </div>
                </div>

                <div className="flex-grow space-y-2">
                  {event.speakers.length > 0 ? (
                    event.speakers.map((speaker, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-cyan-700">
                          <User className="h-5 w-5 text-cyan-300" />
                        </div>
                        <div className="flex flex-col text-sm">
                          <p className="text-base font-bold">
                            {speaker.name}{" "}
                            <span className="text-sm font-medium text-gray-400">
                              ({speaker.batch})
                            </span>
                          </p>
                          <p className="text-gray-400">
                            {speaker.role}, {speaker.company}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">
                      No speakers listed for this event.
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2 border-t border-gray-200 p-4">
                <div className="flex w-full items-center gap-2 text-blue-900">
                  <Calendar className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {format(new Date(event.eventDate), "dd MMMM yyyy")}
                  </span>
                </div>
                <Button
                  variant="outline"
                  className={`w-full ${isEventExpired(event.eventDate) ? "bg-red-500/10 text-red-500 hover:text-red-600" : "bg-green-500/40 text-green-500 hover:text-green-600"}`}
                >
                  {isEventExpired(event.eventDate)
                    ? "Event Expired"
                    : "Join Event"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MotionDivProvider>
  );
}
