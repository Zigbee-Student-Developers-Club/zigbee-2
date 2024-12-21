import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils"; // Utility function for conditional classNames
import { NextPage } from "next";
import Link from "next/link";
import {
  Linkedin,
} from "react-bootstrap-icons";

interface AlumDataProp {
  alumData: {
    name: string;
    imgURL?: string | undefined;
    linkedinURL?: string | undefined;
    position?: string;
  };
}

const Alum: NextPage<AlumDataProp> = ({ alumData }) => {
  return (
    <div className="p-6 bg-cyan-200 dark:bg-slate-800 rounded-lg h-full capitalize text-center shadow-md">
      <div className="flex flex-col items-center h-full ">
        {/* Avatar */}
        <Avatar className="mb-4 mt-8 h-32 w-32 overflow-hidden rounded-full">
            <AvatarImage
              src={alumData.imgURL}
              alt="User Avatar"
              className="h-full w-full object-cover object-center"
            />
            <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-2xl text-gray-700">
              {alumData.name ? alumData.name[0] : "P"}
            </AvatarFallback>
          </Avatar>

        {/* Name and Badge */}
        <h3 className="text-sm font-semibold">
          {alumData.name.toLowerCase()}
          {["PC", "CR", "GR"].includes(alumData.position || "") && (
            <Badge
              className={cn(
                "ml-2",
                alumData.position === "PC" && "bg-purple-200 text-purple-600",
                alumData.position === "CR" && "bg-red-200 text-red-600",
                alumData.position === "GR" && "bg-blue-200 text-blue-600"
              )}
            >
              {alumData.position}
            </Badge>
          )}
        </h3>

        {/* LinkedIn Link */}
        {alumData?.linkedinURL && (
          <Link
            href={alumData.linkedinURL}
            target="_blank"
            rel="noopener noreferrer"
            className="my-4 text-blue-600 hover:text-blue-800"
          >
            <Linkedin size={20} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Alum;
