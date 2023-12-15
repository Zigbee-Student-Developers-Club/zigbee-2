import { Box, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Footer from 'components/footer/Footer';
import Navbar from 'components/navbar/Navbar';
import Image from 'next/image';
import GalleryImg from 'assets/gallery.png';

const Gallery = () => {
  return (
    <>
      <Navbar />
      <Container maxW={'7xl'}>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          direction={{ base: 'column', md: 'row' }}
          backgroundColor={'#FFFFCC'}
          borderRadius='2xl'
          py='10'
          px='14'
          mb='10'
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              fontWeight='black'
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
              as='h2'
            >
              Gallery
            </Heading>
            <Text>
              Step into our Alumni Meet Gallery, a visual journey capturing the
              vibrant moments and cherished memories shared by our
              university&apos;s alumni, as they come together to celebrate their
              journey and collective achievements.
            </Text>
          </Stack>
          <Flex flex={1} justify={'flex-end'} align={'center'}>
            <Box maxW={'240px'}>
              <Image
                width='300'
                height='200'
                style={{ width: '100%', objectFit: 'cover' }}
                alt='codewars hero'
                src={GalleryImg.src}
              />
            </Box>
          </Flex>
        </Stack>
      </Container>

      <Footer />
    </>
  );
};
export default Gallery;
