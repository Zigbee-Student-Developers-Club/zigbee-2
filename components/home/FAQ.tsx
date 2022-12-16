import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Container,
  Heading,
} from "@chakra-ui/react";

export default function FAQ() {
  return (
    <Container my="4" py="4" maxW={"7xl"}>
      <Heading
        textAlign="center"
        fontWeight="black"
        fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
        as="h2"
      >
        FAQs
      </Heading>
      <Accordion allowToggle>
        <AccordionItem border="none">
          <h2>
            <AccordionButton _expanded={{ bg: "teal.100", borderRadius: "md" }}>
              <Box as="span" flex="1" textAlign="left">
                Section 1 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border="none">
          <h2>
            <AccordionButton _expanded={{ bg: "blue.100", borderRadius: "md" }}>
              <Box as="span" flex="1" textAlign="left">
                Section 2 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
}
