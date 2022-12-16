import { Image, Heading, Flex, Container, Stack, Text } from "@chakra-ui/react";
import Img from "assets/dashboard.png";


export default function Section3() {
  return (
    <Container maxW={"7xl"} backgroundColor={"purple.100"} borderRadius="2xl" my="4" py="4">
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
        
      </Stack>
    </Container>
  )
}