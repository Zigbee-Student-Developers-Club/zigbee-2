import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  { src: "https://res.cloudinary.com/dljszrwl0/image/upload/v1735222483/WhatsApp_Image_2024-12-25_at_12.35.46_cfb60055_dzhmb3.webp", alt: "Image 1", description: "On the occuasion of tech seminar with our respected alumni debasis vai " },
  { src: "https://res.cloudinary.com/dljszrwl0/image/upload/v1735223282/WhatsApp_Image_2024-12-26_at_00.33.40_a98dcde7_bhgrsq.webp", alt: "Image 4", description: "On the occasion of teacher's day 2024" },
  { src: "https://res.cloudinary.com/dljszrwl0/image/upload/v1735231099/WhatsApp_Image_2024-12-26_at_19.55.10_4377a713_c3pk9d.jpg", alt: "Image 3", description: "With respected alumini Sudhansu vai" },
  { src: "https://res.cloudinary.com/dljszrwl0/image/upload/v1735223282/WhatsApp_Image_2024-12-26_at_00.33.40_a98dcde7_bhgrsq.webp", alt: "Image 4", description: "On the occasion of teacher's day 2024" },
  { src: "https://res.cloudinary.com/dljszrwl0/image/upload/v1735224005/DSC_0409_kdn693.webp", alt: "Image 5", description: "On occasion of tathya 2023." },
  { src: "https://res.cloudinary.com/dljszrwl0/image/upload/v1735224011/DSC_0455_imkauv.webp", alt: "Image 6", description: "On occasion of tathya 2023." },
  { src: "https://res.cloudinary.com/dljszrwl0/image/upload/v1735224011/DSC_0455_imkauv.webp", alt: "Image 7", description: "On occasion of tathya 2023." },
  { src: "https://res.cloudinary.com/dljszrwl0/image/upload/v1735224056/DSC_0297_u6an1a.webp", alt: "Image 8", description: "On occasion of tathya 2022." },
  { src: "https://res.cloudinary.com/dljszrwl0/image/upload/v1735224322/2_tmoiq0.webp", alt: "Image 8", description: "On occasion of tathya 2022." },
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
            className="shrink-0 cursor-pointer h-64 w-80"
            onClick={() => handleImageClick(image.src, image.alt, image.description)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={300}
              height={300}
              className="rounded-lg object-cover w-full h-full"
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
            className="shrink-0 cursor-pointer h-64 w-80"
            onClick={() => handleImageClick(image.src, image.alt, image.description)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={300}
              height={300}
              className="rounded-lg object-cover w-full h-full"
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
              width={600} // Increased width for larger view
              height={600} // Increased height for larger view
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
