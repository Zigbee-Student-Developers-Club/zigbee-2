import { Heading, Flex, Container, Stack, Text } from '@chakra-ui/react';
import OverTheCoffeeImg from 'assets/over-the-coffee.png';
import { useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function OverTheCoffee() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainConntrols = useAnimation();

  useEffect(() => {
    console.log(isInView);
    if (isInView) {
      mainConntrols.start('visible');
    }
  }, [isInView, mainConntrols]);

  return (
    <div>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial='hidden'
        animate='visible'
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <Container maxW={'7xl'} borderRadius='2xl' my={16} py={16}>
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
                A lot can happen over coffee, right?
              </Heading>
              <Text>
                One fine winter afternoon, a clump of mates casually chilling
                over some delicious coffee, random (but mostly funny)
                discussions, and that’s how Zigbee OUTR came into being!
                Originally established as a college’s development club for the
                Department of Computer Science and Applications, we’ve had a
                very humble beginning, with the first team consisting of only
                about ten members.
              </Text>
            </Stack>
            <Flex flex={1} justify={'center'} align={'center'}>
              <Image
                alt='zigbee hero'
                src={OverTheCoffeeImg.src}
                width='400'
                height='200'
              />
            </Flex>
          </Stack>
        </Container>
      </motion.div>
    </div>
  );
}
