"use client";

import { motion } from "framer-motion";
import Title from "@/components/ui/title";
import InfoSection from "@/components/common/InfoSection";
import { ImageGallery } from "./_components/ImageGallery";

export default function Gallery() {
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
            imageSrc="/gallery.png"
            heading="Gallery"
            text="Step into our Alumni Meet Gallery, a visual journey capturing the vibrant moments and cherished memories shared by our university's alumni, as they come together to celebrate their journey and collective achievements."
            background="bg-yellow-100"
            darkBackground="dark:bg-teal-400"
            imageHeight={200}
            imageWidth={200}
            placedImage={false}
          />

          {/* Gallery Section */}
          <div className="container mx-auto px-10">
            <Title size="medium" className="my-16 text-center">
              Image Gallery of Our Event Tathya 2023 ✨
            </Title>

            <ImageGallery />
          </div>
        </div>
      </motion.div>
    </>
  );
}
