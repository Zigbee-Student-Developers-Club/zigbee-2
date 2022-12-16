import { Image, Heading, Flex, Container, Stack, Text } from "@chakra-ui/react";
import Img from "assets/dashboard.png";

export default function Section1() {
  return (
    <Container
      maxW={"7xl"}
      backgroundColor={"green.100"}
      borderRadius="2xl"
      my="4"
      py="4"
    >
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        direction={{ base: "column-reverse", md: "row" }}
      >
        <Flex flex={1} justify={"center"} align={"center"}>
          <Image
            boxSize={{ base: "xs", md: "md" }}
            objectFit="contain"
            alt="zigbee hero"
            src={Img.src}
          />
        </Flex>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            fontWeight="black"
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            as="h2"
          >
            Learn . Apply . Grow
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
            blanditiis. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Facere, blanditiis.
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
}
