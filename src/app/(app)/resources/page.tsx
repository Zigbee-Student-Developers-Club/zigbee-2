"use client";

import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import Image from "next/image";

import { ResourceData } from "@/Data/resourceData";
import ResourceCard from "@/app/resources/_components/Resourcecard";
import { useState } from "react";
import Link from "next/link";

export default function Resources() {
  const [resourceOption, setResourceOption] = useState("all");

  return (
    <>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-teal-100 rounded-2xl p-8">
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-4">
                Resources
              </h2>
              <p className="text-gray-600">
                Android App Development, Frontend, Backend Development,
                Designing, Networking, Full Stack, anything. Whatever is the
                colour of that feather on your hat, we&apos;ve got you covered.
                Choose your domain, and jump directly to the best resources
                available out there to help you upskill and sharpen your swords.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <Image
                width={350}
                height={200}
                alt="Resource Hero"
                src="/resource.png"
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center py-8 gap-4 dark:text-white text-black">
            <p className="text-gray-700 whitespace-nowrap">
              Choose your domain:
            </p>
            <Select
              value={resourceOption}
              onValueChange={(value) => setResourceOption(value)}
            >
              <SelectTrigger className="w-full max-w-md bg-white dark:bg-black">
                <Button className="w-full">{resourceOption}</Button>
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-black">
                <SelectItem value="all">All Resources</SelectItem>
                <SelectItem value="androidDev">
                  Android App Development
                </SelectItem>
                <SelectItem value="backendDev">Backend Development</SelectItem>
                <SelectItem value="designing">Designing</SelectItem>
                <SelectItem value="frontendDev">
                  Frontend Development
                </SelectItem>
                <SelectItem value="networking">Networking</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
            {resourceOption === "all"
              ? ResourceData.map((item, index) => (
                  <div key={index} className="w-full">
                    <Link href={item.url} target="_blank">
                      <Card className="hover:shadow-lg transition">
                        <CardHeader>{item.title}</CardHeader>
                        <CardContent>{item.description}</CardContent>
                        <CardFooter>{item.domain}</CardFooter>
                      </Card>
                    </Link>
                  </div>
                ))
              : ResourceData.filter(
                  (course) => resourceOption === course.domain
                ).map((item, index) => (
                  <div key={index} className="w-full">
                    <Link href={item.url} target="_blank">
                      <Card className="hover:shadow-lg transition">
                        <CardHeader>{item.title}</CardHeader>
                        <CardContent>{item.description}</CardContent>
                        <CardFooter>{item.domain}</CardFooter>
                      </Card>
                    </Link>
                  </div>
                ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
