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
import { Calendar, Calendar2, Person } from 'react-bootstrap-icons';

interface EventDataProps {
  data?: any;
}

const EventCard: NextPage<EventDataProps> = ({ data }) => {
  // console.log(data.thumbnail);
  // console.log(data);
  return (
    <Card maxW='sm' height='100%' m='auto' background={'gray.100'}>
      <CardBody>
        <Flex justifyContent={'center'}>
          <Box overflow={'hidden'} rounded='lg'>
            <Image
              style={{ minWidth: '100%', aspectRatio: 16 / 9 }}
              width={'360'}
              src={data.thumbnail}
              alt={data.topic}
              height='250'
            />
          </Box>
        </Flex>
        <Box mt='4'>
          <Heading size='md' mb={'2'}>
            {data.topic}
          </Heading>
          {data.speakers &&
            data.speakers.map((s: any, i: any) => (
              <Box key={i} my={4}>
                <Flex gap={2}>
                  <Flex
                    style={{ aspectRatio: 1 }}
                    w={12}
                    h={12}
                    bg={'cyan.400'}
                    justifyContent='center'
                    alignItems={'center'}
                    borderRadius={'8'}
                  >
                    <Person size={'25'} />
                  </Flex>
                  <Box>
                    <Heading size='sm'>{s.name}</Heading>
                    <Text size='xs'>
                      {s.role}, {s.company}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ))}

          <Flex gap={2} alignItems={'center'}>
            <Calendar2 size={'18'} />
            <Text size='18px' fontWeight={'bold'}>
              {data.date}
            </Text>
          </Flex>
        </Box>
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
