import { Center, Container, Heading, Stack } from "@chakra-ui/react";
import Footer from "components/footer/Footer";

export default function Department() {
  return (
    <Container maxW={"7xl"}>
      <Stack align={"center"} direction={"column"} py="2" my="2">
        <Heading as="h1" size="2xl">
          Department of
        </Heading>
        <Heading as="h1" size="2xl">
          Computer Science and Application
        </Heading>
      </Stack>
      <Footer/>
    </Container>
  );
}
