import {
  Box,
  Container,
  Flex,
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
      name: 'Suroj Roy',
    },

    {
      name: 'Nikhil Barik',
    },
  ],
};

const Tabs = ({ selectedYear, setSelectedYear }:any) => {
  return (
    <VStack bg='gray.100' p='8px' borderRadius={'4px'} minW='120px'>
      {Object.keys(alumniData)
        .reverse()
        .map((alum, i) => (
          <Box
            key={i}
            bg={alum === selectedYear ? '#5879f1' : 'gray.200'}
            color={alum === selectedYear ? 'white' : 'initial'}
            py='8px'
            px='16px'
            borderRadius={'4px'}
            w='100%'
            textAlign={'center'}
            onClick={() => setSelectedYear(alum)}
            cursor='pointer'
          >
            {alum}
          </Box>
        ))}
    </VStack>
  );
};

const TabContent = ({ alums }:any) => {
  return (
    <Box minH={'30em'} bg='gray.200' p='2em' w='100%' borderRadius={'4px'}>
      {alums.map((alum: any, i: any) => (
        <div key={i}>{alum.name}</div>
      ))}
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

        <Flex my={'2em'}>
          <Tabs selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
          <TabContent alums={alumni} />
        </Flex>
      </Container>
      <Footer />
    </>
  );
}
