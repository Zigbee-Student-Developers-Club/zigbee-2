"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Title from "@/components/ui/title";
import { Text } from "@/components/ui/text";

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
        <Card className="flex flex-col items-center bg-white px-2 py-4 dark:bg-slate-900">
          <Avatar className="mb-4 mt-8 h-36 w-36 overflow-hidden rounded-full">
            <AvatarImage
              src={profileImage}
              alt="User Avatar"
              className="h-full w-full object-cover object-center"
            />
            <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-2xl text-gray-700">
              {name ? name[0] : "P"}
            </AvatarFallback>
          </Avatar>
          <Title size="small" className="mt-4 text-xl font-semibold capitalize">{name.split(" ")[0]}</Title>
          <Text variant="small" className="text-gray-600 dark:text-gray-300">Batch : {batch}</Text>
        </Card>
      </a>
    </motion.div>
  );
}
