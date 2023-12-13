import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Flex,
  Grid,
  Heading,
  IconButton,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Footer from 'components/footer/Footer';
import Navbar from 'components/navbar/Navbar';
import AlumniHeroImg from 'assets/alumni-img.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Alum from 'components/alumniCard/Alum';
import { alumniData } from '../data/alumini';
import { motion } from 'framer-motion';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const highlightedAlumini = [
  {
    name: 'Ashutosh Dash',
    company: 'Badho',
    batch: '2023',
    text: 'It is a great honor to be the part of MCA family, OUTR.',
    imgURL:
      'https://media.licdn.com/dms/image/C4D03AQFmebXb_Bln4Q/profile-displayphoto-shrink_400_400/0/1650807332853?e=1707350400&v=beta&t=tPPvhm8riQaAVED-N3UVw1duj4l-Ko9ug-RIcdhXtVI',
  },

  {
    name: 'Biswanath Sahoo',
    company: 'IserveU',
    batch: '2023',
    text: 'It is a great honor to be the part of MCA family, OUTR.',
    imgURL:
      'https://media.licdn.com/dms/image/C4E03AQFXsq4FR8ds9A/profile-displayphoto-shrink_400_400/0/1642950344758?e=1707350400&v=beta&t=MPsMgOguLVutUFcHemnufLKI1_cM5N6tkVTFUJDRi5c',
  },
  {
    name: 'Soumya Ranjan Sahoo',
    company: 'IserveU',
    batch: '2023',
    text: 'It is a great honor to be the part of MCA family, OUTR.',
    imgURL:
      'https://media.licdn.com/dms/image/D5603AQF-4rv0uSW6Rw/profile-displayphoto-shrink_800_800/0/1686553949770?e=1707350400&v=beta&t=Ml3Jf68K7iyABjrXqEiqdAb4Ijz9o5cNNNIXpuJg51g',
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
  transition: 0.5,
};

const item = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

const Tabs = ({ selectedYear, setSelectedYear }) => {
  return (
    <Flex
      borderRadius={'4px'}
      py={4}
      minW='120px'
      h={'100vh'}
      position={'sticky'}
      top='0'
      zIndex={'999'}
      direction={'column'}
      gap='2'
      flexWrap={'wrap'}
    >
      <Text fontWeight={'bold'}>Batch of</Text>
      {Object.keys(alumniData)
        .reverse()
        .map((alum, i) => (
          <Button
            key={i}
            bg={alum === selectedYear ? '#5879f1' : 'teal.100'}
            color={alum === selectedYear ? 'white' : 'initial'}
            py='8px'
            px='16px'
            borderRadius={'8px'}
            minW='fit-content'
            textAlign={'center'}
            onClick={() => setSelectedYear(alum)}
            cursor='pointer'
            fontWeight={'bold'}
            _hover={{
              color: 'white',
              bg: '#5879f1',
            }}
          >
            {alum}
          </Button>
        ))}
    </Flex>
  );
};

const TabContent = ({ alums }) => {
  // console.log(alums);
  return (
    <Box minH={'30em'} w='100%' py={4} borderRadius={'8px'}>
      <motion.section variants={container} initial='hidden' animate='visible'>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2,1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
            xl: 'repeat(5, 1fr)',
          }}
          gap={6}
        >
          {alums.map((alum, i) => (
            <motion.div key={i} variants={item}>
              <Alum key={i} alumData={alum} />
            </motion.div>
          ))}
        </Grid>
      </motion.section>
    </Box>
  );
};

export default function Alumni() {
  const [alumni, setAlumni] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2025');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    breakpoints: {
      '(min-width: 200px)': {
        slides: { perView: 1, spacing: 5 },
      },
      '(min-width: 400px)': {
        slides: { perView: 2, spacing: 5 },
      },
      '(min-width: 1000px)': {
        slides: { perView: 3, spacing: 10 },
      },
    },
  });

  useEffect(() => {
    setAlumni(alumniData[selectedYear]);
  }, [alumni, selectedYear]);

  useEffect(() => {}, []);

  // console.log(Object.keys(alumniData));

  return (
    <>
      <Navbar />
      <Container maxW={'7xl'}>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          direction={{
            base: 'column',
            md: 'row',
          }}
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
              Alumni
            </Heading>
            <Text>
              They’re exemplary, they’re buoyant, they’re the high fliers,
              they’re the veterans. Here’s to help you learn more and connect
              with our respected alumni.
            </Text>
          </Stack>
          <Flex flex={1} justify={'center'} align={'center'}>
            <Image
              width='500'
              height='200'
              alt='zigbee hero'
              src={AlumniHeroImg}
            />
          </Flex>
        </Stack>

        {/* highlights */}

        <Text fontSize={24} mt={8}>
          Highlights
        </Text>

        <Box ref={sliderRef} className='keen-slider' my={8}>
          {highlightedAlumini.map((h, i) => (
            <Card
              key={i}
              className={'keen-slider__slide number-slide' + i + 1}
              maxW='md'
              border={'1px solid #eee'}
            >
              <CardHeader>
                <Flex spacing='4'>
                  <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Avatar
                      name={h.name}
                      src={
                        h.imgURL ||
                        'https://xsgames.co/randomusers/assets/avatars/male/63.jpg'
                      }
                    />

                    <Box>
                      <Heading size='sm'>{h.name}</Heading>
                      <Text>
                        {h.company}, Batch of {h.batch}{' '}
                      </Text>
                    </Box>
                  </Flex>
                </Flex>
              </CardHeader>
              <CardBody>
                <Text>{h.text}</Text>
              </CardBody>
            </Card>
          ))}
        </Box>
        {loaded && instanceRef.current && (
          <div className='dots'>
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  className={'dot' + (currentSlide === idx ? ' active' : '')}
                ></button>
              );
            })}
          </div>
        )}

        {/* alumni data */}
        <Flex my={'2em'} gap='1em' direction={'row'}>
          <Tabs selectedYear={selectedYear} setSelectedYear={setSelectedYear} />

          <TabContent
            alums={alumni.sort((a, b) => a?.name.localeCompare(b?.name))}
          />
        </Flex>
      </Container>
      <Footer />
    </>
  );
}
