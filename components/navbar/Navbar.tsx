import {
  Button,
  Flex,
  useDisclosure,
  useMediaQuery,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Spacer,
  Stack,
  Container,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useRef } from 'react';
import NavItemsGroup from './NavItemsGroup';
import Logo from 'components/logo/Logo';

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery('(max-width: 900px)');
  const btnRef = useRef();

  return (
    <Container maxW={'7xl'}>
      <Flex py='4' alignItems={'center'}>
        <Link href='/'>
          <Logo />
        </Link>
        <Spacer />
        {isMobile ? (
          <>
            <Button onClick={onOpen}>
              <HamburgerIcon />
            </Button>
            <Drawer
              isOpen={isOpen}
              placement='left'
              onClose={onClose}
              finalFocusRef={btnRef.current}
              size='full'
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                  <Button
                    variant='ghost'
                    colorScheme='blue'
                    color='#5879f1'
                    size={'1em'}
                    className='logo'
                    p='16px'
                  >
                    Zigbee
                  </Button>
                </DrawerHeader>

                <DrawerBody>
                  <NavItemsGroup />
                </DrawerBody>

                <DrawerFooter>
                  <Button variant='outline' mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          <NavItemsGroup />
        )}
      </Flex>
    </Container>
  );
}
export default Navbar;
