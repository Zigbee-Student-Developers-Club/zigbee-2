import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import Salesforce from 'assets/salesforce.png';

export default function EventCard() {
  return (
    <Card maxW='sm' m='2'>
      <CardBody>
        <Image
          src={Salesforce.src}
          alt='Green double couch with wooden legs'
          borderRadius='lg'
        />
        <Stack mt='4' spacing='1'>
          <Heading size='md'>Debasis Jena</Heading>
          <Text size='md'>2011</Text>
          <Text size='md'>Tech Lead</Text>
          <Text size='md'>Dubai Multi Commodities Center</Text>
          <Heading size='xl'>
            Cloud Application Development with Salesforce Platform
          </Heading>
        </Stack>
      </CardBody>
      <CardFooter justifyContent={'center'} p='2'>
        <Button width={'100%'} colorScheme='red' variant='ghost'>
          Event Expired
        </Button>
      </CardFooter>
    </Card>
  );
}
