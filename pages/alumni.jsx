import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
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

const alumniData = {
  2022: [
    {
      name: 'Amar Kishore Senapati',
    },
    {
      name: 'Dinesh Rout',
    },
    {
      name: 'Siddhant Kumar Sahu',
    },
    {
      name: 'Abhijeet Garnayak',
    },
    {
      name: 'Animesh Panda',
    },
    {
      name: 'Ankita Sahoo',
    },
    {
      name: 'Anisha Pati',
    },
    {
      name: 'Arpan Prakash Sahoo',
    },
    {
      name: 'Arup Dash',
    },
    {
      name: 'Ashish Kumar Sahoo',
    },
    {
      name: 'Basanta Bhola',
    },
    {
      name: 'Biren Kumar Sahoo',
    },
    {
      name: 'Biswajeet Biswal',
    },
    {
      name: 'Chandrakant Jena',
    },
    {
      name: 'Chinmaya Kumar Jena',
    },
    {
      name: 'Chinmayee Sabar',
    },
    {
      name: 'Deeptimayee Ojha',
    },
    {
      name: 'Diptesh Choudhury',
    },
    {
      name: 'Ipsita Patnaik',
    },
    {
      name: 'Khagendra Rana',
    },
    {
      name: 'Pariseema Routray',
    },
    {
      name: 'Priyanka Mishra',
    },
    {
      name: 'Priyanka Mittal',
    },
    {
      name: 'Rajiv Kumar Jena',
    },
    {
      name: 'Rakesh Ranjan Pradhan',
    },
    {
      name: 'Sanjay Sahoo',
    },
    {
      name: 'Shashwat Kumar Panigrahi',
    },
    {
      name: 'Shibsundar Naik',
    },
    {
      name: 'Siddhant Kumar Sahu',
    },
    {
      name: 'Snehal Prusty',
    },
    {
      name: 'Soumya Ranjan Jena',
    },
    {
      name: 'Soumya Ranjan Sahoo',
    },
    {
      name: 'Sourav Soreng',
    },
    {
      name: 'Sudheer Kumar Swain',
    },
    {
      name: 'Sumanta Das',
    },
    {
      name: 'Sumit Behera',
    },
    {
      name: 'Susmita Subudhi',
    },
    {
      name: 'Vishal Sharma',
    },
  ],
  2021: [
    {
      name: 'Sudipta Behera',
    },
    {
      name: 'Ashutosh Dash',
    },
  ],
  2020: [
    {
      name: 'Suraj Roy',
    },

    {
      name: 'Nikhil Barik',
    },
  ],
  2017: [],
  2016: [],
  2015: [],
  2018: [],
  2019: [],
  2014: [],
  2013: [],
};

const Tabs = ({ selectedYear, setSelectedYear }) => {
  return (
    <Flex
      bg='gray.50'
      p='1em'
      borderRadius={'4px'}
      minW='140px'
      position={'sticky'}
      top='0'
      zIndex={'999'}
      direction={{
        base: 'row',
        md: 'column',
      }}
      gap='2'
      flexWrap={'wrap'}
    >
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
  console.log(alums);
  return (
    <Box minH={'30em'} bg='gray.50' p='1em' w='100%' borderRadius={'8px'}>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
          xl: 'repeat(5, 1fr)',
        }}
        gap={6}
      >
        {alums.map((alum, i) => (
          <Alum key={i} alumData={alum} />
        ))}
      </Grid>
    </Box>
  );
};

export default function Alumni() {
  const [alumni, setAlumni] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2022');

  useEffect(() => {
    setAlumni(alumniData[selectedYear]);
  }, [alumni, selectedYear]);

  // console.log(Object.keys(alumniData));

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
              // boxSize={{ base: "sm", md: "lg" }}
              // objectFit="contain"
              width='500'
              height='200'
              alt='zigbee hero'
              src={AlumniHeroImg}
            />
          </Flex>
        </Stack>

        <Flex my={'2em'} gap='1em' direction={{ base: 'column', md: 'row' }}>
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
