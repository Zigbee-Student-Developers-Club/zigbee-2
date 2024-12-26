import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const magazineData = [
  {
    imgSrc: "/reflectionHero.webp", // Update the paths to match your project structure
    year: "2022",
    magazineURL:
      "https://drive.google.com/file/d/1d4atWmN2TvQE-c5aexGquTB3_Nbh_Rzk/view?usp=share_link",
  },
  {
    imgSrc: "/reflection2.webp",
    year: "2023",
    magazineURL:
      "https://drive.google.com/file/d/1ZJvMnvlvtFDsmyxR_AEfeuUYDL13vW_0/view?usp=sharing",
  },
  {
    imgSrc: "/reflection2.webp",
    year: "2023",
    magazineURL:
      "https://drive.google.com/file/d/1ZJvMnvlvtFDsmyxR_AEfeuUYDL13vW_0/view?usp=sharing",
  },
  {
    imgSrc: "/reflection2.webp",
    year: "2023",
    magazineURL:
      "https://drive.google.com/file/d/1ZJvMnvlvtFDsmyxR_AEfeuUYDL13vW_0/view?usp=sharing",
  },
];

const Magazines = () => {
  return (
    <div className="container mx-auto my-16 grid max-w-[1200px] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {magazineData.map((data, index) => (
        <Card
          className="group shadow-md transition-shadow hover:shadow-lg"
          key={index}
        >
          <div className="relative h-56 w-full overflow-hidden rounded-t-lg">
            <Image
              src={data.imgSrc}
              alt={`Magazine ${data.year}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <CardHeader className="mt-4 text-center">
            <h3 className="text-xl font-semibold">{`Reflection ${data.year}`}</h3>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default Magazines;
