import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Image from 'next/image';

interface EventDataProps {
  data?: any;
}

const EventCard: NextPage<EventDataProps> = ({ data }) => {
  console.log(data.thumbnail);
  // console.log(data);
  return (
    <Card maxW='sm' height='100%' m='auto' background={'gray.100'}>
      <CardBody>
        <Flex justifyContent={'center'}>
          <Box overflow={'hidden'} rounded='lg'>
            <Image
              src={data.thumbnail}
              alt={data.topic}
              width='300'
              height='250'
            />
          </Box>
        </Flex>
        <Stack mt='4' spacing='1'>
          <Heading size='md' mb={'1'}>
            {data.topic}
          </Heading>
          <Heading size='sm'>{data.speaker.name}</Heading>
          <Text size='xs'>
            {data.speaker.role}, {data.speaker.company}
          </Text>
          <Text size='xs' fontWeight={'bold'}>
            {data.date}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter justifyContent={'center'} p='2'>
        <Button
          width={'100%'}
          colorScheme={data.expired ? 'red' : 'green'}
          variant='ghost'
        >
          {data.expired ? 'Event Expired' : data.date}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
