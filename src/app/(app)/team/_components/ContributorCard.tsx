"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Linkedin } from "lucide-react";

interface ContributorProps {
  name: string;
  expertise: string;
  image: string;
  linkedin: string;
}

export default function ContributorCard({
  name,
  expertise,
  image,
  linkedin,
}: ContributorProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)" }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer"
    >
      <Card className="flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-md hover:shadow-xl">
        <Avatar className="mb-4 h-24 w-24 rounded-full">
          <AvatarImage
            src={image || "/default-avatar.png"}
            alt="User Avatar"
            height={200}
            width={200}
            className="rounded-full border-4 border-white"
          />
          <AvatarFallback className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gray-100 text-2xl text-gray-700">
            {name ? name[0] : "P"}
          </AvatarFallback>
        </Avatar>
        <h3 className="mt-4 text-xl font-semibold">{name}</h3>
        <p className="mt-2 text-sm text-gray-600">{expertise}</p>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center text-blue-500 hover:underline"
        >
          <Linkedin className="mr-2" />
          LinkedIn Profile
        </a>
      </Card>
    </motion.div>
  );
}
