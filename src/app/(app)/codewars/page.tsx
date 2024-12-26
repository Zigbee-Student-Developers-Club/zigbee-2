"use client";

import Title from "@/components/ui/title";
import { Text } from "@/components/ui/text";
import InfoSection from "@/components/common/InfoSection";
import { Badge } from "./_components/Badge";
import { Select2 } from "@/components/ui/select2";
import { useState } from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";
import MotionDivProvider from "@/components/provider/MotionDivProvider";

const data = [
  {
    batch: 2024,
    competitions: [
      {
        name: "Aptitude + DSA 2024",
        badges: [
          {
            name: "Emily Davis",
            rank: "1st",
            bgColor: "bg-yellow-500",
            imageUrl: "/codewars.webp",
          },
          {
            name: "Chris Lee",
            rank: "2nd",
            bgColor: "bg-[#C0C0C0]",
            imageUrl: "/codewars.webp",
          },
          {
            name: "Sam Wilson",
            rank: "3rd",
            bgColor: "bg-[#CD7F32]",
            imageUrl: "/codewars.webp",
          },
        ],
      },
      {
        name: "Mini Hackathon 2024",
        badges: [
          {
            name: "Sriram Sahoo",
            rank: "Winner",
            bgColor: "bg-yellow-500",
            imageUrl: "/codewars.webp",
          },
          {
            name: "Bhubanesh Maharana",
            rank: "Runners up",
            bgColor: "bg-[#C0C0C0]",
            imageUrl: "/codewars.webp",
          },
        ],
      },
    ],
  },
  {
    batch: 2023,
    competitions: [
      {
        name: "Aptitude + DSA 2023",
        badges: [
          {
            name: "Babita Mohalik",
            rank: "1st",
            bgColor: "bg-yellow-500",
            imageUrl: "/codewars.webp",
          },
          {
            name: "Satya Brata ",
            rank: "2nd",
            bgColor: "bg-[#C0C0C0]",
            imageUrl: "/codewars.webp",
          },
          {
            name: "7",
            rank: "3rd",
            bgColor: "bg-[#CD7F32]",
            imageUrl: "/codewars.webp",
          },
        ],
      },
      {
        name: "Web war 2023",
        badges: [
          {
            name: "Sriram Sahoo",
            rank: "Winner",
            bgColor: "bg-yellow-500",
            imageUrl: "/codewars.webp",
          },
          {
            name: "Bhubanesh Maharana",
            rank: "Runners up",
            bgColor: "bg-[#C0C0C0]",
            imageUrl: "/codewars.webp",
          },
        ],
      },
    ],
  },
];

const gallery2023 = [
  {
    id: 1,
    className: "md:col-span-2",
    thumbnail:
      "https://res.cloudinary.com/dljszrwl0/image/upload/v1735151090/codewars3.a3487541_osrppu.webp",
  },
  {
    id: 2,
    className: "col-span-1",
    thumbnail:
      "https://res.cloudinary.com/dljszrwl0/image/upload/v1735151090/codewars2.80feba04_m06z65.webp",
  },
  {
    id: 3,
    className: "col-span-1 md:row-span-2",
    thumbnail:
      "https://res.cloudinary.com/dljszrwl0/image/upload/v1735143820/MediaAssets/q5zdujirz6c6glstvuag.webp",
  },
  {
    id: 4,
    className: "md:col-span-2",
    thumbnail:
      "https://res.cloudinary.com/dljszrwl0/image/upload/v1735146004/codewars2023-4_fajy3f.webp",
  },
  {
    id: 5,
    className: "col-span-1",
    thumbnail:
      "https://res.cloudinary.com/dljszrwl0/image/upload/v1735151090/codewars2.80feba04_m06z65.webp",
  },
  {
    id: 6,
    className: "col-span-1",
    thumbnail:
      "https://res.cloudinary.com/dljszrwl0/image/upload/v1735146004/codewars2023-4_fajy3f.webp",
  },
];

