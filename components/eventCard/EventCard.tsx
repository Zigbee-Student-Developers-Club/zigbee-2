import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

export default function EventCard({ data }) {
  console.log(data);
  return (
    <Card maxW='sm' m='2'>
      <CardBody>
        <Image
          src={data.thumbnail}
          alt='Green double couch with wooden legs'
          borderRadius='lg'
        />
        <Stack mt='4' spacing='1'>
          <Heading size='md'>{data.speaker.name}</Heading>
          <Text size='12px'>{data.date}</Text>
          <Text size='12px'>{data.speaker.role}</Text>
          <Text size='12px'>{data.speaker.company}</Text>
          <Heading size='md'>{data.topic}</Heading>
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
