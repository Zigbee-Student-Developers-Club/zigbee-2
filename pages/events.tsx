import {
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import EventCard from 'components/eventCard/EventCard';
import Footer from 'components/footer/Footer';
import EventDog from 'assets/events-dog.png';
import Navbar from 'components/navbar/Navbar';
import Salesforce from 'assets/salesforce.png';
import Game from 'assets/game.png';

const eventsData = [
  {
    id: 1,
    date: '28th Nov 2022',
    speaker: {
      role: 'Tech Lead',
      name: 'Debasis Jena',
      company: 'Dubai Multi Commodities Center',
    },
    topic: 'Cloud Application Development with Salesforce Platform',
    expired: true,
    thumbnail: Salesforce.src,
  },
  {
    id: 2,
    date: '28th Nov 2022',
    speaker: {
      role: 'Lead game engineer',
      name: 'John Doe',
      company: 'Krafton Co.',
    },
    topic: 'Game Development with Unity 3D',
    expired: true,
    thumbnail: Game.src,
  },
];

export default function Events() {
  return (
    <>
      <Navbar />
      <Container maxW={'7xl'}>
        <Heading textAlign={'center'} as='h1' size='2xl'>
          Events
        </Heading>
        <Center>
          <Image
            boxSize='md'
            objectFit={'contain'}
            src={EventDog.src}
            alt='happy dog for the event'
          />
        </Center>
        <Text textAlign={'center'}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
          aliquam. Consectetur deleniti repudiandae reprehenderit. Quibusdam
          animi adipisci expedita sint beatae?
        </Text>

        <Grid templateColumns='repeat(4, 1fr)' gap={2} my={'2em'}>
          {eventsData.map((data: any, i) => (
            <GridItem key={i}>
              <EventCard data={data} />
            </GridItem>
          ))}
        </Grid>

        <Footer />
      </Container>
    </>
  );
}
