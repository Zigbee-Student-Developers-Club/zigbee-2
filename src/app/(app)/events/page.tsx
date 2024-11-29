import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import ZairzaAndZigbee from "../../../../public/zairzaandzigbee.png";
import Game from "../../../../public/game.png";
import Salesforce from "../../../../public/salesforce.png";
import InfoSection from "@/components/common/InfoSection";

const eventsData = [
  {
    id: 1,
    date: "16th July 2023",
    topic: "Alumini Connect",
    expired: true,
    thumbnail: ZairzaAndZigbee.src,
    speakers: [
      {
        role: "Software Engineer",
        name: "Supriya Sinha",
        company: "Apple Inc.",
        batch: "2006",
      },
      {
        role: "Software Engineer",
        name: "Tanmay Padhi",
        company: "8x8",
        batch: "2006",
      },
      {
        role: "Software Engineer",
        name: "Manas R. Mohanty(B.Tech)",
        company: "Amazon",
        batch: "2006",
      },
    ],
  },
  {
    id: 2,
    date: "24th Jan 2023",
    topic: "Game Development with Unity 3D",
    expired: true,
    thumbnail: Game.src,
    speakers: [
      {
        role: "Game Developer",
        name: "Mallik Ebadat",
        company: "Amgo Games",
        batch: "2020",
      },
    ],
  },
  {
    id: 3,
    date: "28th Nov 2022",
    topic: "Cloud Application Development with Salesforce Platform",
    expired: true,
    thumbnail: Salesforce.src,
    speakers: [
      {
        role: "Tech Lead",
        name: "Debasis Jena",
        company: "Dubai Multi Commodities Center",
        batch: "2011",
      },
    ],
  },
  {
    id: 4,
    date: "24th Jan 2023",
    topic: "Game Development with Unity 3D",
    expired: true,
    thumbnail: Game.src,
    speakers: [
      {
        role: "Game Developer",
        name: "Mallik Ebadat",
        company: "Amgo Games",
        batch: "2020",
      },
    ],
  },
];

export default function AlumniConnect() {
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

          <div
            className="mt-10 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3
          container mx-auto my-16 max-w-[1200px]"
          >
            {eventsData.map((data, i) => (
              <Card key={i} className="flex flex-col hover:shadow-lg h-auto">
                <CardHeader>
                  <Image
                    className="rounded-t-lg"
                    src={data.thumbnail}
                    alt={data.topic}
                    width={400}
                    height={200}
                  />
                </CardHeader>
                <CardContent className="flex-grow text-gray-500 dark:text-gray-200">
                  <CardTitle className="my-4 text-xl font-bold">
                    {data.topic}
                  </CardTitle>
                  <p className="text-sm ">{data.date}</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {data.speakers.map((speaker, idx) => (
                      <li key={idx} >
                        <span className="font-medium">{speaker.name}</span> (
                        {speaker.batch}) - {speaker.role}, {speaker.company}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button variant="outline" className="w-full">
                    {data.expired ? "Event Expired" : "View Details"}
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
