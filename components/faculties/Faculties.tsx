import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

const faculties = {
  hod: {
    name: "Dr. Jibitesh Mishra",
    papers: ["Fractal Graphics", "Web Engineering"],
    email: "jmishra@cet.edu.in",
    DOJ: "14/07/1994",
    qualifications: [],
  },
  professors: [
    {
      name: "Dr. Prashanta Kumar Patra",
      designated: "presently OSD",
      papers: ["Soft Computing", "Pattern Recognition"],
      email: "pkpatra@cet.edu.in",
      qualifications: ["Soft Computing", "Pattern Recognition"],
      mobile: "9437189863",
    },
    {
      name: "Dr. Jibitesh Mishra",
      papers: ["Fractal Graphics", "Web Engineering"],
      email: "jmishra@cet.edu.in",
      DOJ: "14/07/1994",
      qualifications: ["Ph.D. Computer Science "],
      mobile: "9337832006",
    },
    {
      name: "Dr. Ranjan Kumar Dash",
      designated: "presently HOD IT",
      papers: [
        "Analysis and Design of Algorithm",
        " Parallel & Distributed System",
      ],
      email: "rkdash@cet.edu.in",
      DOJ: "30/01/2009",
      qualifications: ["MCA", "Ph.D.", "(SU)", "LMISTE"],
      mobile: "9437360517",
    },
  ],
  associate_professors: [
    {
      name: "Dr. Debasis Gountia",
      papers: [
        "Cryptography",
        "Electronic Design Automation of Microfluidic Lab-on-a-Chips",
        "Data Structures",
        "Computer Security",
        "Artificial Intelligence",
        "Blockchain",
        "Internet of Things",
      ],
      email: "dgountia@cet.edu.in",
      DOJ: "24/01/2006",
      qualifications: [
        "Ph.D. (IIT Roorkee)",
        "M.Tech. (IIT, Kharagpur)",
        "B.Tech (UCE, Burla) in CSE",
      ],
      mobile: "9437229338",
    },
  ],
  assistant_professors: [
    {
      name: "Mrs. Swarnalata Pati",
      papers: ["Database Systems", "Programming Languages"],
      email: "spati@cet.edu.in",
      DOJ: "05/11/1993",
      qualifications: ["MCA (NIT, RKL)", "M.Tech. (NIT, RKL)"],
      mobile: "9437101903",
    },
    // {
    //   name: 'Dr. Subasish Mohapatra ',
    //   designated: 'presently HOD, CSE',
    //   papers: ['Algorithms', 'Database Systems', 'Cloud Computing'],
    //   email: 'smohapatra@cet.edu.in',
    //   DOJ: '22/03/2013',
    //   qualifications: [
    //     'B.E. in CSE (BPUT)',
    //     ' M.Tech. in CS & IT (CET, BPUT)',
    //     'Ph.D. (NIT, Rourkela)',
    //   ],
    //   mobile: '9437319132',
    // },
    {
      name: "Mr. Manjit Kumar Nayak",
      papers: [
        "Mobile Computing",
        "Design & Analysis of Algorithms",
        "Theory of Automata",
      ],
      email: "manjitcsa@cet.edu.in",
      DOJ: "22/03/2013",
      qualifications: ["MCA (CET, OUAT)", "M.Tech. in CS (Utkal Univ.)"],
      mobile: "9692268809",
    },
  ],
  lecturers: [
    {
      name: "Mrs. Susmita Pal",
      papers: ["Operating System", "Java"],
      email: "susmitapal@gmail.com",
      qualifications: ["MCA(UU)"],
      mobile: "9437389327",
    },
    {
      name: "Mrs. Rojalin Mallick",
      papers: ["ITEJ", "MIS", "OOPS"],
      email: "rojalinmallick@gmail.com",
      qualifications: ["MCA (SOA)"],
      mobile: "9778574484",
    },
    {
      name: "Mr. Amitav Mohapatra",
      papers: ["Soft Computing", "Software Engg"],
      email: "amitavmahapatracse@cet.edu.in",
      qualifications: ["MCA(OUAT)", "M.Tech", "CSE CET(BPUT), BBSR"],
      mobile: "9937383858",
    },
    {
      name: "Mr. Ratnakar Das",
      papers: ["Analysis & Design of Algorithm", "Theory of Computation"],
      email: "rkdas.puri@gmail.com",
      qualifications: ["M.Tech"],
      mobile: "9437280851",
    },
    {
      name: "Mrs. Sushree Sonam Mohapatra",
      papers: ["Computer Organization and Architecture", "Operating System"],
      email: "sonamsushree@gmail.com",
      qualifications: ["MCA", "M.Tech"],
      mobile: "9437280851",
    },
  ],
};

