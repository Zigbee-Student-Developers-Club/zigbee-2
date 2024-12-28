import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { NextPage } from "next";
import Link from "next/link";
import { Linkedin } from "react-bootstrap-icons";

interface AlumDataProp {
  alumData: {
    name: string;
    imgURL?: string | undefined;
    linkedinURL?: string | undefined;
    position?: string;
  };
}

const AlumniCard: NextPage<AlumDataProp> = ({ alumData }) => {
  return (
    <div className="h-full rounded-lg bg-cyan-200 p-6 text-center capitalize shadow-md">
      <div className="flex h-full flex-col items-center">
        {/* Avatar */}
        <Avatar className="my-4 h-28 w-28 overflow-hidden rounded-full sm:h-36 sm:w-36">
          <AvatarImage
            src={alumData?.imgURL}
            alt={alumData.name}
            className="h-full w-full object-cover object-center"
          />
          <AvatarFallback className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-gray-100 text-2xl text-gray-700">
            {alumData.name.toUpperCase().split(" ")[0]}
          </AvatarFallback>
        </Avatar>
        {/* Name and Badge */}{" "}
        <Text variant="small" className="font-semibold">
          {alumData.name.toLowerCase()}{" "}
          {["PC", "CR", "GR", "PV"].includes(
            alumData.position?.toUpperCase() || ""
          ) && (
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
        </Text>
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

export default AlumniCard;
