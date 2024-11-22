import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { NextPage } from "next";
import clsx from "clsx";

interface ResourceCardProps {
  data?: any;
}

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
const positionArr = ["1", "1.5", "2", "2.5", "3", "3.5"];

const getRandom = (array: string[]) => array[Math.floor(Math.random() * array.length)];
const getRandomRadius = () => Math.floor(Math.random() * 89) + 10;

const ResourceCard: NextPage<ResourceCardProps> = ({ data }) => {
  return (
    <Card className={clsx("p-4 h-full mx-auto", getRandom(bgColorArray))}>
      <div className="relative h-full">
        {/* Blobs */}
        <div
          className={clsx(
            "absolute rounded-full opacity-30 blur-md",
            getRandom(blobColorArray),
            "w-24 h-24"
          )}
          style={{
            top: `${getRandom(positionArr)}rem`,
            left: `${getRandom(positionArr)}rem`,
            borderRadius: `${getRandomRadius()}%`,
          }}
        ></div>
        <div
          className={clsx(
            "absolute rounded-full opacity-30 blur-md",
            getRandom(blobColorArray),
            "w-24 h-24"
          )}
          style={{
            top: "10%",
            left: "40%",
            borderRadius: `${getRandomRadius()}%`,
          }}
        ></div>
        <div
          className={clsx(
            "absolute rounded-full opacity-30 blur-md",
            getRandom(blobColorArray),
            "w-24 h-24"
          )}
          style={{
            bottom: `${getRandom(positionArr)}rem`,
            right: `${getRandom(positionArr)}rem`,
            borderRadius: `${getRandomRadius()}%`,
          }}
        ></div>

        {/* Card Content */}
        <CardHeader>
          <h3 className="font-extrabold text-xl">{data.courseName}</h3>
        </CardHeader>
        <CardContent>
          <p className="px-4 text-gray-600">with</p>
          <p className="px-4 font-black text-lg">{data.author}</p>
        </CardContent>
      </div>
    </Card>
  );
};

export default ResourceCard;
