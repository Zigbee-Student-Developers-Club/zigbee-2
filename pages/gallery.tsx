import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import Footer from 'components/footer/Footer';
import Navbar from 'components/navbar/Navbar';
import Image from 'next/image';
import GalleryImg from 'assets/gallery.png';
import { motion } from 'framer-motion';

import gallery1 from '/assets/gallery/1.jpg';
import gallery2 from '/assets/gallery/2.jpg';
import gallery3 from '/assets/gallery/3.jpg';
import gallery4 from '/assets/gallery/4.jpg';

const galleryImages = [gallery1, gallery2, gallery3, gallery4];

const Gallery = () => {
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Container maxW={'7xl'}>
          <Stack
            align={'center'}
            spacing={{ base: 8, md: 10 }}
            direction={{ base: 'column', md: 'row' }}
            backgroundColor={'#FFFFCC'}
            borderRadius='2xl'
            py='4'
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
                Step into our Alumni Meet Gallery, a visual journey capturing
                the vibrant moments and cherished memories shared by our
                university&apos;s alumni, as they come together to celebrate
                their journey and collective achievements.
              </Text>
            </Stack>
            <Flex flex={1} justify={'center'} align={'center'}>
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

          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
              xl: 'repeat(4, 1fr)',
            }}
            gap={4}
            my={8}
          >
            {galleryImages.map((data: any, i) => (
              <GridItem key={i} justifyContent={'center'} alignContent='center'>
                <Image
                  height={'500'}
                  width={'500'}
                  alt='magazine banner'
                  style={{
                    aspectRatio: 16 / 9,
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                  src={data.src}
                />
              </GridItem>
            ))}
          </Grid>
        </Container>
      </motion.div>

      <Footer />
    </>
  );
};
export default Gallery;
