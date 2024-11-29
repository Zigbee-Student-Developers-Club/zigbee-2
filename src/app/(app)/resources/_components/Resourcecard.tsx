import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import Title from "@/components/ui/title";
import { NextPage } from "next";
import clsx from "clsx";
import "./resourceCard.module.css"

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
        "relative p-4 h-72 m-auto overflow-hidden card",
        bgColorArray[Math.floor(Math.random() * bgColorArray.length)]
      )}
    >
      {/* Blob 1 */}
      <div
        className={clsx(
          "absolute h-24 w-24 rounded-full opacity-30 transition-transform duration-300 transform ",
          blobColorArray[Math.floor(Math.random() * blobColorArray.length)],
          positionArr[Math.floor(Math.random() * positionArr.length)],
          "left-4"
        )}
      ></div>

      {/* Blob 2 */}
      <div
        className={clsx(
          "absolute h-24 w-24 rounded-full opacity-30 transition-transform duration-300 transform ",
          blobColorArray[Math.floor(Math.random() * blobColorArray.length)],
          "top-12 right-10"
        )}
      ></div>

      {/* Blob 3 */}
      <div
        className={clsx(
          "absolute h-24 w-24 rounded-full opacity-30 transition-transform duration-300 transform ",
          blobColorArray[Math.floor(Math.random() * blobColorArray.length)],
          "bottom-4 left-8"
        )}
      ></div>

      {/* Card Content */}
      <div className="relative z-10">
        <Title size="medium"
          className="font-extrabold  text-lg text-gray-900  mb-2"
        >
          {data.courseName}
        </Title>
        <Text className="text-gray-700 px-2">with</Text>
        <Text className="font-black text-xl text-gray-900  px-2">
          {data.author}
        </Text>
      </div>
    </Card>
  );
};

export default ResourceCard;
