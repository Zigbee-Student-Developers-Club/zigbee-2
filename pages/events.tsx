import {
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import EventCard from "components/eventCard/EventCard";
import Footer from "components/footer/Footer";
import EventHeroImg from "assets/event-img.png";
import Navbar from "components/navbar/Navbar";
import Salesforce from "assets/salesforce.png";
import Game from "assets/game.png";
import Image from "next/image";

const eventsData = [
  {
    id: 1,
    date: "28th Nov 2022",
    speaker: {
      role: "Tech Lead",
      name: "Debasis Jena",
      company: "Dubai Multi Commodities Center",
    },
    topic: "Cloud Application Development with Salesforce Platform",
    expired: true,
    thumbnail: Salesforce.src,
    eventDate: "",
  },
  {
    id: 2,
    date: "28th Nov 2022",
    speaker: {
      role: "Lead game engineer",
      name: "John Doe",
      company: "Krafton Co.",
    },
    topic: "Game Development with Unity 3D",
    expired: false,
    thumbnail: Game.src,
    eventDate: "31 December 2022",
  },
  {
    id: 1,
    date: "28th Nov 2022",
    speaker: {
      role: "Tech Lead",
      name: "Debasis Jena",
      company: "Dubai Multi Commodities Center",
    },
    topic: "Cloud Application Development with Salesforce Platform",
    expired: true,
    thumbnail: Salesforce.src,
    eventDate: "",
  },
  {
    id: 2,
    date: "28th Nov 2022",
    speaker: {
      role: "Lead game engineer",
      name: "John Doe",
      company: "Krafton Co.",
    },
    topic: "Game Development with Unity 3D",
    expired: false,
    thumbnail: Game.src,
    eventDate: "31 December 2022",
  },
  {
    id: 2,
    date: "28th Nov 2022",
    speaker: {
      role: "Lead game engineer",
      name: "John Doe",
      company: "Krafton Co.",
    },
    topic: "Game Development with Unity 3D",
    expired: false,
    thumbnail: Game.src,
    eventDate: "31 December 2022",
  },
  {
    id: 1,
    date: "28th Nov 2022",
    speaker: {
      role: "Tech Lead",
      name: "Debasis Jena",
      company: "Dubai Multi Commodities Center",
    },
    topic: "Cloud Application Development with Salesforce Platform",
    expired: true,
    thumbnail: Salesforce.src,
    eventDate: "",
  },
  {
    id: 2,
    date: "28th Nov 2022",
    speaker: {
      role: "Lead game engineer",
      name: "John Doe",
      company: "Krafton Co.",
    },
    topic: "Game Development with Unity 3D",
    expired: false,
    thumbnail: Game.src,
    eventDate: "31 December 2022",
  },
];

export default function Events() {
  return (
    <>
      <Navbar />
      <Container maxW={"7xl"}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          direction={{ base: "column", md: "row" }}
          backgroundColor={"purple.100"}
          borderRadius="2xl"
          py="4"
          px="14"
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              fontWeight="black"
              fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
              as="h2"
            >
              Events
            </Heading>
            <Text>
            Yes, we’ve been really busy and happening lately. Or maybe it’s just that we love making it to the headlines time and again. Nevertheless, here’s to take you on a quick tour on all our ventures in the recent past.
            </Text>
          </Stack>
          <Flex flex={1} justify={"center"} align={"center"}>
            <Image
              height="200"
              width="500"
              alt="zigbee hero"
              src={EventHeroImg}
            />
          </Flex>
        </Stack>

        <Grid
          justifyContent={"center"}
          alignContent="center"
          gridAutoRows={"1fr"}
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          gap={8}
          my={"10"}
        >
          {eventsData.map((data: any, i) => (
            <GridItem key={i} justifyContent={"center"} alignContent="center">
              <EventCard data={data} />
            </GridItem>
          ))}
        </Grid>

        <Footer />
      </Container>
    </>
  );
}
