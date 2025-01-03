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
import MotionDivProvider from "@/components/provider/MotionDivProvider";
import { DomainOptions } from "@/lib/options";

export default function Resources() {
  const [resourceOption, setResourceOption] = useState("all");

  // Fetch resources using the SWR hook
  const { resourceList, isLoading, error } = useFetchResources();

  if (isLoading) {
    return (
      <div className="container mx-auto flex items-center justify-center py-16">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    // console.error("Error fetching resources:", error);
    return (
      <div className="container mx-auto py-16 text-center">
        <p>Failed to load resources. Please try again later.</p>
        <button className="mt-4 text-blue-600">Retry</button>
      </div>
    );
  }

  const filteredResources =
    resourceOption === "all"
      ? resourceList
      : resourceList?.filter((item) => resourceOption === item?.domain);

  return (
    <MotionDivProvider>
      <div className="relative py-10">
        {/* Info Section */}
        <InfoSection
          imageSrc="/resource.webp"
          heading="Resources"
          text="Android App Development, Frontend, Backend Development,
                Designing, Networking, Full Stack, anything. Whatever is the
                colour of that feather on your hat, we've got you covered.
                Choose your domain, and jump directly to the best resources
                available out there to help you upskill and sharpen your swords."
          background="bg-teal-100"
          darkBackground="dark:bg-teal-400"
          imageHeight={200}
          imageWidth={200}
          placedImage={false}
        />

        {/* Select2 Dropdown */}
        <section className="container mx-auto my-16 max-w-[1200px] text-black dark:text-gray-200">
          <div className="flex flex-col items-center justify-center gap-4 py-8 md:flex-row">
            <Text className="font-medium">Choose your domain:</Text>
            <Select2
              data={DomainOptions}
              value={resourceOption}
              onChange={setResourceOption}
              placeholder="Select a domain"
            />
          </div>

          {/* Resource Cards */}
          <div className="m-5 my-8 grid min-h-36 grid-cols-1 gap-8 sm:m-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredResources?.map((item) => (
              <motion.div
                key={item?.id || item?.name}
                className="w-full"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: filteredResources.indexOf(item) * 0.1,
                }}
              >
                <Link href={item?.url || "#"} target="_blank">
                  <ResourceCard
                    data={{
                      badge:
                        DomainOptions.find((opt) => opt.value === item?.domain)
                          ?.label || "N/A", // Fallback to "N/A" if no matching domain is found
                      courseName: item?.name || "N/A",
                      author: item?.author || "N/A",
                    }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </MotionDivProvider>
  );
}
