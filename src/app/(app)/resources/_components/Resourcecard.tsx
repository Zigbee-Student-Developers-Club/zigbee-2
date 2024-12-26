import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import Title from "@/components/ui/title";
import { NextPage } from "next";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";

interface ResourceCardProps {
  data: {
    courseName: string;
    author: string;
    badge?: string; // Optional badge field
  };
}

// Tailwind classes for colors
const bgColorArray = [
  "bg-red-50",
  "bg-orange-50",
  "bg-green-50",
  "bg-teal-50",
  "bg-blue-50",
  "bg-cyan-50",
  "bg-purple-50",
  "bg-pink-50",
];
const blobColorArray = [
  "bg-red-200",
  "bg-orange-200",
  "bg-green-200",
  "bg-teal-200",
  "bg-blue-200",
  "bg-cyan-200",
  "bg-purple-200",
  "bg-pink-200",
];
const positionArr = ["top-2", "top-4", "top-6", "top-8", "top-10", "top-12"];
const sizeArr = ["h-16 w-16", "h-20 w-20", "h-24 w-24", "h-28 w-28"];

const ResourceCard: NextPage<ResourceCardProps> = ({ data }) => {
  return (
    <Card
      className={clsx(
        "card group relative m-auto h-72 overflow-hidden p-4 transition-transform duration-300",
        bgColorArray[Math.floor(Math.random() * bgColorArray.length)],
        "hover:scale-105"
      )}
    >
      {/* Blob 1 */}
      <div
        className={clsx(
          "absolute transform rounded-full opacity-30 transition-all duration-300 group-hover:rotate-45 group-hover:scale-125",
          blobColorArray[Math.floor(Math.random() * blobColorArray.length)],
          positionArr[Math.floor(Math.random() * positionArr.length)],
          sizeArr[Math.floor(Math.random() * sizeArr.length)],
          "left-4"
        )}
      ></div>

      {/* Blob 2 */}
      <div
        className={clsx(
          "absolute transform rounded-full opacity-30 transition-all duration-300 group-hover:rotate-45 group-hover:scale-125",
          blobColorArray[Math.floor(Math.random() * blobColorArray.length)],
          "right-10 top-12",
          sizeArr[Math.floor(Math.random() * sizeArr.length)]
        )}
      ></div>

      {/* Blob 3 */}
      <div
        className={clsx(
          "absolute transform rounded-full opacity-30 transition-all duration-300 group-hover:rotate-45 group-hover:scale-125",
          blobColorArray[Math.floor(Math.random() * blobColorArray.length)],
          "bottom-4 left-8",
          sizeArr[Math.floor(Math.random() * sizeArr.length)]
        )}
      ></div>

      {/* Card Content */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Title at top */}
        <Title
          size="medium"
          className="mb-2 text-xl font-extrabold text-gray-900"
        >
          {data.courseName}
        </Title>

        <div className="mt-auto">
          <Text className="px-2 text-gray-700">with</Text>
          <Text className="px-2 text-xl font-black text-gray-900">
            {data.author} <br />
            {data?.badge && (
              <Badge
                variant="outline"
                className="break-words text-sm font-bold text-blue-900"
              >
                {data?.badge}
              </Badge>
            )}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default ResourceCard;
