"use client";

import Title from "@/components/ui/title";
import InfoSection from "@/components/common/InfoSection";
import { ImageGallery } from "./_components/ImageGallery";
import MotionDivProvider from "@/components/provider/MotionDivProvider";

export default function Gallery() {
  return (
    <MotionDivProvider>
      <div className="relative py-10">
        {/* Info Section */}
        <InfoSection
          imageSrc="/gallery.webp"
          heading="Gallery"
          text="Step into our Alumni Meet Gallery, a visual journey capturing the vibrant moments and cherished memories shared by our university's alumni, as they come together to celebrate their journey and collective achievements."
          background="bg-yellow-100"
          darkBackground="dark:bg-teal-400"
          imageHeight={200}
          imageWidth={200}
          placedImage={false}
        />

        {/* Gallery Section */}
        <div className="container mx-auto">
          <Title size="medium" className="my-16 text-center">
            Image Gallery of Our Event Tathya 2023 ✨
          </Title>

          <ImageGallery />
        </div>
      </div>
    </MotionDivProvider>
  );
}
