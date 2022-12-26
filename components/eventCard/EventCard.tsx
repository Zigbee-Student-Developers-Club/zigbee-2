import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Image from "next/image";

interface EventDataProps {
  data?: any;
}

const EventCard: NextPage<EventDataProps> = ({ data }) => {
  console.log(data.thumbnail);
  // console.log(data);
  return (
    <Card maxW="sm" height="100%" m="auto" background={"gray.100"}>
      <CardBody>
        <Flex justifyContent={"center"}>
          <Box overflow={"hidden"} rounded="lg">
            <Image
              src={data.thumbnail}
              alt={data.topic}
              width="300"
              height="250"
            />
          </Box>
        </Flex>
        <Stack mt="4" spacing="1">
          <Heading size="md">{data.speaker.name}</Heading>
          <Text size="12px">{data.date}</Text>
          <Text size="12px">{data.speaker.role}</Text>
          <Text size="12px">{data.speaker.company}</Text>
          <Heading size="md">{data.topic}</Heading>
        </Stack>
      </CardBody>
      <CardFooter justifyContent={"center"} p="2">
        <Button
          width={"100%"}
          colorScheme={data.expired ? "red" : "green"}
          variant="ghost"
        >
          {data.expired ? "Event Expired" : data.eventDate}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
