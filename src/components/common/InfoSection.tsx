"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface InfoSectionProps {
  imageSrc: string;
  heading: string;
  text: string;
  background?: string;
  darkBackground?: string;
  imageHeight?: number;
  imageWidth?: number;
  placedImage?: boolean;
}

export default function InfoSection({
  imageSrc,
  heading,
  text,
  background,
  darkBackground,
  imageHeight = 200, // Default height
  imageWidth = 350,  // Default width
  placedImage = false, // Default to false, image on the left
}: InfoSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    // Logic for when the section comes into view can be added here
  }, [isInView]);

  return (
    <div ref={ref} className="container mx-auto my-16 max-w-[1200px]">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div
          className={`max-w-7xl mx-auto rounded-2xl my-16 py-16 px-8 ${background} ${darkBackground}`}
        >
          <div
            className={`flex ${
              placedImage ? "flex-col-reverse md:flex-row" : "flex-col-reverse md:flex-row-reverse"
            } items-center justify-center gap-16`}
          >
            {/* Image Section */}
            <div className="flex-1 flex justify-center items-center">
              <Image
                alt={heading}
                src={imageSrc}
                width={imageWidth}
                height={imageHeight}
                className="rounded-lg"
              />
            </div>

            {/* Text Section */}
            <div className="flex-1">
              <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-6xl text-gray-800 dark:text-gray-200">
                {heading}
              </h2>
              <p className="small text-gray-800 dark:text-gray-300 mt-8">{text}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
