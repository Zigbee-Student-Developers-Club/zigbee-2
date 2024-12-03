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
  imageWidth = 350, // Default width
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
          className={`mx-auto my-16 max-w-7xl rounded-2xl px-8 py-16 ${background} ${darkBackground}`}
        >
          <div
            className={`flex ${
              placedImage
                ? "flex-col-reverse md:flex-row"
                : "flex-col-reverse md:flex-row-reverse"
            } items-center justify-center gap-16`}
          >
            {/* Image Section */}
            <div className="flex flex-1 items-center justify-center">
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
              <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-200 sm:text-4xl lg:text-6xl">
                {heading}
              </h2>
              <p className="small mt-8 text-gray-800 dark:text-gray-300">
                {text}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
