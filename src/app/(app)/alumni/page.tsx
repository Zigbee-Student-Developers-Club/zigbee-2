"use client";

import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Text } from "@/components/ui/text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InfoSection from "@/components/common/InfoSection";
import AlumniCard from "./_components/AlumniCard";
import Title from "@/components/ui/title";
import { useFetchAlumni } from "@/lib/SWRhooks/useSWR";
import MotionDivProvider from "@/components/provider/MotionDivProvider";

export default function Alumni() {
  const currYear = new Date().getFullYear() + 2;
  const [selectedYear, setSelectedYear] = useState<string>(`${currYear}`);
  const { alumniData, isLoading, error } = useFetchAlumni(selectedYear);

  const tabs = Array.from({ length: currYear - 1996 + 1 }, (_, i) => {
    const year = currYear - i;
    return { value: year.toString(), label: `Batch ${year}` };
  });

  return (
    <MotionDivProvider>
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

      <Title size="medium" className="mx-auto max-w-[1200px]">
        Batch :{" "}
      </Title>

      <Tabs
        defaultValue={`${currYear}`}
        className="container mx-auto my-4 max-w-[1200px]"
      >
        {/* Tabs List */}
        <TabsList className="flex flex-wrap justify-start rounded-lg bg-transparent">
          <ScrollArea className="w-full rounded-md border md:mx-auto md:max-w-[1200px] md:px-4">
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

        <div className="container mx-auto my-16 min-h-64 max-w-[1200px] px-4 sm:px-6">
          <TabsContent value={selectedYear}>
            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-full animate-pulse rounded-lg bg-gray-500 p-6 text-center capitalize shadow-md"
                  >
                    <div className="flex h-full flex-col items-center">
                      <div className="mb-6 h-24 w-24 rounded-full bg-gray-300"></div>
                      <div className="mb-2 h-4 w-32 rounded bg-gray-300"></div>
                      <div className="mt-4 h-6 w-6 rounded-full bg-gray-300"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {alumniData && alumniData.length > 0 ? (
                  alumniData
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((alum, index) => (
                      <AlumniCard
                        key={index}
                        alumData={{
                          name: alum.name,
                          imgURL: alum.profileImg,
                          linkedinURL: alum.linkedInUrl,
                          position: alum.position,
                        }}
                      />
                    ))
                ) : (
                  <div className="col-span-full text-center text-gray-600 dark:text-gray-300">
                    No records found for this batch.
                  </div>
                )}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="flex flex-col items-center justify-center p-10 text-center">
                <Text className="text-lg font-semibold text-red-500">
                  Error in loading alumni data.
                </Text>
                <Text className="text-gray-500 dark:text-gray-400">
                  Please try again later.
                </Text>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </MotionDivProvider>
  );
}
