import {
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import Footer from 'components/footer/Footer';
import Navbar from 'components/navbar/Navbar';
import DraftsHeroImg from 'assets/drafts-hero.png';
import ReflectionBanner1 from 'assets/magazine/reflectionHero.png';
import ReflectionBanner2 from 'assets/magazine/reflection2.png';
import MagazineCard from 'components/magazineCard/MagazineCard';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const magazineData = [
  {
    imgSrc: ReflectionBanner1,
    year: '2022',
    magazineURL:
      'https://drive.google.com/file/d/1d4atWmN2TvQE-c5aexGquTB3_Nbh_Rzk/view?usp=share_link',
  },
  {
    imgSrc: ReflectionBanner2,
    year: '2023',
    magazineURL:
      'https://drive.google.com/file/d/1ZJvMnvlvtFDsmyxR_AEfeuUYDL13vW_0/view?usp=sharing',
  },
];

const drafts = () => {
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
            backgroundColor={'red.100'}
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
                Magazines
              </Heading>
              <Text>
                Take a quick sneak peek into our Department&apos;s Annual
                Magazine, which embraces a plethora of humbly royal memories and
                celebrations of the various feats accomplished throughout
                the recent past.
              </Text>
            </Stack>
            <Flex flex={1} justify={'center'} align={'center'}>
              <Image
                width='300'
                height='200'
                alt='zigbee hero'
                src={DraftsHeroImg.src}
              />
            </Flex>
          </Stack>
          {/* magazine */}

          <Grid
            justifyContent={'center'}
            alignContent='center'
            gridAutoRows={'1fr'}
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
              xl: 'repeat(4, 1fr)',
            }}
            gap={8}
            my={'20'}
          >
            {magazineData.map((data: any, i) => (
              <GridItem key={i} justifyContent={'center'} alignContent='center'>
                <Link href={data.magazineURL} target='_blank'>
                  <MagazineCard data={data} />
                </Link>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </motion.div>

      <Footer />
    </>
  );
};
export default drafts;
