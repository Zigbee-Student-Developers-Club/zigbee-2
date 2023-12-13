import {
  Box,
  Heading,
  Text,
  Image,
  Stack,
  Container,
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import Footer from 'components/footer/Footer';
import Navbar from 'components/navbar/Navbar';
import CodewarsImg from '/assets/codewars.png';
import { Link } from '@chakra-ui/react';
import Codewars1 from '/assets/events/codewars/codewars1.jpeg';
import Codewars2 from '/assets/events/codewars/codewars2.jpeg';
import Codewars3 from '/assets/events/codewars/codewars3.jpeg';
import Codewars4 from '/assets/events/codewars/codewars4.jpeg';

const codewarsGallery = [Codewars1, Codewars2, Codewars3, Codewars4];

const Events = () => {
  console.log(Codewars1);
  return (
    <>
      <Navbar />
      <Container maxW={'7xl'}>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          direction={{ base: 'column', md: 'row' }}
          backgroundColor={'#FFFFCC'}
          borderRadius='2xl'
          py='10'
          px='14'
          mb='10'
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              fontWeight='black'
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
              as='h2'
            >
              Codewars
            </Heading>
            <Text>
              Embark on a coding odyssey like never before! CodeWars brings you
              intense competitive coding, brain-twisting aptitude challenges,
              and thrilling web development tasks. Don&apos;t just code;
              compete, conquer, and celebrate victory!
            </Text>
            <Link
              href='#codewars'
              bg='blackAlpha.900'
              w='fit-content'
              px='8'
              py='2'
              rounded={'md'}
              color={'white'}
              textDecoration={'none'}
            >
              Learn more
            </Link>
          </Stack>
          <Flex flex={1} justify={'center'} align={'center'}>
            <Image
              height='200'
              width='400'
              alt='codewars hero'
              src={CodewarsImg.src}
            />
          </Flex>
        </Stack>

        {/* 2023 */}
        <Flex
          my='32'
          justifyContent={'center'}
          alignItems={'center'}
          flexDir={'column'}
        >
          <Text fontSize={'4xl'} mb={'4'} fontWeight={'bold'}>
            Codewars 2023 🚀
          </Text>
          <Text as={'p'}>Stay Tuned! Winners will be announced soon...🎉</Text>
        </Flex>

        {/* Gallery */}

        <Text
          as={'h1'}
          textAlign={'center'}
          fontSize={'4xl'}
          fontWeight={'bold'}
        >
          A Glimpse of Codewars 2023 ✨
        </Text>

        <Grid
          // maxW={'675px'}
          my='8'
          minH='200px'
          templateRows='repeat(2, 1fr)'
          templateColumns='repeat(5, 1fr)'
          gap={4}
        >
          <GridItem rowSpan={2} colSpan={2}>
            <Image
              height='400'
              width='400'
              objectFit={'cover'}
              style={{ width: '100%', height: '100%' }}
              alt='codewars hero'
              src={Codewars1.src}
              borderRadius={'2xl'}
            />
          </GridItem>
          <GridItem colSpan={3}>
            <Image
              height='400'
              width='400'
              objectFit={'cover'}
              style={{ width: '100%' }}
              alt='codewars hero'
              src={Codewars2.src}
              borderRadius={'2xl'}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <Image
              height='400'
              width='400'
              objectFit={'cover'}
              style={{ width: '100%' }}
              alt='codewars hero'
              src={Codewars3.src}
              borderRadius={'2xl'}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <Image
              height='400'
              width='400'
              objectFit={'cover'}
              style={{ width: '100%' }}
              alt='codewars hero'
              src={Codewars4.src}
              borderRadius={'2xl'}
            />
          </GridItem>
        </Grid>
      </Container>

      <Footer />
    </>
  );
};

export default Events;
