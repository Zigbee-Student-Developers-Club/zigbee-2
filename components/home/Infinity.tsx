import { Image, Heading, Flex, Container, Stack, Text } from "@chakra-ui/react";
import InfinityImg from "assets/infinity.png";

export default function Infinity() {
  return (
    <Container
      maxW={"7xl"}
      backgroundColor={"purple.100"}
      borderRadius="2xl"
      my="4"
      py="4"
    >
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        direction={{ base: "column", md: "row" }}
      >
        <Flex flex={1} justify={"center"} align={"center"}>
          <Image
            boxSize={{ base: "xs", md: "md" }}
            objectFit="contain"
            alt="zigbee hero"
            src={InfinityImg.src}
          />
        </Flex>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            fontWeight="black"
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            as="h2"
          >
            To Infinity and Beyond!
          </Heading>
          <Text>
            There was just one goal, one motto and one vision in the minds of
            the founding team, and that was to converge and propel all those
            brilliantly sharp, witty and creative minds, who, at some point of
            time went adrift in this vast technological desert, into one big
            family. Today Zigbee is heading goalwards with full throttle towards
            the zenith. Yes, we will only continue to grow in this endeavor to
            assist and promote students to explore and witness new horizons and
            make them realize their full potential in the field of development
            and open-source contribution.
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
}
