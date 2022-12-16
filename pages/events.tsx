import { Center, Container, Heading, Image, Text } from '@chakra-ui/react';
import EventCard from 'components/eventCard/EventCard';
import Footer from 'components/footer/Footer';
import EventDog from 'assets/events-dog.png';
import Navbar from 'components/navbar/Navbar';

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

        <EventCard />
        <Footer />
      </Container>
    </>
  );
}
