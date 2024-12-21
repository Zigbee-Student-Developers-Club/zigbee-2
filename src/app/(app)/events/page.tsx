"use client";
import React from "react";
import { useFetchEvents } from "@/lib/SWRhooks/useSWR"; // Adjust the import path as needed
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
import { EventData } from "@/lib/axios/allApiCall"; // Adjust the import path to where EventData is defined

export default function AlumniConnect() {
  const { eventList, isLoading, error } = useFetchEvents();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Type check for eventList
  if (!Array.isArray(eventList)) {
    return <div>No events available at the moment.</div>;
  }

  if (eventList.length === 0) {
    return <div>No events available at the moment.</div>;
  }

  return (
    <>
      <div className="animate-slide-in relative py-10">
        <div className="mx-auto max-w-7xl px-4">
          <InfoSection
            imageSrc="/event-img.png"
            heading="Events"
            text=" Yes, we’ve been really busy and happening lately. Or maybe it’s
                just that we love making it to the headlines time and again.
                Nevertheless, here’s to take you on a quick tour on all our
                ventures in the recent past."
            background="bg-purple-100"
            darkBackground="dark:bg-violet-600"
            imageHeight={500}
            imageWidth={250}
            placedImage={false}
          />

          <div className="container mx-auto my-16 mt-10 grid max-w-[1200px] gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {eventList.map((event: EventData) => (
              <Card key={event.id} className="flex h-auto flex-col hover:shadow-lg">
                <CardHeader>
                  <Image
                    className="rounded-t-lg"
                    src={event.thumbnail || "/fallback-image.png"}
                    alt={`${event.topic} thumbnail`}
                    width={400}
                    height={200}
                  />
                </CardHeader>
                <CardContent className="flex-grow text-gray-500 dark:text-gray-200">
                  <CardTitle className="my-4 text-xl font-bold">
                    {event.topic}
                  </CardTitle>
                  <p className="text-sm">
                    {format(new Date(event.eventDate), "dd MMM yyyy")}
                  </p>
                  <p className="mt-2 text-sm">{event.location}</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {event.speakers.length > 0 ? (
                      event.speakers.map((speaker, idx) => (
                        <li key={idx}>
                          <span className="font-medium">{speaker.name}</span> (
                          {speaker.batch}) - {speaker.role}, {speaker.company}
                        </li>
                      ))
                    ) : (
                      <li>No speakers listed for this event.</li>
                    )}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    Event Experied
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
