"use client";

import { motion } from "framer-motion";
import Title from "@/components/ui/title";
import { Text } from "@/components/ui/text";
import InfoSection from "@/components/common/InfoSection";
import { Badge } from "./_components/Badge";
import { Select2 } from "@/components/ui/select2";
import { useState } from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";

const data = [
  {
    batch: 2024,
    competitions: [
      {
        name: "Aptitude + DSA 2024",
        badges: [
          {
            name: "John Doe",
            rank: "1st",
            bgColor: "bg-yellow-500",
            imageUrl: "/codewars.webp",
          },
          {
            name: "Jane Smith",
            rank: "2nd",
            bgColor: "bg-[#C0C0C0]",
            imageUrl: "/codewars.webp",
          },
          {
            name: "Alex Johnson",
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
            name: "Alice Brown",
            rank: "Winner",
            bgColor: "bg-yellow-500",
            imageUrl: "/codewars.webp",
          },
          {
            name: "Bob White",
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
        name: "Web war 2023",
        badges: [
          {
            name: "Sophia Brown",
            rank: "Winner",
            bgColor: "bg-yellow-500",
            imageUrl: "/codewars.webp",
          },
          {
            name: "Ethan Black",
            rank: "Runners up",
            bgColor: "bg-[#C0C0C0]",
            imageUrl: "/codewars.webp",
          },
        ],
      },
    ],
  },
];

const gallery2024 = [
  {
    id: 1,
    content: "hello",
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    content: "hello",
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    content: "hello",
    className: "col-span-1 md:row-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    content: "hello",
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    content: "hello",
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    content: "hello",
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    label: `Batch ${entry.batch}`,
    value: entry.batch.toString(),
  }));

  const selectedData = data.find((entry) => entry.batch === selectedBatch);

  const renderBadges = (badges: Badge[]) => {
    return badges.map((badge, index) => (
      <Badge
        key={index}
        name={badge.name}
        rank={badge.rank}
        bgColor={badge.bgColor}
        imageUrl={badge.imageUrl}
      />
    ));
  };

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
          <div className="flex flex-col items-center justify-end gap-4 px-20 md:flex-row">
            <Text className="font-medium">Choose the batch:</Text>
            <Select2
              data={batchOptions}
              value={selectedBatch.toString()}
              onChange={(value) => setSelectedBatch(Number(value))}
              placeholder="Select a batch"
            />
          </div>

          {/* Render Competitions */}
          {selectedData?.competitions.map((competition, index) => (
            <div key={index} className="my-16">
              <Title size="small" className="my-8 text-center font-bold">
                {competition.name}
              </Title>
              <div className="flex flex-wrap items-center justify-center gap-12">
                {renderBadges(competition.badges)}
              </div>
            </div>
          ))}

          {/* Gallery Section */}
          <div>
            <Title size="medium" className="text-center">
              A Glimpse of Codewars {selectedBatch} ✨
            </Title>

            <div className="h-[900px]">
              <LayoutGrid cards={gallery2024} />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
