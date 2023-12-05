import {
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import EventCard from 'components/eventCard/EventCard';
import Footer from 'components/footer/Footer';
import EventHeroImg from 'assets/event-img.png';
import Navbar from 'components/navbar/Navbar';
import Salesforce from 'assets/salesforce.png';
import Game from 'assets/game.png';
import ZairzaAndZigbee from 'assets/zairzaandzigbee.png';
import Image from 'next/image';

const eventsData = [
  {
    id: 1,
    date: '16th July 2023',
    topic: 'Alumini Connect',
    expired: true,
    thumbnail: ZairzaAndZigbee.src,
  },
  {
    id: 2,
    date: '24th Jan 2023',
    batch: '2020',
    speaker: {
      role: 'Game Developer',
      name: 'Mallik Ebadat',
      company: 'Amgo Games',
    },
    topic: 'Game Development with Unity 3D',
    expired: true,
    thumbnail: Game.src,
  },
  {
    id: 3,
    date: '28th Nov 2022',
    batch: '2011',
    speaker: {
      role: 'Tech Lead',
      name: 'Debasis Jena',
      company: 'Dubai Multi Commodities Center',
    },
    topic: 'Cloud Application Development with Salesforce Platform',
    expired: true,
    thumbnail: Salesforce.src,
  },
];

export default function AlumniConnect() {
  // console.log(eventsData);
  return (
    <>
      <Navbar />
      <Container maxW={'7xl'}>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          direction={{ base: 'column', md: 'row' }}
          backgroundColor={'purple.100'}
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
              Events
            </Heading>
            <Text>
              Yes, we’ve been really busy and happening lately. Or maybe it’s
              just that we love making it to the headlines time and again.
              Nevertheless, here’s to take you on a quick tour on all our
              ventures in the recent past.
            </Text>
          </Stack>
          <Flex flex={1} justify={'center'} align={'center'}>
            <Image
              height='200'
              width='400'
              alt='zigbee hero'
              src={EventHeroImg}
            />
          </Flex>
        </Stack>

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
          my={'10'}
        >
          {eventsData.map((data: any, i) => (
            <GridItem key={i} justifyContent={'center'} alignContent='center'>
              <EventCard data={data} />
            </GridItem>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
