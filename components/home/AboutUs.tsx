import { Heading, Flex, Container, Stack, Text } from '@chakra-ui/react';
import AboutUsImg from 'assets/about-us.png';
import Image from 'next/image';

export default function AboutUs() {
  return (
    <Container
      maxW={'7xl'}
      backgroundColor={'green.100'}
      borderRadius='2xl'
      my={16}
      py={16}
    >
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        direction={{ base: 'column-reverse', md: 'row' }}
      >
        <Flex flex={1} justify={'center'} align={'center'}>
          <Image
            alt='zigbee hero'
            src={AboutUsImg.src}
            width='350'
            height='200'
          />
        </Flex>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            fontWeight='black'
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
            as='h2'
          >
            About Us
          </Heading>
          <Text>
            We’re designers, developers, strategists, basically coding maniacs.
            We’re funny, innovative, presumably procrastinators and mostly
            awkward dancers. Yes, we’re Zigbee OUTR, a dynamic developers and
            coding community, aimed at raising the bar of the coding culture in
            and around us. We’re here by the students and we’re here for the
            students, with our base located in the premises of the Odisha
            University of Technology and Research, Bhubaneswar.
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
}
