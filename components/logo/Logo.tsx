import { Text } from '@chakra-ui/react';

const Logo = () => {
  return (
    <Text
      fontWeight={'black'}
      color='#5879f1'
      className='logo'
      py='8px'
      pr={'16px'}
      fontSize='4xl'
      display={'block'}
    >
      &lt; Zigbee /&gt;
    </Text>
  );
};
export default Logo;
