"use client";

import { motion } from "framer-motion";
import InfoSection from "@/components/common/InfoSection";
import { Select2 } from "@/components/ui/select2";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import Link from "next/link";
import ResourceCard from "./_components/Resourcecard";
import { useFetchResources } from "@/lib/SWRhooks/useSWR";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function Resources() {
  const [resourceOption, setResourceOption] = useState("all");
  const { resourcesList, isLoading, error } = useFetchResources();

  if (isLoading) {
    return (
      <div className="container mx-auto flex items-center justify-center py-16">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    console.error("Error fetching resources:", error);
    return (
      <div className="container mx-auto py-16">
        <p>Failed to load resources. Please try again later.</p>
      </div>
    );
  }

  const filteredResources =
    resourceOption === "all"
      ? resourcesList
      : resourcesList.filter(
          (item) => resourceOption.toLowerCase() === item.domain.toLowerCase()
        );

  const renderResourceCards = () =>
    filteredResources.map(
      (item: { name: string; author: string; url: string }, index: number) => (
        <motion.div
          key={index}
          className="w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: Math.min(index * 0.1, 1) }}
        >
          <Link href={item.url} target="_blank">
            <ResourceCard
              data={{
                courseName: item.name,
                author: item.author,
              }}
            />
          </Link>
        </motion.div>
      )
    );

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative py-10">
        <InfoSection
          imageSrc="/resource.png"
          heading="Resources"
          text="Android App Development, Frontend, Backend Development,
              Designing, Networking, Full Stack, anything. Whatever is the
              colour of that feather on your hat, we've got you covered.
              Choose your domain, and jump directly to the best resources
              available out there to help you upskill and sharpen your swords."
          background="bg-teal-100"
          darkBackground="dark:bg-teal-400"
          imageHeight={200}
          imageWidth={350}
          placedImage={false}
        />

        <section className="container mx-auto my-16 max-w-[1200px] text-black dark:text-gray-200">
          <div className="flex flex-col items-center justify-center gap-4 py-8 md:flex-row">
            <Text className="font-medium">Choose your domain:</Text>
            <Select2
              data={[
                { value: "all", label: "All Resources" },
                { value: "androidDev", label: "Android App Development" },
                { value: "backend", label: "Backend Development" },
                { value: "designing", label: "Designing" },
                { value: "frontend", label: "Frontend Development" },
                { value: "networking", label: "Networking" },
              ]}
              value={resourceOption}
              onChange={setResourceOption}
              placeholder="Select a domain"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {renderResourceCards()}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
