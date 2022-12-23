import { Avatar, GridItem, Heading, Stack } from '@chakra-ui/react';
import { IconBrandLinkedin } from '@tabler/icons';
import { NextPage } from 'next';
import Link from 'next/link';

interface AlumDataProp {
  alumData: {
    name: String;
    img_url?: String;
    linkedin_url?: String;
  };
}

const Alum: NextPage<AlumDataProp> = ({ alumData }) => {
  return (
    <GridItem p='1em' bg={'teal.100'} borderRadius='8px' h='100%'>
      <Stack align={'center'} h='100%'>
        <Avatar src='https://bit.ly/broken-link' />
        <Heading textAlign={'center'} size={'sm'}>
          {alumData.name}
        </Heading>
        {alumData.linkedin_url && (
          <Link href='/#' target='_blank'>
            <IconBrandLinkedin />
          </Link>
        )}
      </Stack>
    </GridItem>
  );
};

export default Alum;
