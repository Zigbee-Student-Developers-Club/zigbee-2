import { Box, Center, Container, Heading, Image, Stack, Text } from "@chakra-ui/react";
import Footer from "components/footer/Footer";
import PageNotFoundImg from "assets/page-not-found.png"

export default function Error404() {
  return (
    <Box height="100vh">
      <Stack align={"center"}
        spacing={"2"} direction="column">
        <Heading as="h2" size={"2xl"}>Congratulations!!!</Heading>
        <Text>You have discovered a secret page, which is for now is not supposed to be public.</Text>
        <Text>May be you can redirect to home page to look for what you are looking for.</Text>
        <Text>Keep Exploring!!!</Text>
        <Image alt="Person looking from bushes" src={PageNotFoundImg.src}  boxSize="md"
            objectFit="contain"/>
      </Stack>
      <Box width={"100%"} position="absolute" bottom="0">
        <Footer />
      </Box>
    </Box>
  );
}
