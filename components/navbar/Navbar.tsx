import {
  Button,
  Flex,
  HStack,
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
} from "@chakra-ui/react";
import Link from "next/link";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import NavItemsGroup from "./NavItemsGroup";

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 900px)");
  const btnRef = useRef();

  return (
    <Flex p="4">
      <Link href="/">
        <Button
          variant="ghost"
          _hover={{ background: "blue.100" }}
          colorScheme="blue"
          color="black"
          size={"lg"}
        >
          Zigbee
        </Button>
      </Link>
      <Spacer />
      {isMobile ? (
        <>
          <Button onClick={onOpen}>
            <HamburgerIcon />
          </Button>
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={btnRef.current}
            size="full"
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Zigbee</DrawerHeader>

              <DrawerBody>
                <NavItemsGroup />
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
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
  );
}
export default Navbar;
