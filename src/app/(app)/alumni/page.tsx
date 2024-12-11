"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Text } from "@/components/ui/text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InfoSection from "@/components/common/InfoSection";
import Image from "next/image";
import Alum from "./_components/Alum";
import Title from "@/components/ui/title";

type Alum = {
  name: string;
  company?: string;
  batch: string;
  text: string;
  imgURL?: string;
  linkedinURL?: string;
  position?: string;
};

export default function Alumni() {
  const [alumni, setAlumni] = useState<Alum[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("2025");
  const [loading, setLoading] = useState(true);

  const tabs = Array.from({ length: 2025 - 1996 + 1 }, (_, i) => {
    const year = 2025 - i; // Start from 2025 and decrement
    return { value: year.toString(), label: `Batch ${year}` };
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // Simulating API call or data fetch
      const alumniData: Record<string, Alum[]> = {
        "2025": [
          {
            name: "Jane Doe",
            company: "Google",
            batch: "2025",
            text: "A great journey at the university.",
            imgURL: "/images/jane.jpg",
            linkedinURL: "https://linkedin.com/in/janedoe",
            position: "PC",
          },
          {
            name: "John Smith",
            company: "Microsoft",
            batch: "2025",
            text: "An unforgettable experience.",
            imgURL: "/images/john.jpg",
            linkedinURL: "https://linkedin.com/in/johnsmith",
            position: "GR",
          },
          {
            name: "Emily Davis",
            company: "Amazon",
            batch: "2024",
            text: "The support and guidance from faculty were exceptional.",
            imgURL: "/images/emily.jpg",
            linkedinURL: "https://linkedin.com/in/emilydavis",
            position: "CR",
          },
          {
            name: "Michael Brown",
            company: "Apple",
            batch: "2024",
            text: "A place where I discovered my true potential.",
            imgURL: "/images/michael.jpg",
            linkedinURL: "https://linkedin.com/in/michaelbrown",
          },
          {
            name: "Sophia Johnson",
            company: "Meta",
            batch: "2023",
            text: "An incredible environment for growth.",
            imgURL: "/images/sophia.jpg",
            linkedinURL: "https://linkedin.com/in/sophiajohnson",
            position: "PC",
          },
          {
            name: "David Lee",
            company: "Tesla",
            batch: "2023",
            text: "The university opened doors to so many opportunities.",
            imgURL: "/images/david.jpg",
            linkedinURL: "https://linkedin.com/in/davidlee",
          },
          {
            name: "Olivia Anderson",
            company: "Stripe",
            batch: "2023",
            text: "An amazing network and lifelong learning experience.",
            imgURL: "/images/olivia.jpg",
            linkedinURL: "https://linkedin.com/in/oliviaanderson",
          },
          {
            name: "Noah Thompson",
            company: "Snapchat",
            batch: "2023",
            text: "Loved every moment of my time here.",
            imgURL: "/images/noah.jpg",
            linkedinURL: "https://linkedin.com/in/noahthompson",
            position: "GR",
          },
          {
            name: "Ava Martinez",
            company: "Netflix",
            batch: "2025",
            text: "Proud to be part of such a vibrant community.",
            imgURL: "/images/ava.jpg",
            linkedinURL: "https://linkedin.com/in/avamartinez",
          },
          {
            name: "Liam Wilson",
            company: "Adobe",
            batch: "2025",
            text: "The best years of my life.",
            imgURL: "/images/liam.jpg",
          },
          {
            name: "Isabella Garcia",
            company: "Spotify",
            batch: "2024",
            text: "Grateful for the friendships and opportunities I made here.",
            imgURL: "/images/isabella.jpg",
            linkedinURL: "https://linkedin.com/in/isabellagarcia",
            position: "PC",
          },
          {
            name: "Ethan Taylor",
            company: "Oracle",
            batch: "2024",
            text: "A transformative journey that shaped my career.",
            imgURL: "/images/ethan.jpg",
          },
          {
            name: "Lily Green",
            company: "Salesforce",
            batch: "2025",
            text: "The mentors and experiences helped me grow.",
            imgURL: "/images/lily.jpg",
            linkedinURL: "https://linkedin.com/in/lilygreen",
          },
          {
            name: "Jack Wilson",
            company: "Uber",
            batch: "2024",
            text: "A place to challenge and shape your future.",
            imgURL: "/images/jack.jpg",
            linkedinURL: "https://linkedin.com/in/jackwilson",
          },
          {
            name: "Charlotte Harris",
            company: "Adobe",
            batch: "2025",
            text: "A journey full of personal growth and success.",
            imgURL: "/images/charlotte.jpg",
            linkedinURL: "https://linkedin.com/in/charlotteharris",
          },
          {
            name: "Benjamin Clark",
            company: "Intel",
            batch: "2025",
            text: "A university that opened endless doors for me.",
            imgURL: "/images/benjamin.jpg",
            linkedinURL: "https://linkedin.com/in/benjaminclark",
            position: "GR",
          },
          {
            name: "Amelia Robinson",
            company: "Facebook",
            batch: "2024",
            text: "I learned so much and am excited to continue growing.",
            imgURL: "/images/amelia.jpg",
            linkedinURL: "https://linkedin.com/in/ameliarobinson",
          },
          {
            name: "James Allen",
            company: "Twitter",
            batch: "2023",
            text: "Fantastic years that shaped me both professionally and personally.",
            imgURL: "/images/james.jpg",
            linkedinURL: "https://linkedin.com/in/jamesallen",
          },
          {
            name: "Grace Williams",
            company: "Dropbox",
            batch: "2025",
            text: "Incredible network, amazing experiences.",
            imgURL: "/images/grace.jpg",
            linkedinURL: "https://linkedin.com/in/gracewilliams",
          },
          {
            name: "Mason Taylor",
            company: "Spotify",
            batch: "2024",
            text: "This university was an amazing foundation for my career.",
            imgURL: "/images/mason.jpg",
            linkedinURL: "https://linkedin.com/in/masontaylor",
          },
          {
            name: "Harper Lee",
            company: "Pinterest",
            batch: "2023",
            text: "The professors and opportunities here made all the difference.",
            imgURL: "/images/harper.jpg",
            linkedinURL: "https://linkedin.com/in/harperlee",
          },
          {
            name: "Sophia Johnson",
            company: "Meta",
            batch: "2025",
            text: "An incredible environment for growth.",
            imgURL: "/images/sophia.jpg",
            linkedinURL: "https://linkedin.com/in/sophiajohnson",
            position: "PC",
          },
          {
            name: "David Lee",
            company: "Tesla",
            batch: "2025",
            text: "The university opened doors to so many opportunities.",
            imgURL: "/images/david.jpg",
            linkedinURL: "https://linkedin.com/in/davidlee",
          },
          {
            name: "Olivia Anderson",
            company: "Stripe",
            batch: "2025",
            text: "An amazing network and lifelong learning experience.",
            imgURL: "/images/olivia.jpg",
            linkedinURL: "https://linkedin.com/in/oliviaanderson",
          },
          {
            name: "Noah Thompson",
            company: "Snapchat",
            batch: "2025",
            text: "Loved every moment of my time here.",
            imgURL: "/images/noah.jpg",
            linkedinURL: "https://linkedin.com/in/noahthompson",
            position: "GR",
          },
          {
            name: "Jane Doe",
            company: "Google",
            batch: "2025",
            text: "A great journey at the university.",
            imgURL: "/images/jane.jpg",
            linkedinURL: "https://linkedin.com/in/janedoe",
            position: "PC",
          },
          {
            name: "John Smith",
            company: "Microsoft",
            batch: "2025",
            text: "An unforgettable experience.",
            imgURL: "/images/john.jpg",
            linkedinURL: "https://linkedin.com/in/johnsmith",
            position: "GR",
          },
          {
            name: "Ava Martinez",
            company: "Netflix",
            batch: "2025",
            text: "Proud to be part of such a vibrant community.",
            imgURL: "/images/ava.jpg",
            linkedinURL: "https://linkedin.com/in/avamartinez",
          },
          {
            name: "Liam Wilson",
            company: "Adobe",
            batch: "2025",
            text: "The best years of my life.",
            imgURL: "/images/liam.jpg",
          },
        ],
        "2024": [
          {
            name: "Emily Davis",
            company: "Amazon",
            batch: "2024",
            text: "The support and guidance from faculty were exceptional.",
            imgURL: "/images/emily.jpg",
            linkedinURL: "https://linkedin.com/in/emilydavis",
            position: "CR",
          },
          {
            name: "Michael Brown",
            company: "Apple",
            batch: "2024",
            text: "A place where I discovered my true potential.",
            imgURL: "/images/michael.jpg",
            linkedinURL: "https://linkedin.com/in/michaelbrown",
          },
          {
            name: "Isabella Garcia",
            company: "Spotify",
            batch: "2024",
            text: "Grateful for the friendships and opportunities I made here.",
            imgURL: "/images/isabella.jpg",
            linkedinURL: "https://linkedin.com/in/isabellagarcia",
            position: "PC",
          },
          {
            name: "Ethan Taylor",
            company: "Oracle",
            batch: "2024",
            text: "A transformative journey that shaped my career.",
            imgURL: "/images/ethan.jpg",
          },
        ],
        "2023": [
          {
            name: "Sophia Johnson",
            company: "Meta",
            batch: "2023",
            text: "An incredible environment for growth.",
            imgURL: "/images/sophia.jpg",
            linkedinURL: "https://linkedin.com/in/sophiajohnson",
            position: "PC",
          },
          {
            name: "David Lee",
            company: "Tesla",
            batch: "2023",
            text: "The university opened doors to so many opportunities.",
            imgURL: "/images/david.jpg",
            linkedinURL: "https://linkedin.com/in/davidlee",
          },
          {
            name: "Olivia Anderson",
            company: "Stripe",
            batch: "2023",
            text: "An amazing network and lifelong learning experience.",
            imgURL: "/images/olivia.jpg",
            linkedinURL: "https://linkedin.com/in/oliviaanderson",
          },
          {
            name: "Noah Thompson",
            company: "Snapchat",
            batch: "2023",
            text: "Loved every moment of my time here.",
            imgURL: "/images/noah.jpg",
            linkedinURL: "https://linkedin.com/in/noahthompson",
            position: "GR",
          },
        ],
      };

      setAlumni(alumniData[selectedYear] || []);
      setLoading(false);
    }, 500);
  }, [selectedYear]);

  return (
    <>
      {/* Header Section */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <InfoSection
          imageSrc="/alumni-img.png"
          heading="Alumni"
          text="They’re exemplary, they’re buoyant, they’re the high fliers, they’re the veterans. Here’s to help you learn more and connect with our respected alumni."
          background="bg-blue-100"
          darkBackground="dark:bg-teal-400"
          imageHeight={350}
          imageWidth={500}
          placedImage={false}
        />
      </motion.div>
      <Title size="medium" className="mx-auto max-w-[1200px]">
        Batch :{" "}
      </Title>
      <Tabs
        defaultValue="2025"
        className="container mx-auto my-4 max-w-[1200px]"
      >
        {/* Tabs List */}
        <TabsList className="flex flex-wrap justify-start rounded-lg bg-transparent">
          <ScrollArea className="max-w-80 rounded-md border md:mx-auto md:max-w-[1200px] md:px-4">
            <div className="flex space-x-2 bg-transparent p-2 py-4">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  onClick={() => setSelectedYear(tab.value)}
                  className="rounded-lg px-4 py-2.5 hover:bg-blue-100 data-[state=active]:bg-blue-200 dark:hover:bg-teal-400 dark:data-[state=active]:bg-teal-500"
                >
                  <Text variant="small">{tab.label}</Text>
                </TabsTrigger>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsList>

        {/* Tabs Content */}
        <div className="container mx-auto my-16 max-w-[1200px] px-4 sm:px-6">
          <TabsContent value={selectedYear}>
            {loading ? (
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-lg border bg-gray-100 p-4 dark:bg-gray-800"
                  >
                    <div className="h-16 w-16 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    <div className="mt-2 h-4 w-3/4 bg-gray-300 dark:bg-gray-600"></div>
                    <div className="mt-1 h-4 w-1/2 bg-gray-300 dark:bg-gray-600"></div>
                  </div>
                ))}
              </div>
            ) : alumni.length > 0 ? (
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {alumni
                  .sort((a, b) => a.name.localeCompare(b.name)) // Sort by name in alphabetical order
                  .map((alum, index) => (
                    <Alum
                      key={index}
                      alumData={{
                        name: alum.name,
                        imgURL: alum.imgURL,
                        linkedinURL: alum.linkedinURL,
                        position: alum.position,
                      }}
                    />
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-10 text-center">
                <Image
                  src="/empty-state.svg"
                  alt="No Alumni Found"
                  className="h-40 w-40"
                  width={200}
                  height={200}
                />
                <Text className="mt-4 text-lg font-semibold">
                  No Alumni Found
                </Text>
                <Text className="text-gray-500 dark:text-gray-400">
                  Try selecting another batch or check back later.
                </Text>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
      ;
    </>
  );
}
