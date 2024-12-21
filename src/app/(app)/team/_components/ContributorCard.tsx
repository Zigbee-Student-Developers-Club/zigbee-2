"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

interface ContributorProps {
  name: string;
  batch: string;
  profileImage: string;
  linkedinURL: string;
}

export default function ContributorCard({
  name,
  batch,
  profileImage,
  linkedinURL,
}: ContributorProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)" }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer rounded-lg text-center shadow-md hover:shadow-xl"
    >
      <a href={linkedinURL} target="_blank" rel="noopener noreferrer">
        <Card className="flex flex-col items-center bg-white px-2 py-4">
          <Avatar className="mb-4 mt-8 rounded-full">
            <AvatarImage
              src={profileImage}
              alt="User Avatar"
              height={150}
              width={150}
              className="h-[150px] w-[150px] rounded-full border-4 border-white"
            />
            <AvatarFallback className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-white bg-gray-100 text-2xl text-gray-700">
              {name ? name[0].toUpperCase() : "P"}
            </AvatarFallback>
          </Avatar>
          <h3 className="mt-4 text-xl font-semibold">{name}</h3>
          <p className="mt-2 text-sm text-gray-600">Batch : {batch}</p>
        </Card>
      </a>
    </motion.div>
  );
}
