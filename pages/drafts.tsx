import { Container, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Footer from 'components/footer/Footer';
import Navbar from 'components/navbar/Navbar';
import Image from 'next/image';
import AlumniHeroImg from 'assets/alumni-img.png';

const drafts = () => {
  return (
    <>
      <Navbar />
      <Container maxW={'7xl'}>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          direction={{ base: 'column', md: 'row' }}
          backgroundColor={'blue.100'}
          borderRadius='2xl'
          py='4'
          px='14'
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              fontWeight='black'
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
              as='h2'
            >
              Drafts
            </Heading>
            <Text>
              They’re exemplary, they’re buoyant, they’re the high fliers,
              they’re the veterans. Here’s to help you learn more and connect
              with our respected alumni.
            </Text>
          </Stack>
          <Flex flex={1} justify={'center'} align={'center'}>
            <Image
              // boxSize={{ base: "sm", md: "lg" }}
              // objectFit="contain"
              width='500'
              height='200'
              alt='zigbee hero'
              src={AlumniHeroImg}
            />
          </Flex>
        </Stack>
        {/* magazine */}

        {/* blogs */}
      </Container>
      <Footer />
    </>
  );
};
export default drafts;