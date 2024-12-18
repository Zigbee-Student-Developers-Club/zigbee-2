"use client";

import { Card, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useFetchMagazines } from "@/lib/SWRhooks/useSWR"; // Import the custom hook for fetching magazines
import InfoSection from "@/components/common/InfoSection";
import Title from "@/components/ui/title";

const Magazines = () => {
  // Fetching the magazine data using SWR
  const { magazineList, isLoading, error } = useFetchMagazines();

  if (isLoading) {
    return <div>Loading magazines...</div>; // Loading state
  }

  if (error) {
    return <div>Error fetching magazines: {error.message}</div>; // Error state
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <InfoSection
          imageSrc="/magazines.png"
          heading="Magazines"
          text="Take a quick sneak peek into our Department's Annual Magazine, which embraces a plethora of humbly royal memories and celebrations of the various feats accomplished throughout the recent past"
          background="bg-orange-200"
          darkBackground="dark:bg-orange-600"
          imageHeight={500}
          imageWidth={250}
          placedImage={false}
        />

        {/* Magazine Cards Section */}
        <div className="container mx-auto my-16 grid max-w-[1200px] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {magazineList?.map((data, index: number) => (
            <Link href={data.url} target="_blank" key={index}>
              <Card className="group shadow-md transition-shadow hover:shadow-lg">
                <div className="relative h-56 w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={data.image} // Assuming `profileImg` is the image for the magazines
                    alt={`Magazine ${data.year}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader className="mt-4 text-center">
                  <Title size="small" className="text-xl font-semibold">{` ${data.title}`}</Title>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Magazines;
