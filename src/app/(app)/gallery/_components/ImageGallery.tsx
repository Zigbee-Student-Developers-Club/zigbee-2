import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  { src: "/reflectionHero.webp", alt: "Image 1", description: "Beautiful reflection on a serene lake." },
  { src: "/reflectionHero.webp", alt: "Image 2", description: "Sunset over a quiet field." },
  { src: "/reflectionHero.webp", alt: "Image 3", description: "Mountain peaks under a clear sky." },
  { src: "/reflectionHero.webp", alt: "Image 4", description: "Flowing river through dense forest." },
  { src: "/reflectionHero.webp", alt: "Image 5", description: "Stunning night sky with stars." },
  { src: "/reflectionHero.webp", alt: "Image 6", description: "Calm ocean waves at sunrise." },
  { src: "/reflectionHero.webp", alt: "Image 7", description: "Snow-covered trees in winter." },
  { src: "/reflectionHero.webp", alt: "Image 8", description: "Desert dunes illuminated by sunlight." },
];

export const ImageGallery = () => {
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);
  const [modalImage, setModalImage] = useState<{
    src: string;
    alt: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    const scrollElement1 = scrollRef1.current;
    const scrollElement2 = scrollRef2.current;
    if (!scrollElement1 || !scrollElement2) return;

    const scroll = () => {
      if (scrollElement1) {
        scrollElement1.scrollLeft += 1;
        if (scrollElement1.scrollLeft >= scrollElement1.scrollWidth / 2) {
          scrollElement1.scrollLeft = 0;
        }
      }
      if (scrollElement2) {
        scrollElement2.scrollLeft -= 1;
        if (scrollElement2.scrollLeft <= 0) {
          scrollElement2.scrollLeft = scrollElement2.scrollWidth / 2;
        }
      }
    };

    const intervalId = setInterval(scroll, 50);

    return () => clearInterval(intervalId);
  }, []);

  const handleImageClick = (src: string, alt: string, description: string) => {
    setModalImage({ src, alt, description });
  };

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={scrollRef1}
        className="mb-8 flex gap-4 overflow-x-hidden rounded-lg"
        style={{ width: "200%" }}
      >
        {images.concat(images).map((image, index) => (
          <div
            key={index}
            className="shrink-0 cursor-pointer"
            onClick={() => handleImageClick(image.src, image.alt, image.description)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={300}
              height={300}
              className="rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
      <div
        ref={scrollRef2}
        className="flex gap-4 overflow-x-hidden rounded-lg"
        style={{ width: "200%" }}
      >
        {images.concat(images).map((image, index) => (
          <div
            key={index}
            className="shrink-0 cursor-pointer"
            onClick={() => handleImageClick(image.src, image.alt, image.description)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={300}
              height={300}
              className="rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
      {modalImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative p-8 bg-white rounded-lg shadow-lg"
          >
            <Image
              src={modalImage.src}
              alt={modalImage.alt}
              width={800} // Increased width for larger view
              height={800} // Increased height for larger view
              className="rounded-lg"
            />
            <p className="mt-4 text-center text-lg text-gray-700">
              {modalImage.description}
            </p>
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-900"
            >
              ✖
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
