import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils"; // Utility function for conditional classNames
import { NextPage } from "next";
import Link from "next/link";
import { Linkedin } from "lucide-react"; // Using Lucide icons

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
        <Avatar className="mb-6 h-24 w-24">
          <AvatarImage
            src={alumData?.imgURL || "https://bit.ly/broken-link"}
            alt={alumData.name}
          />
          <AvatarFallback>{alumData.name[0]}</AvatarFallback>
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
            <Linkedin size={24} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default AlumniCard;
