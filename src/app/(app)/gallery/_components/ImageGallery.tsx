import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ImageModal } from "./ImageModal";

const images = [
  { src: "/reflectionHero.webp", alt: "Image 1" },
  { src: "/reflectionHero.webp", alt: "Image 2" },
  { src: "/reflectionHero.webp", alt: "Image 3" },
  { src: "/reflectionHero.webp", alt: "Image 4" },
  { src: "/reflectionHero.webp", alt: "Image 5" },
  { src: "/reflectionHero.webp", alt: "Image 6" },
  { src: "/reflectionHero.webp", alt: "Image 7" },
  { src: "/reflectionHero.webp", alt: "Image 8" },
];

export const ImageGallery = () => {
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);
  const [modalImage, setModalImage] = useState<{
    src: string;
    alt: string;
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

  const handleImageClick = (src: string, alt: string) => {
    setModalImage({ src, alt });
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
            onClick={() => handleImageClick(image.src, image.alt)}
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
            onClick={() => handleImageClick(image.src, image.alt)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={300}
              height={200}
              className="rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
      {modalImage && (
        <ImageModal
          isOpen={!!modalImage}
          onClose={() => setModalImage(null)}
          src={modalImage?.src ?? ""}
          alt={modalImage?.alt ?? ""}
        />
      )}
    </div>
  );
};
