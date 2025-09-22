"use client";

import Title from "@/components/ui/title";
import { Text } from "@/components/ui/text";
import InfoSection from "@/components/common/InfoSection";
import { Badge } from "./_components/Badge";
import { Select2 } from "@/components/ui/select2";
import { useState } from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";
import MotionDivProvider from "@/components/provider/MotionDivProvider";
import { WINNERS_DATA, GALLERY_2023, GALLERY_2024 } from "./constants";

interface BadgeData {
  name: string;
  rank: string;
  bgColor: string;
  imageUrl: string;
  teamMembers?: string[];
}

export default function CodeWar() {
  const [selectedBatch, setSelectedBatch] = useState(2024);

  const batchOptions = WINNERS_DATA.map((entry) => ({
    label: `Year ${entry.batch}`,
    value: entry.batch.toString(),
  }));

  const selectedData = WINNERS_DATA.find(
    (entry) => entry.batch === selectedBatch
  );

  const renderBadges = (badges: BadgeData[] | undefined) => {
    return badges?.map((badge, index) => (
      <Badge
        key={index}
        name={badge.name}
        rank={badge.rank}
        bgColor={badge.bgColor}
        imageUrl={badge.imageUrl}
        teamMembers={badge.teamMembers}
      />
    ));
  };

  const getGalleryByBatch = () => {
    switch (selectedBatch) {
      case 2024:
        return GALLERY_2024;
      case 2023:
        return GALLERY_2023;
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
          <Text className="font-medium">Choose the year:</Text>
          <Select2
            data={batchOptions}
            value={selectedBatch.toString()}
            onChange={(value) => setSelectedBatch(Number(value))}
            placeholder="Select year"
          />
        </div>

        {/* Render Competitions */}
        {selectedData?.competitions?.map((competition, index) => (
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
          <div className="mx-auto h-[1000px] w-full max-w-7xl md:h-[950px]">
            <LayoutGrid cards={getGalleryByBatch()} />
          </div>
        </div>
      </div>
    </MotionDivProvider>
  );
}
