import { Box, Card, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import ResourceCardStyles from "./resourceCard.module.css";

interface ResourceCardProps {
  data?: any;
}

const bgColorArray = [
  "red.50",
  "orange.50",
  "green.50",
  "teal.50",
  "blue.50",
  "cyan.50",
  "purple.50",
  "pink.50",
];
const blobColorArray = [
  "red.200",
  "orange.200",
  "green.200",
  "teal.200",
  "blue.200",
  "cyan.200",
  "purple.200",
  "pink.200",
];

const ResourceCard: NextPage<ResourceCardProps> = ({ data }) => {
  return (
    <Card
      p="2"
      height="100%"
      m="auto"
      bg={bgColorArray[Math.floor(Math.random() * bgColorArray.length)]}
      className={ResourceCardStyles.card}
    >
      <div className={ResourceCardStyles.card_heading}>
        <Box
          bg={blobColorArray[Math.floor(Math.random() * bgColorArray.length)]}
          opacity={"0.3"}
          className={`${ResourceCardStyles.blob} ${ResourceCardStyles.blob1}`}
        ></Box>
        <Box
          bg={blobColorArray[Math.floor(Math.random() * bgColorArray.length)]}
          opacity={"0.3"}
          className={`${ResourceCardStyles.blob} ${ResourceCardStyles.blob2}`}
        ></Box>
        <Box
          bg={blobColorArray[Math.floor(Math.random() * bgColorArray.length)]}
          opacity={"0.3"}
          className={`${ResourceCardStyles.blob} ${ResourceCardStyles.blob3}`}
        ></Box>
        <Heading
          fontWeight={"extrabold"}
          className={ResourceCardStyles.card_heading}
        >
          {data.courseName}
        </Heading>
        <Text px="4">with</Text>
        <Text px="4" fontWeight={"black"}>
          {data.author}
        </Text>
      </div>
    </Card>
  );
};

export default ResourceCard;
