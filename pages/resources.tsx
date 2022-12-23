import {
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import Footer from "components/footer/Footer";
import Navbar from "components/navbar/Navbar";
import ResourceHeroImg from "assets/resource.png";
import ResourceCard from "components/resource/ResourceCard";
import { useState } from "react";
import Link from "next/link";
import { ResourceData } from "../components/resource/resourceData";

export default function Resources() {
  const [resourceOption, setResourceOption] = useState("all");

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
            Android App Development, Frontend, Backend Development, Designing, Networking, Full Stack, anything. Whatever is the colour of that feather on your hat, we&apos;ve got you covered. Choose your domain, and jump directly to the best resources available out there to help you upskill and sharpen your swords.
            </Text>
          </Stack>
          <Flex flex={1} justify={"center"} align={"center"}>
            <Image
              boxSize={{ base: "sm", md: "sm" }}
              objectFit="contain"
              width="500"
              height="200"
              alt="zigbee hero"
              src={ResourceHeroImg.src}
            />
          </Flex>
        </Stack>

        <Center>
          <Stack
            direction={{ base: "column", md: "row" }}
            py="4"
            align={"center"}
          >
            <Text whiteSpace={"nowrap"}>Choose your domain:</Text>

            <Select
              variant="filled"
              my="4"
              onChange={(e) => setResourceOption(e.target.value)}
              width={"100%"}
            >
              <option value="all">All Resources</option>
              <option value="androidDev">Android App Development</option>
              <option value="backendDev">Backend Development</option>
              <option value="designing">Designing</option>
              <option value="frontendDev">Frontend Development</option>
              <option value="networking">Networking</option>
            </Select>
          </Stack>
        </Center>

        <Grid
          justifyContent={"center"}
          alignContent="center"
          gridAutoRows={"1fr"}
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          gap={8}
          my={"10"}
        >
          {resourceOption === "all"
            ? ResourceData.map((item, index) => (
                <GridItem key={index}>
                  <Link href={item.url} target="_blank">
                    <ResourceCard data={item} />
                  </Link>
                </GridItem>
              ))
            : ResourceData
                .filter((course) => resourceOption === course.domain)
                .map((item, index) => (
                  <GridItem key={index}>
                    <Link href={item.url}>
                      <ResourceCard data={item} />
                    </Link>
                  </GridItem>
                ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