const Faculties = () => {
  return (
    <Container maxW={"5xl"} mx={"auto"}>
      <Stack
        align={"center"}
        direction={"column"}
        py="2"
        my="2"
        fontSize={{ sm: "10px", base: "20px", md: "30px", lg: "40px" }}
      >
        <Heading as="h1">Faculties</Heading>
      </Stack>

      <Box my="2">
        <Flex alignItems={"center"} gap={6}>
          <Heading as="h4" size="lg" pr="2" pb="2" whiteSpace={"nowrap"}>
            Head of the Department
          </Heading>
          <Divider border="4px" borderRadius={"2xl"} borderColor="blue.100" />
        </Flex>

        <Heading
          as="h4"
          size="md"
          color={"gray.800"}
          pr="2"
          pb="2"
          whiteSpace={"nowrap"}
        >
          {faculties.hod.name}
        </Heading>
      </Box>

      <Box my="2">
        {/* professors */}
        <Flex alignItems={"center"} gap={6}>
          <Heading as="h4" size="lg" pr="2" pb="2" whiteSpace={"nowrap"}>
            Professors
          </Heading>
          <Divider border="4px" borderRadius={"2xl"} borderColor="blue.100" />
        </Flex>

        {faculties.professors.map((professor, i) => (
          <Box key={i} my={3}>
            <Flex justify={"space-between"} gap="1em">
              <Box flexGrow={1}>
                <Heading
                  as="h4"
                  size="md"
                  color={"gray.700"}
                  pr="2"
                  pb="2"
                  whiteSpace={"nowrap"}
                >
                  {professor.name}
                </Heading>
                {professor.DOJ && (
                  <Text as={"p"} my="2" fontSize="sm">
                    <b>DOJ</b>: {professor.DOJ}
                  </Text>
                )}
                {professor.qualifications.map((q, i) => (
                  <Text as={"span"} fontSize="sm" key={i}>
                    {q}
                    {professor.qualifications.length === i + 1 ? "" : ", "}
                  </Text>
                ))}
              </Box>

              <Box flexBasis={"320px"}>
                {professor.papers.map((paper, i) => (
                  <Text as={"span"} fontSize="sm" key={i}>
                    {paper}
                    {professor.papers.length === i + 1 ? "" : ", "}
                  </Text>
                ))}
              </Box>

              <Box flexBasis={"200px"}>
                <Text as={"span"} fontSize="sm">
                  <b>Mob</b>: {professor.mobile}
                </Text>
                {
                  <Text as={"p"} my="2" fontSize="sm">
                    <b>Email</b>: {professor.email}
                  </Text>
                }
              </Box>
            </Flex>
          </Box>
        ))}

        {/* associate professors */}
        <Flex alignItems={"center"} gap={6}>
          <Heading as="h4" size="lg" pr="2" pb="2" whiteSpace={"nowrap"}>
            Associate Professors
          </Heading>
          <Divider border="4px" borderRadius={"2xl"} borderColor="blue.100" />
        </Flex>

        {faculties.associate_professors.map((professor, i) => (
          <Box key={i} my={3}>
            <Flex justify={"space-between"} gap="1em">
              <Box flexGrow={1}>
                <Heading
                  as="h4"
                  size="md"
                  color={"gray.700"}
                  pr="2"
                  pb="2"
                  whiteSpace={"break-spaces"}
                >
                  {professor.name}
                </Heading>
                {professor.DOJ && (
                  <Text as={"p"} my="2" fontSize="sm">
                    <b>DOJ</b>: {professor.DOJ}
                  </Text>
                )}
                {professor.qualifications.map((q, i) => (
                  <Text as={"span"} fontSize="sm" key={i}>
                    {q}
                    {professor.qualifications.length === i + 1 ? "" : ", "}
                  </Text>
                ))}
              </Box>

              <Box flexBasis={"320px"}>
                {professor.papers.map((paper, i) => (
                  <Text as={"span"} fontSize="sm" key={i}>
                    {paper}
                    {professor.papers.length === i + 1 ? "" : ", "}
                  </Text>
                ))}
              </Box>

              <Box flexBasis={"200px"}>
                <Text as={"span"} fontSize="sm">
                  <b>Mob</b>: {professor.mobile}
                </Text>
                {
                  <Text as={"p"} my="2" fontSize="sm">
                    <b>Email</b>: {professor.email}
                  </Text>
                }
              </Box>
            </Flex>
          </Box>
        ))}

        {/* assistant professors */}
        <Flex alignItems={"center"} gap={6}>
          <Heading as="h4" size="lg" pr="2" pb="2" whiteSpace={"nowrap"}>
            Assistant Professors
          </Heading>
          <Divider border="4px" borderRadius={"2xl"} borderColor="blue.100" />
        </Flex>

        {faculties.assistant_professors.map((professor, i) => (
          <Box key={i} my={3}>
            <Flex justify={"space-between"} gap="1em">
              <Box flexGrow={1}>
                <Heading
                  as="h4"
                  size="md"
                  color={"gray.700"}
                  pr="2"
                  pb="2"
                  whiteSpace={"break-spaces"}
                >
                  {professor.name}
                </Heading>
                {professor.DOJ && (
                  <Text as={"p"} my="2" fontSize="sm">
                    <b>DOJ</b>: {professor.DOJ}
                  </Text>
                )}
                {professor.qualifications.map((q, i) => (
                  <Text
                    as={"span"}
                    fontSize="sm"
                    key={i}
                    whiteSpace={"break-spaces"}
                  >
                    {q}
                    {professor.qualifications.length === i + 1 ? "" : ", "}
                  </Text>
                ))}
              </Box>

              <Box flexBasis={"320px"}>
                {professor.papers.map((paper, i) => (
                  <Text as={"span"} fontSize="sm" key={i}>
                    {paper}
                    {professor.papers.length === i + 1 ? "" : ", "}
                  </Text>
                ))}
              </Box>

              <Box flexBasis={"200px"}>
                <Text as={"span"} fontSize="sm">
                  <b>Mob</b>: {professor.mobile}
                </Text>
                {
                  <Text as={"p"} my="2" fontSize="sm">
                    <b>Email</b>: {professor.email}
                  </Text>
                }
              </Box>
            </Flex>
          </Box>
        ))}

        {/* lecturers */}
        <Flex alignItems={"center"} gap={6}>
          <Heading as="h4" size="lg" pr="2" pb="2" whiteSpace={"nowrap"}>
            Lecturers
          </Heading>
          <Divider border="4px" borderRadius={"2xl"} borderColor="blue.100" />
        </Flex>

        {faculties.lecturers.map((professor, i) => (
          <Box key={i} my={3}>
            <Flex justify={"space-between"} gap="1em">
              <Box flexGrow={1}>
                <Heading
                  as="h4"
                  size="md"
                  color={"gray.700"}
                  pr="2"
                  pb="2"
                  whiteSpace={"nowrap"}
                >
                  {professor.name}
                </Heading>
                {/* {professor.DOJ && (
                  <Text as={'p'} my='2' fontSize='sm'>
                    <b>DOJ</b>: {professor.DOJ}
                  </Text>
                )} */}
                {professor.qualifications.map((q, i) => (
                  <Text as={"span"} fontSize="sm" key={i}>
                    {q}
                    {professor.qualifications.length === i + 1 ? "" : ", "}
                  </Text>
                ))}
              </Box>

              <Box flexBasis={"320px"}>
                {professor.papers.map((paper, i) => (
                  <Text as={"span"} fontSize="sm" key={i}>
                    {paper}
                    {professor.papers.length === i + 1 ? "" : ", "}
                  </Text>
                ))}
              </Box>

              <Box flexBasis={"200px"}>
                <Text as={"span"} fontSize="sm">
                  <b>Mob</b>: {professor.mobile}
                </Text>
                {
                  <Text as={"p"} my="2" fontSize="sm">
                    <b>Email</b>: {professor.email}
                  </Text>
                }
              </Box>
            </Flex>
          </Box>
        ))}
      </Box>
    </Container>
  );
};
export default Faculties;
