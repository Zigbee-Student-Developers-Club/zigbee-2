import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Container,
  Heading,
} from '@chakra-ui/react';

const faqs = [
  {
    title: 'What is Zigbee?',
    content: `Zigbee is a student run community run by OUTR MCA Students that focuses fundamentally on software development. Zigbee CETB subsists on the belief that everyone can create & innovate.`,
  },
  {
    title: 'How can I join Zigbee?',
    content: `Anyone who loves to collaborate and build something amazing can join Zigbee.`,
  },
];

export default function FAQ() {
  return (
    <div>
      <Container my={16} py='4' maxW={'3xl'}>
        <Heading
          textAlign='center'
          fontWeight='black'
          fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
          as='h2'
        >
          FAQs
        </Heading>
        <Box my='2em'>
          {faqs.map((faq, i) => (
            <Accordion allowToggle key={i}>
              <AccordionItem border='none'>
                <h2>
                  <AccordionButton
                    _expanded={{ bg: 'teal.100', borderRadius: 'md' }}
                  >
                    <Box as='span' flex='1' textAlign='left'>
                      {faq.title}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>{faq.content}</AccordionPanel>
              </AccordionItem>
            </Accordion>
          ))}
        </Box>
      </Container>
    </div>
  );
}
