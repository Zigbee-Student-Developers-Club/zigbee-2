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
import { alumniData } from '../data/alumini';

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
          <Alum key={i} alumData={alum} />
        ))}
      </Grid>
    </Box>
  );
};

export default function Alumni() {
  const [alumni, setAlumni] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2024');

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
