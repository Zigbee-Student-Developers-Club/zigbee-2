"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto my-16 max-w-[1200px]">
        <div className="flex flex-col items-center space-y-8 md:flex-row md:space-x-10 md:space-y-0">
          <div className="flex-1 space-y-5 md:space-y-10">
            <h2 className="text-3xl font-black sm:text-4xl lg:text-6xl">
              Learn . Apply . Grow
            </h2>
            <p className="text-lg text-gray-800 dark:text-gray-300">
              Yes, if you love to code, you’re family already! Come join the
              cult and open yourself to a whole new world of technological
              bliss.
            </p>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <Image
              alt="zigbee hero"
              src="/person-with-vr.png"
              width={500}
              height={200}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
