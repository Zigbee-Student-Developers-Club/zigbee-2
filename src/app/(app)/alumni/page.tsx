"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Text } from "@/components/ui/text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InfoSection from "@/components/common/InfoSection";
import Alum from "./_components/Alum";
import Title from "@/components/ui/title";
import { useFetchAlumni } from "@/lib/SWRhooks/useSWR"; // Import the SWR hook

export default function Alumni() {
  const [selectedYear, setSelectedYear] = useState<string>("2025");

  // Fetch alumni using the SWR hook
  const { alumni, isLoading, error } = useFetchAlumni(selectedYear);
  const currYear = new Date().getFullYear() + 2;

  const tabs = Array.from({ length: currYear - 1996 + 1 }, (_, i) => {
    const year = currYear - i; // Start from 2025 and decrement
    return { value: year.toString(), label: `Batch ${year}` };
  });
  return (
    <>
      {/* Header Section */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <InfoSection
          imageSrc="/alumni-img.webp"
          heading="Alumni"
          text="They’re exemplary, they’re buoyant, they’re the high fliers, they’re the veterans. Here’s to help you learn more and connect with our respected alumni."
          background="bg-blue-100"
          darkBackground="dark:bg-teal-400"
          imageHeight={350}
          imageWidth={350}
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
            {/* Loading State */}
            {isLoading ? (
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
            ) : alumni?.length > 0 ? (
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {alumni
                  ?.sort((a, b) => a.name.localeCompare(b.name)) // Sort by name in alphabetical order
                  .map((alum, index: number) => (
                    <Alum
                      key={index}
                      alumData={{
                        name: alum.name,
                        imgURL: alum.profileImg,
                        linkedinURL: alum.linkedInUrl,
                        position: alum.position,
                      }}
                    />
                  ))}
              </div>
            ) : (
              <div className="p-10 text-center">
                No alumni data found for the batch {selectedYear}
              </div>
            )}
            {/* Error State */}
            {error && (
              <div className="flex flex-col items-center justify-center p-10 text-center">
                <Text className="text-lg font-semibold text-red-500">
                  Error loading alumni data.
                </Text>
                <Text className="text-gray-500 dark:text-gray-400">
                  Please try again later.
                </Text>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
}
