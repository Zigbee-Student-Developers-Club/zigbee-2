"use client";

import Image from "next/image";
import MotionDivProvider from "@/components/provider/MotionDivProvider";

const Hero = () => {
  return (
    <MotionDivProvider>
      <div className="flex flex-col items-center space-y-8 md:flex-row md:space-x-1 md:py-14  ">
        <div className="flex-1 space-y-5 text-center md:space-y-10">
          <h2 className="text-3xl font-black sm:text-4xl lg:text-6xl">
            Learn . Apply . Grow
          </h2>
          <p className="text-lg text-gray-800 dark:text-gray-300">
            Yes, if you love to code, you’re family already! Come join the cult
            and open yourself to a whole new world of technological bliss.
          </p>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Image
            alt="zigbee hero"
            src="/person-with-vr.webp"
            width={400}
            height={200}
            className="object-cover"
          />
        </div>
      </div>
    </MotionDivProvider>
  );
};

export default Hero;