const gallery2024 = [
  {
    id: 1,
    className: "md:col-span-2",
    thumbnail:
      "https://res.cloudinary.com/dljszrwl0/image/upload/v1735151837/WhatsApp_Image_2024-12-25_at_12.32.39_ef6f02a1_kot1n2.jpg",
  },
  {
    id: 2,
    className: "col-span-1",
    thumbnail:
      "https://res.cloudinary.com/dljszrwl0/image/upload/v1735151090/WhatsApp_Image_2024-12-25_at_12.32.37_ec768427_v3eoso.webp",
  },
  {
    id: 3,
    className: "col-span-1 md:row-span-2",
    thumbnail:
      "https://res.cloudinary.com/dljszrwl0/image/upload/v1735151837/WhatsApp_Image_2024-12-25_at_12.32.39_ef6f02a1_kot1n2.jpg",
  },
  {
    id: 4,
    className: "md:col-span-2",
    thumbnail:
      "https://res.cloudinary.com/dljszrwl0/image/upload/v1735151091/WhatsApp_Image_2024-12-25_at_12.54.10_3a35c09d_cnkdtw.webp",
  },
  {
    id: 5,
    className: "col-span-1",
    thumbnail:
      "https://res.cloudinary.com/dljszrwl0/image/upload/v1735151090/WhatsApp_Image_2024-12-25_at_12.32.37_ec768427_v3eoso.webp",
  },
  {
    id: 6,
    className: "col-span-1",
    thumbnail:
      "https://res.cloudinary.com/dljszrwl0/image/upload/v1735151090/WhatsApp_Image_2024-12-25_at_12.54.08_4d9caa93_thdbj0.webp",
  },
];

interface Badge {
  name: string;
  rank: string;
  bgColor: string;
  imageUrl: string;
}

export default function CodeWar() {
  const [selectedBatch, setSelectedBatch] = useState(2024);

  const batchOptions = data.map((entry) => ({
    label: `Year ${entry?.batch}`,
    value: entry?.batch?.toString(),
  }));

  const selectedData = data.find((entry) => entry?.batch === selectedBatch);

  const renderBadges = (badges: Badge[] | undefined) => {
    return badges?.map((badge, index) => (
      <Badge
        key={index}
        name={badge?.name}
        rank={badge?.rank}
        bgColor={badge?.bgColor}
        imageUrl={badge?.imageUrl}
      />
    ));
  };

  const getGalleryByBatch = () => {
    switch (selectedBatch) {
      case 2024:
        return gallery2024;
      case 2023:
        return gallery2023;
      default:
        return [];
    }
  };

  return (
    <MotionDivProvider>
      <div className="relative py-10">
        {/* Info Section */}
        <InfoSection
          imageSrc="/codewars.webp"
          heading="CodeWars"
          text="Embark on a coding odyssey like never before! CodeWars brings you intense competitive coding, brain-twisting aptitude challenges, and thrilling web development tasks. Don't just code; compete, conquer, and celebrate victory!"
          background="bg-teal-100"
          darkBackground="dark:bg-teal-400"
          imageHeight={200}
          imageWidth={200}
          placedImage={false}
        />

        {/* Batch Selector */}
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-start gap-4 px-10 md:flex-row">
          <Text className="font-medium">Choose the batch:</Text>
          <Select2
            data={batchOptions}
            value={selectedBatch?.toString()}
            onChange={(value) => setSelectedBatch(Number(value))}
            placeholder="Select a batch"
          />
        </div>

        {/* Render Competitions */}
        {selectedData?.competitions?.map((competition, index) => (
          <div key={index} className="my-16">
            <Title size="small" className="my-8 text-center font-bold">
              {competition?.name}
            </Title>
            <div className="flex flex-wrap items-center justify-center gap-12">
              {renderBadges(competition?.badges)}
            </div>
          </div>
        ))}

        {/* Gallery Section */}
        <div>
          <Title size="medium" className="text-center">
            A Glimpse of Codewars {selectedBatch} ✨
          </Title>
          <div className="mx-auto h-[1000px] w-full max-w-7xl md:h-[950px]">
            <LayoutGrid cards={getGalleryByBatch()} />
          </div>
        </div>
      </div>
    </MotionDivProvider>
  );
}
