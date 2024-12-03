"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Linkedin} from "lucide-react";

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
  <Card className="p-4 shadow-md rounded-lg flex flex-col items-center text-center bg-white hover:shadow-xl">
    <Avatar className="h-24 w-24 mb-4 rounded-full">
      <AvatarImage
        src={image || "/default-avatar.png"}
        alt="User Avatar"
        height={200}
        width={200}
        className="rounded-full border-4 border-white"
      />
      <AvatarFallback className="w-24 h-24 bg-gray-100 text-gray-700 text-2xl flex items-center justify-center rounded-full border-4 border-white">
        {name ? name[0] : "P"}
      </AvatarFallback>
    </Avatar>
    <h3 className="text-xl font-semibold mt-4">{name}</h3>
    <p className="text-sm text-gray-600 mt-2">{expertise}</p>
    <a
      href={linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 text-blue-500 hover:underline flex items-center"
    >
      <Linkedin className="mr-2" />
      LinkedIn Profile
    </a>
  </Card>
</motion.div>

  );
}
