"use client";

import { Card, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import reflectionHero from "../../../../public/reflectionHero.png";
import reflection2 from "../../../../public/reflection2.png";
import InfoSection from "@/components/common/InfoSection";

const magazineData = [
  {
    imgSrc: reflectionHero.src, // Update the paths to match your project structure
    year: "2022",
    magazineURL:
      "https://drive.google.com/file/d/1d4atWmN2TvQE-c5aexGquTB3_Nbh_Rzk/view?usp=share_link",
  },
  {
    imgSrc: reflection2.src,
    year: "2023",
    magazineURL:
      "https://drive.google.com/file/d/1ZJvMnvlvtFDsmyxR_AEfeuUYDL13vW_0/view?usp=sharing",
  },
  {
    imgSrc: reflection2.src,
    year: "2023",
    magazineURL:
      "https://drive.google.com/file/d/1ZJvMnvlvtFDsmyxR_AEfeuUYDL13vW_0/view?usp=sharing",
  },
  {
    imgSrc: reflection2.src,
    year: "2023",
    magazineURL:
      "https://drive.google.com/file/d/1ZJvMnvlvtFDsmyxR_AEfeuUYDL13vW_0/view?usp=sharing",
  },
];

const Magazines = () => {
  return (
    <>
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
            {magazineData.map((data, index) => (
              <Link href={data.magazineURL} target="_blank" key={index}>
                <Card className="group shadow-md transition-shadow hover:shadow-lg">
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
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Magazines;
