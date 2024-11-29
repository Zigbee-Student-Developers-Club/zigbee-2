"use client";

import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    title: "What is Zigbee?",
    content: `Zigbee is a student run community run by OUTR MCA Students that focuses fundamentally on software development. Zigbee CETB subsists on the belief that everyone can create & innovate.`,
  },
  {
    title: "How can I join Zigbee?",
    content: `Anyone who loves to collaborate and build something amazing can join Zigbee.`,
  },
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleToggle = (value: string) => {
    setOpenItem(openItem === value ? null : value);
  };

  return (
    <div className="my-16 py-4 max-w-3xl mx-auto">
      <h2 className="text-center font-extrabold text-3xl sm:text-4xl lg:text-6xl">
        FAQs
      </h2>
      <Accordion type="single" collapsible className="mt-8 space-y-4">
        {faqs.map((faq, index) => {
          const value = `item-${index}`;
          const isOpen = openItem === value;

          return (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger onClick={() => handleToggle(value)}>
                {faq.title}
              </AccordionTrigger>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 text-gray-800 dark:text-gray-300">
                      {faq.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
