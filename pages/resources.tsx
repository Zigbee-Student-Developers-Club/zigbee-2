import {
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import Footer from "components/footer/Footer";
import Navbar from "components/navbar/Navbar";
import ResourceHeroImg from "assets/resource.png";
import ResourceCard from "components/resource/ResourceCard";

export default function resources() {
  return (
    <>
      <Navbar />
      <Container maxW={"7xl"}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          direction={{ base: "column", md: "row" }}
          backgroundColor={"teal.100"}
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
              Resource
            </Heading>
            <Text>
              They’re exemplary, they’re buoyant, they’re the high fliers,
              they’re the veterans. Here’s to help you learn more and connect
              with our respected alumni.
            </Text>
          </Stack>
          <Flex flex={1} justify={"center"} align={"center"}>
            <Image
              boxSize={{ base: "sm", md: "lg" }}
              objectFit="contain"
              width="500"
              height="200"
              alt="zigbee hero"
              src={ResourceHeroImg.src}
            />
          </Flex>
        </Stack>
        <Grid
          justifyContent={"center"}
          alignContent="center"
          gridAutoRows={"1fr"}
          templateColumns={{
            base: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
            xl: "repeat(5, 1fr)",
          }}
          gap={8}
          my={"10"}
        >
          <GridItem>
            <ResourceCard />
          </GridItem>
          <GridItem>
            <ResourceCard />
          </GridItem>
          <GridItem>
            <ResourceCard />
          </GridItem>
          <GridItem>
            <ResourceCard />
          </GridItem>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
