import { Box, Container, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import Logo from "components/logo/Logo";
import {
  Instagram,
  Telegram,
  Linkedin,
  Youtube,
  Facebook,
  Twitter,
} from "react-bootstrap-icons";

export default function Footer() {
  return (
    <Box bg="gray.100" color={"gray.700"} rounded="xl">
      <Container
        as={Stack}
        maxW={"7xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Logo />
        <Stack direction={"row"} spacing={6}>
          <Link href="/department">Department</Link>
          <Link href="/alumni">Alumni</Link>
          <Link href="/events">Events</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/drafts">Drafts</Link>
        </Stack>
      </Container>
      <Box>
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>
            © 2022 Zigbee Student Developers&apos; Club. All rights reserved
          </Text>
          <Stack direction={"row"} spacing={6}>
            <Link href="https://www.instagram.com/zigbee.cetb/" target="_blank">
              <Instagram size={"20"} />
            </Link>
            <Link href="https://t.me/joinchat/wgUy8eMWplM2MGQ1" target="_blank">
              <Telegram size={"20"} />
            </Link>
            <Link
              href="https://www.linkedin.com/company/zigbeecetb/"
              target="_blank"
            >
              <Linkedin size={"20"} />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCD7i_7Mh1M1mPViCZIyQAJA"
              target="_blank"
            >
              <Youtube size={"20"} />
            </Link>
            <Link href="https://www.facebook.com/zigbee.cetb" target="_blank">
              <Facebook size={"20"} />
            </Link>
            <Link href="https://twitter.com/zigbeecetb" target="_blank">
              <Twitter size={"20"} />
            </Link>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
