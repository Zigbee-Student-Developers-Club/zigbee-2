"use client";

import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Select2 } from "@/components/ui/select2";
import { Text } from "@/components/ui/text";
import InfoSection from "@/components/common/InfoSection";
import { ResourceData } from "@/Data/ResourceData";
import ResourceCard from "./_components/Resourcecard";

export default function Resources() {
  const [resourceOption, setResourceOption] = useState("all");

  // Dropdown options
  const domainOptions = [
    { value: "all", label: "All Resources" },
    { value: "androidDev", label: "Android App Development" },
    { value: "backendDev", label: "Backend Development" },
    { value: "designing", label: "Designing" },
    { value: "frontendDev", label: "Frontend Development" },
    { value: "networking", label: "Networking" },
  ];

  // Filter resources based on the selected option
  const filteredResources =
    resourceOption === "all"
      ? ResourceData
      : ResourceData.filter((item) => resourceOption === item.domain);

  return (
    <>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative py-10">
          {/* Info Section */}
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

          {/* Select2 Dropdown */}
          <section className="container mx-auto my-16 max-w-[1200px] text-black dark:text-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-center py-8 gap-4">
              <Text className="font-medium ">
                Choose your domain:
              </Text>
              <Select2
                data={domainOptions}
                value={resourceOption}
                onChange={setResourceOption}
                placeholder="Select a domain"
              />
            </div>

            {/* Resource Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
              {filteredResources.map((item, index) => (
                <motion.div
                  key={index}
                  className="w-full"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link href={item.url} target="_blank">
                    <ResourceCard
                      data={{
                        courseName: item.courseName,
                        author: item.author,
                      }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </motion.div>
    </>
  );
}
