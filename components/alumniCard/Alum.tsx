import {
  Avatar,
  Badge,
  Flex,
  GridItem,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Link from 'next/link';
import { Linkedin } from 'react-bootstrap-icons';

interface AlumDataProp {
  alumData: {
    name: string;
    imgURL?: string | undefined;
    linkedinURL?: string | undefined;
    position?: string;
  };
}

const Alum: NextPage<AlumDataProp> = ({ alumData }) => {
  return (
    <GridItem
      p='1.5em 1em'
      bg={'teal.100'}
      borderRadius='8px'
      h='100%'
      textTransform='capitalize'
    >
      <Stack align={'center'} h='100%'>
        <Avatar
          src={alumData?.imgURL || 'https://bit.ly/broken-link'}
          size={'xl'}
          mb={1}
        />
        <Heading textAlign={'center'} size={'sm'}>
          {alumData.name.toLowerCase()}{' '}
          {alumData.position == 'PC' || 'CR' || 'GR' ? (
            <Badge
              colorScheme={alumData.position == 'PC' ? 'purple' : 'red'}
              variant='subtle'
            >
              {alumData.position}
            </Badge>
          ) : (
            ''
          )}
        </Heading>
        {alumData?.linkedinURL && (
          <Link href={alumData.linkedinURL} target='_blank'>
            <Linkedin size='24' color='#2B6CB0' />
          </Link>
        )}
      </Stack>
    </GridItem>
  );
};

export default Alum;
