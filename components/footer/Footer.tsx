import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Link,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Logo from "components/logo/Logo";
import { IconBrandFacebook, IconBrandTwitter,IconBrandInstagram } from "@tabler/icons";

export default function Footer() {
  return (
    <Box
    bg="gray.50"
    color={"gray.700"}>
    <Container
      as={Stack}
      maxW={'6xl'}
      py={4}
      spacing={4}
      justify={'center'}
      align={'center'}>
      <Logo />
      <Stack direction={'row'} spacing={6}>
        <Link href={'#'}>Home</Link>
        <Link href={'#'}>About</Link>
        <Link href={'#'}>Blog</Link>
        <Link href={'#'}>Contact</Link>
      </Stack>
    </Container>
    <Box border="1px" borderColor='gray.100'></Box>
    <Box
      borderTopWidth={1}
      borderStyle={'solid'}
      borderColor={"gray.200"}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Text>© 2022 Zigbee Student Developer Group. All rights reserved</Text>
        <Stack direction={'row'} spacing={6}>
          <IconBrandFacebook/>
          <IconBrandTwitter/>
          <IconBrandInstagram/>
        </Stack>
      </Container>
    </Box>
  </Box>
  );
}
