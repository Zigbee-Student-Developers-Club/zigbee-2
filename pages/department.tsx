import {
  Center,
  Container,
  Heading,
  Stack,
  Divider,
  Text,
  Flex,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import Footer from "components/footer/Footer";
import Navbar from "components/navbar/Navbar";

export default function Department() {
  return (
    <>
      <Navbar />
      <Container maxW={"7xl"}>
        <Stack align={"center"} direction={"column"} py="2" my="2">
          <Heading as="h1" size="2xl">
            Department of
          </Heading>
          <Heading as="h1" size="2xl">
            Computer Science and Application
          </Heading>
        </Stack>
        <Container maxW="5xl">
          <Stack spacing={5}>
            <Box>
              <Flex alignItems={"center"} gap={6}>
                <Heading as="h4" size="lg" pr="2">
                  Vision
                </Heading>
                <Divider
                  border="4px"
                  borderRadius={"2xl"}
                  borderColor="purple.100"
                />
              </Flex>

              <Text fontSize="xl" textAlign={"justify"}>
                To develop the student&apos;s skill to cope with the challenging
                industries expectations and to spring up the department to
                attain the international quality in the field of Education,
                Research & Development.
              </Text>
            </Box>
            <Box textAlign={"justify"}>
              <Flex alignItems={"center"} gap={6}>
                <Heading as="h4" size="lg" pr="2">
                  Mission
                </Heading>
                <Divider
                  border="4px"
                  borderRadius={"2xl"}
                  borderColor="cyan.100"
                />
              </Flex>
              <UnorderedList fontSize="xl">
                <ListItem>
                  To create a learning environment for enhancing skill
                </ListItem>
                <ListItem>
                  To Place student in reputed organisation by reflecting their
                  technical as well as soft skills.
                </ListItem>
                <ListItem>
                  To make the students societal, sympathetic and progressive in
                  upliftment of the mankind.
                </ListItem>
                <ListItem>
                  To encourage students to have innovative, ideals that can be
                  converted to feasible and implementable project.
                </ListItem>
              </UnorderedList>
            </Box>
            <Box textAlign={"justify"}>
              <Flex alignItems={"center"} gap={6}>
                <Heading as="h4" size="lg" pr="2" whiteSpace={"nowrap"}>
                  Programme Educational Objectives(PEOs)
                </Heading>
                <Divider
                  border="4px"
                  borderRadius={"2xl"}
                  borderColor="teal.100"
                />
              </Flex>
              <Text fontSize="xl">
                <Text as="span" fontWeight={"bold"}>
                  PEO 1:{" "}
                </Text>
                Excel in professional career and/or higher education by
                acquiring knowledge and skill in problem solving, analysis,
                programming and development.
              </Text>
              <Text fontSize="xl">
                <Text as="span" fontWeight={"bold"}>
                  PEO 2:{" "}
                </Text>
                Analyze real life problems, development of software appropriate
                to its solutions that are technically sound, economically
                feasible and industrially acceptable.
              </Text>
              <Text fontSize="xl">
                <Text as="span" fontWeight={"bold"}>
                  PEO 3:{" "}
                </Text>
                Exhibit professionalism, ethical attitude, communication skills,
                team work in their profession and adapt to current trends by
                engaging in lifelong learning.
              </Text>
              <Text fontSize="xl">
                <Text as="span" fontWeight={"bold"}>
                  PEO 4:{" "}
                </Text>
                Able to innovate programmatic, creative and economic solutions
                for real life problems with high degree of technical expertise
                and professional competency.
              </Text>
            </Box>
            <Box textAlign={"justify"}>
              <Flex alignItems={"center"} gap={6}>
                <Heading as="h4" size="lg" pr="2" whiteSpace={"nowrap"}>
                  Program Outcomes (POs)
                </Heading>
                <Divider
                  border="4px"
                  borderRadius={"2xl"}
                  borderColor="green.100"
                />
              </Flex>
              <Text fontSize="xl">
                <Text as="span" fontWeight={"bold"}>
                  PO 1:
                </Text>
                Acquiring sufficient knowledge on fundamentals of computer
                sciences, applied mathematics and computational aspects and to
                apply the knowledge gained on laboratory experiments.
              </Text>
              <Text fontSize="xl">
                <Text as="span" fontWeight={"bold"}>
                  PO 2:
                </Text>
                Possessing good listening, reading, writing and spoken skills on
                technical English communications.
              </Text>
              <Text fontSize="xl">
                <Text as="span" fontWeight={"bold"}>
                  PO 3:
                </Text>
                Applying the communicative language skills and professional
                knowledge to earn job opportunities in leading organizations.
              </Text>
              <Text>
                <Text as="span" fontWeight={"bold"}>
                  PO 4:
                </Text>
                Motivated with an interest to undergo higher studies in India or
                other countries.
              </Text>
              <Text fontSize="xl">
                <Text as="span" fontWeight={"bold"}>
                  PO 5:
                </Text>
                Ability to design, construct and test application oriented
                programs and projects related to IT industry.
              </Text>
              <Text fontSize="xl">
                <Text as="span" fontWeight={"bold"}>
                  PO 6:
                </Text>
                Developing skills to carry our experiments listed in syllabus
                and to implement individual/group project.
              </Text>
              <Text fontSize="xl">
                <Text as="span" fontWeight={"bold"}>
                  PO 7:
                </Text>
                Learning professional, managerial, ethical and environmental
                based principles to become good citizen of our nation.
              </Text>
              <Text fontSize="xl">
                <Text as="span" fontWeight={"bold"}>
                  PO 8:
                </Text>
                Ability to use computers for programming, simulation,
                documentation, calculation, slide presentation etc.
              </Text>
              <Text fontSize="xl">
                <Text as="span" fontWeight={"bold"}>
                  PO 9:
                </Text>
                Acquiring required broader knowledge on all other computer
                science disciplines.
              </Text>
              <Text fontSize="xl">
                <Text as="span" fontWeight={"bold"}>
                  PO 10:
                </Text>
                Flexibility to execute team work without any disparity based on
                gender, interdiscipline, etc.
              </Text>
              <Text fontSize="xl">
                <Text as="span" fontWeight={"bold"}>
                  PO 11:
                </Text>
                Presenting technical papers in the National / International
                Conferences journals, Workshops and Symposia.
              </Text>
            </Box>
            <Box>
              <Flex alignItems={"center"} gap={6}>
                <Heading as="h4" size="lg" whiteSpace={"nowrap"}>
                  About the Department
                </Heading>
                <Divider
                  border="4px"
                  borderRadius={"2xl"}
                  borderColor="blue.100"
                />
              </Flex>
              <Text fontSize="xl" textAlign={"justify"}>
                Department of Computer Science and Application was established
                in the year 1993, in College of Engineering and Technology,
                OUAT. The PGDCA program, under the department of Electrical
                Engineering from 1989 to 1992 was transformed into the MCA
                program and was bought under the CSA department. With an initial
                strength of 30 students, the department started in the year
                1993. In the year 2002, College of Engineering and Technology
                was transferred from Orissa University of Agriculture and
                Technology (OUAT) to Biju Patnaik University of Technology
                (BPUT). In the past 22 years, the department has developed
                manifold to join the club of elite departments in the state. The
                very fact that only the top rankers of the OJEE are eligible to
                study in this department speaks tons about the importance of the
                department in the state educational scenario. The department is
                committed to provide best quality knowledge in a lucid and less
                tiresome ways. The alumni of the department include software
                developers, bankers, academicians, entrepreneurs, and people
                from various other fields. The placement record of this
                department bears the testimony of its dedication and
                determination.
              </Text>
            </Box>
          </Stack>
        </Container>
        <Box mt={10}>
          <Center>
            <TableContainer  border="2px"
                  borderColor="blue.200">
              <Table size="sm" border="1px" borderColor="gray.200">
                <Thead
                  border="1px"
                  borderColor="gray.200"
                  backgroundColor="blue.200"
                >
                  <Tr>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr borderBottom="2px" borderColor="gray.200">
                    <Td>Head of the Department : Dr. Jibitesh Mishra</Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                  <Tr backgroundColor="blue.200">
                    <Td>Professor</Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text as="span" fontWeight={"bold"}>
                        Dr. Prashanta Kumar Patra (presently OSD)
                      </Text>
                      <Text>B.E.(Distn.)(NIT,Surat) M.Tech.</Text>
                      <Text> (IIT,Kharagpur) Ph.D. (Utkal University) </Text>
                      MIEEE,FIE(I),MIAENG,LMISTE{" "}
                    </Td>
                    <Td>
                      {" "}
                      Soft Computing,
                      <Text>Pattern Recognition</Text>
                      <Text mt={5}>E-mail: pkpatra@cet.edu.in </Text>
                    </Td>
                    <Td>Mob :9437189863</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text as="span" fontWeight={"bold"}>
                        Dr. Jibitesh mishra
                      </Text>
                      <Text>Ph.D. Computer Science </Text>
                    </Td>
                    <Td>
                      Fractal Graphics, Web Engineering.
                      <Text mt={5}>E-mail: jmishra@cet.edu.in</Text>
                      <Text>DOJ: 14/07/1994</Text>{" "}
                    </Td>
                    <Td>Mob :9337832006</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text as="span" fontWeight={"bold"}>
                        Dr. Ranjan Kumar Dash (presently<Text></Text> HOD IT)
                      </Text>
                      <Text>MCA, Ph.D.,(SU),LMISTE </Text>
                    </Td>
                    <Td>
                      Analysis and Design of Algorithm, Parallel &<Text></Text>{" "}
                      Distributed System.
                      <Text mt={6}>E-mail: rkdash@cet.edu.in</Text>
                      <Text>DOJ:30/01/2009</Text>{" "}
                    </Td>
                    <Td>Mob :9437360517</Td>
                  </Tr>
                  <Tr>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                  <Tr backgroundColor="blue.200">
                    <Td>Associate Professor</Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                  <Tr>
                    <Td>
                      {" "}
                      <Text as="span" fontWeight={"bold"}>
                        Dr. Debasis Gountia
                      </Text>
                      <Text></Text> Ph.D. (IIT Roorkee), M.Tech. (IIT,{" "}
                      <Text></Text>Kharagpur), B.Tech (UCE, Burla) in{" "}
                      <Text></Text>Computer Science and Engineering{" "}
                    </Td>
                    <Td>
                      Cryptography, Electronic Design Automation of{" "}
                      <Text></Text>Microfluidic Lab-on-a-Chips, Data Structures,
                      <Text></Text> Computer Security, Artificial Intelligence,
                      <Text></Text> Blockchain, Internet of Things
                      <Text mt={7}></Text>
                      E-mail: dgountia@cet.edu.in
                      <Text></Text>
                      DOJ:24/01/2006
                    </Td>
                    <Td>Mob :9437229338</Td>
                  </Tr>
                  <Tr>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                  <Tr backgroundColor="blue.200">
                    <Td>Assistant Professor</Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text as="span" fontWeight={"bold"}>
                        Mrs. Swarnalata Pati
                      </Text>
                      <Text></Text>
                      MCA (NIT, RKL) M.Tech. (NIT, RKL),
                    </Td>
                    <Td>
                      {" "}
                      Database Systems, Programming Languages
                      <Text mt={12}></Text>
                      E-mail: spati@cet.edu.in
                      <Text></Text>
                      DOJ:05/11/1993{" "}
                    </Td>
                    <Td>
                      Mob :9437101903
                      <Text></Text>
                      Res :0674-2406148
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text as="span" fontWeight={"bold"}>
                        Dr. Subasish Mohapatra (presently<Text></Text> HOD, CSE)
                      </Text>
                      <Text></Text>
                      B.E. in CSE (BPUT), M.Tech. in CS & IT<Text></Text>
                      (CET, BPUT), Ph.D. (NIT, Rourkela),
                    </Td>
                    <Td>
                      {" "}
                      Algorithms, Database Systems, Cloud Computing
                      <Text mt={12}></Text>
                      E-mail: smohapatra@cet.edu.in
                      <Text></Text>
                      DOJ:22/03/2013{" "}
                    </Td>
                    <Td>Mob :9437319132</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text as="span" fontWeight={"bold"}>
                        Mr. Manjit Kumar Nayak
                      </Text>
                      <Text></Text>
                      MCA (CET, OUAT), M.Tech. in CS (Utkal <Text></Text>Univ.),
                    </Td>
                    <Td>
                      Mobile Computing, Design & Analysis of<Text></Text>{" "}
                      Algorithms, Theory of Automata
                      <Text mt={12}></Text>
                      E-mail: manjitcsa@cet.edu.in
                      <Text></Text>
                      DOJ:22/03/2013{" "}
                    </Td>
                    <Td>Mob :9692268809</Td>
                  </Tr>
                  <Tr>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                  <Tr backgroundColor="blue.200">
                    <Td>Lecturer:</Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text as="span" fontWeight={"bold"}>
                        Mrs. Susmita Pal
                      </Text>
                      <Text></Text>
                      MCA(UU)
                    </Td>
                    <Td>
                      {" "}
                      Operating System, Java
                      <Text mt={12}></Text>
                      E-mail: susmitapal@gmail.com
                    </Td>
                    <Td>Mob :9437389327</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text as="span" fontWeight={"bold"}>
                        Mrs. Rojalin Mallick
                      </Text>
                      <Text></Text>
                      MCA (SOA)
                    </Td>
                    <Td>
                      {" "}
                      ITEJ, MIS, OOPS
                      <Text mt={12}></Text>
                      E-mail: rojalinmallick@gmail.com
                    </Td>
                    <Td>Mob :9778574484</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text as="span" fontWeight={"bold"}>
                        Mr. Amitav Mohapatra
                      </Text>
                      <Text></Text>
                      MCA(OUAT), M.Tech. CSE, CET(BPUT),<Text></Text> BBSR
                    </Td>
                    <Td>
                      {" "}
                      Soft Computing, Software Engg
                      <Text mt={12}></Text>
                      E-mail: amitavmahapatracse@cet.edu.in
                    </Td>
                    <Td>Mob :9937383858</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text as="span" fontWeight={"bold"}>
                        Mrs. Nibedita Rout
                      </Text>
                      <Text></Text>
                      B.Tech., M.Tech
                    </Td>
                    <Td>
                      {" "}
                      Theory of Computation, Data Structure
                      <Text mt={12}></Text>
                      E-mail: rout.nibedita@gmail.com
                    </Td>
                    <Td>Mob :7064520380</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text as="span" fontWeight={"bold"}>
                        Mr. Ratnakar Das
                      </Text>
                      <Text></Text>
                      M.Tech
                    </Td>
                    <Td>
                      {" "}
                      Analysis & Design of Algorithm, Theory of <Text></Text>
                      Computation
                      <Text mt={12}></Text>
                      E-mail: rkdas.puri@gmail.com
                    </Td>
                    <Td>Mob :9437280851</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text as="span" fontWeight={"bold"}>
                        Mrs. Sushree Sonam Mohapatra
                      </Text>
                      <Text></Text>
                      MCA, M.Tech
                    </Td>
                    <Td>
                      {" "}
                      Computer Organization and Architecture,<Text></Text>{" "}
                      Operating System
                      <Text mt={12}></Text>
                      E-mail: sonamsushree@gmail.com
                    </Td>
                    <Td>Mob :9658578816</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text as="span" fontWeight={"bold"}>
                        Dr. Ananta Charan Ojha
                      </Text>
                      <Text></Text>
                      MCA, Ph.D.
                    </Td>
                    <Td>
                      {" "}
                      Java, OOAD, UML
                      <Text mt={12}></Text>
                      E-mail: acojha2002@yahoo.co.in
                    </Td>
                    <Td>Mob :8763189752</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text as="span" fontWeight={"bold"}>
                        Ms. Shibani Tripathy
                      </Text>
                      <Text></Text>
                      MCA, M.Tech
                    </Td>
                    <Td>
                      Operating System, Mobile Computing
                      <Text mt={12}></Text>
                      E-mail: tripathy.shibani@gmail.com
                    </Td>
                    <Td>Mob :9556385672</Td>
                  </Tr>
                  <Tr>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Center>
        </Box>
        <Box mt="5">
          <Footer />
        </Box>
      </Container>
    </>
  );
}
