import { Heading, Flex, Container, Stack, Text } from '@chakra-ui/react';
import HomeHeroImg from 'assets/person-with-vr.png';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <Container maxW={'7xl'} my={16}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              fontWeight='black'
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
              as='h2'
            >
              Learn . Apply . Grow
            </Heading>
            <Text>
              Yes, if you love to code, you’re family already! Come join the
              cult and open yourself to a whole new world of technological
              bliss.
            </Text>
          </Stack>
          <Flex flex={1} justify={'center'} align={'center'}>
            <Image
              alt='zigbee hero'
              src={HomeHeroImg.src}
              width='500'
              height='200'
            />
          </Flex>
        </Stack>
      </motion.div>
    </Container>
  );
}
