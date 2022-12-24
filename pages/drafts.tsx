import {
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Footer from "components/footer/Footer";
import Navbar from "components/navbar/Navbar";
import DraftsHeroImg from "assets/drafts-hero.png";
import ReflectionBanner from "assets/magazine/reflectionHero.png";
import MagazineCard from "components/magazineCard/MagazineCard";
import Link from "next/link";

const magazineData = [
  {
    imgSrc: ReflectionBanner,
    magazineURL:
      "https://drive.google.com/file/d/1d4atWmN2TvQE-c5aexGquTB3_Nbh_Rzk/view?usp=share_link",
  },
];

const drafts = () => {
  return (
    <>
      <Navbar />
      <Container maxW={"7xl"}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          direction={{ base: "column", md: "row" }}
          backgroundColor={"blue.100"}
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
              Drafts
            </Heading>
            <Text>
              They’re exemplary, they’re buoyant, they’re the high fliers,
              they’re the veterans. Here’s to help you learn more and connect
              with our respected alumni.
            </Text>
          </Stack>
          <Flex flex={1} justify={"center"} align={"center"}>
            <Image
              boxSize={{ base: "sm", md: "sm" }}
              objectFit="contain"
              width="500"
              height="200"
              alt="zigbee hero"
              src={DraftsHeroImg.src}
            />
          </Flex>
        </Stack>
        {/* magazine */}

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
          {magazineData.map((data: any, i) => (
            <GridItem key={i} justifyContent={"center"} alignContent="center">
              <Link href={data.magazineURL} target="_blank">
                <MagazineCard data={data} />
              </Link>
            </GridItem>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};
export default drafts;
