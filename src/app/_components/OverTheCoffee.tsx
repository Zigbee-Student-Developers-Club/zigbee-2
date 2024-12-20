import { useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function OverTheCoffee() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="mx-auto my-16 max-w-7xl rounded-2xl px-8 py-16">
          <div className="flex flex-col items-center md:flex-row">
            <div className="flex-1 space-y-6 md:gap-16 md:space-y-10">
              <h2 className="text-3xl font-black leading-tight sm:text-4xl lg:text-6xl">
                A lot can happen over coffee, right?
              </h2>
              <p className="text-gray-800 dark:text-gray-300">
                One fine winter afternoon, a clump of mates casually chilling
                over some delicious coffee, random (but mostly funny)
                discussions, and that’s how Zigbee OUTR came into being!
                Originally established as a college’s development club for the
                Department of Computer Science and Applications, we’ve had a
                very humble beginning, with the first team consisting of only
                about ten members.
              </p>
            </div>
            <div className="mt-10 flex flex-1 items-center justify-center md:mt-0">
              <Image
                alt="zigbee hero"
                src="/over-the-coffee.webp"
                width="400"
                height="200"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
