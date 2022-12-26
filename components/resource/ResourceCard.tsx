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

const positionArr = ["1", "1.5", "2", "2.5", "3", "3.5"];

const ResourceCard: NextPage<ResourceCardProps> = ({ data }) => {
  return (
    <Card
      p="2"
      height="100%"
      m="auto"
      bg={bgColorArray[Math.floor(Math.random() * bgColorArray.length)]}
      className={ResourceCardStyles.card}
    >
      <Box className={ResourceCardStyles.card_heading} height="100%">
        <Box
          bg={blobColorArray[Math.floor(Math.random() * bgColorArray.length)]}
          opacity={"0.3"}
          className={`${ResourceCardStyles.blob} ${ResourceCardStyles.blob1}`}
          left={positionArr[Math.floor(Math.random() * positionArr.length)]}
          borderTopRightRadius={Math.random() * 100/Math.random() * 100}
          borderTopLeftRadius={Math.random() * 100/Math.random() * 100}
          borderBottomRightRadius={Math.random() * 100/Math.random() * 100}
          borderBottomLeftRadius={Math.random() * 100/Math.random() * 100}
        ></Box>
        <Box
          bg={blobColorArray[Math.floor(Math.random() * bgColorArray.length)]}
          opacity={"0.3"}
          className={`${ResourceCardStyles.blob} ${ResourceCardStyles.blob2}`}
          left="40%"
          bottom={"10"}
          borderTopRightRadius={Math.random() * 100/Math.random() * 100}
          borderTopLeftRadius={Math.random() * 100/Math.random() * 100}
          borderBottomRightRadius={Math.random() * 100/Math.random() * 100}
          borderBottomLeftRadius={Math.random() * 100/Math.random() * 100}
        ></Box>
        <Box
          bg={blobColorArray[Math.floor(Math.random() * bgColorArray.length)]}
          opacity={"0.3"}
          className={`${ResourceCardStyles.blob} ${ResourceCardStyles.blob3}`}
          right={positionArr[Math.floor(Math.random() * positionArr.length)]}
          borderTopRightRadius={Math.random() * 100/Math.random() * 100}
          borderTopLeftRadius={Math.random() * 100/Math.random() * 100}
          borderBottomRightRadius={Math.random() * 100/Math.random() * 100}
          borderBottomLeftRadius={Math.random() * 100/Math.random() * 100}
        ></Box>
        <Heading
          fontWeight={"extrabold"}
          className={ResourceCardStyles.card_heading}
        >
          {data.courseName}
        </Heading>
        <Text px="4">with</Text>
        <Text px="4" fontWeight={"black"} fontSize="xl">
          {data.author}
        </Text>
      </Box>
    </Card>
  );
};

export default ResourceCard;
