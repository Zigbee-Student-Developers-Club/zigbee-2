import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";

interface EventDataProps {
  data?: any;
}

const EventCard: NextPage<EventDataProps> = ({ data }) => {
  // console.log(data);
  return (
    <Card maxW="sm" height="100%" m="auto" background={"gray.100"}>
      <CardBody>
        <Image
          src={data.thumbnail}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
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
