import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import Title from "@/components/ui/title";
import { NextPage } from "next";
import clsx from "clsx";
import "./resourceCard.module.css";

interface ResourceCardProps {
  data: {
    courseName: string;
    author: string;
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

const ResourceCard: NextPage<ResourceCardProps> = ({ data }) => {
  return (
    <Card
      className={clsx(
        "card relative m-auto h-72 overflow-hidden p-4",
        bgColorArray[Math.floor(Math.random() * bgColorArray.length)]
      )}
    >
      {/* Blob 1 */}
      <div
        className={clsx(
          "absolute h-24 w-24 transform rounded-full opacity-30 transition-transform duration-300",
          blobColorArray[Math.floor(Math.random() * blobColorArray.length)],
          positionArr[Math.floor(Math.random() * positionArr.length)],
          "left-4"
        )}
      ></div>

      {/* Blob 2 */}
      <div
        className={clsx(
          "absolute h-24 w-24 transform rounded-full opacity-30 transition-transform duration-300",
          blobColorArray[Math.floor(Math.random() * blobColorArray.length)],
          "right-10 top-12"
        )}
      ></div>

      {/* Blob 3 */}
      <div
        className={clsx(
          "absolute h-24 w-24 transform rounded-full opacity-30 transition-transform duration-300",
          blobColorArray[Math.floor(Math.random() * blobColorArray.length)],
          "bottom-4 left-8"
        )}
      ></div>

      {/* Card Content */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Course Name */}
        <Title size="medium" className="text-lg font-extrabold text-gray-900">
          {data.courseName}
        </Title>

        {/* Author Name */}
        <div className="flex flex-col items-start">
          <Text className="text-gray-700">with</Text>
          <Text className="text-xl font-black text-gray-900">
            {data.author}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default ResourceCard;
