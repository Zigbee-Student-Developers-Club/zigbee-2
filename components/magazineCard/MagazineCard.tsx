import { Box, Card, CardBody, Image } from '@chakra-ui/react';
import { NextPage } from 'next';

interface EventDataProps {
  data?: any;
}

const MagazineCard: NextPage<EventDataProps> = ({ data }) => {
  // console.log(data);

  return (
    <Box
      maxW='sm'
      overflow={'hidden'}
      height='100%'
      m='auto'
      background={'gray.100'}
      borderRadius={'lg'}
      shadow='md'
    >
      <Image
        borderRadius={'lg'}
        alt='magazine banner'
        src={data.imgSrc.src}
        transition='0.2s'
        _hover={{ transform: 'scale(1.2)' }}
      />
    </Box>
  );
};
export default MagazineCard;
