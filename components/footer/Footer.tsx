import { Box, Center, Container, Divider, Flex, Link, Spacer, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Footer() {
  return (
    <Container py="8" bg='gray.100' borderRadius="2xl" maxW={"7xl"}>
      <Center>LOGO</Center>
      <Stack
        flex={1}
        align={"center"}
        justify={"center"}
        spacing={{ base: 2, md: 10 }}
        direction={{ base: "column", md: "row" }}
      >
        <Link as={NextLink} href="/home">
          Home
        </Link>
        <Link as={NextLink} href="/home">
          Department
        </Link>
        <Link as={NextLink} href="/home">
          Alumni
        </Link>
      </Stack>
      <Flex wrap={"wrap"}>
        <Text>© 2022 Zigbee Student Developer Group. All rights reserved</Text>
        <Spacer/>
        <Box>
            Social links
        </Box>
      </Flex>
    </Container>
  );
}
