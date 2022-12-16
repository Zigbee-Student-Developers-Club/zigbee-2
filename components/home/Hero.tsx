import { Image, Heading, Flex, Container, Stack, Text } from "@chakra-ui/react";
import HomeHeroImg from "assets/person-with-vr.png";
// import Image from "next/image";

export default function Hero() {
  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            fontWeight="black"
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            as="h2"
          >
            Learn . Apply . Grow
          </Heading>
          <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, blanditiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, blanditiis.</Text>
        </Stack>
        <Flex flex={1} justify={"center"} align={"center"}>
          <Image alt="zigbee hero" src={HomeHeroImg.src} />
        </Flex>
      </Stack>
    </Container>
  );
}
