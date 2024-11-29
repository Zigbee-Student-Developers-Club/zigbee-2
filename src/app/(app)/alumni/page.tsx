const page = () => {
  return <div>Alumni</div>;
};

export default page;

// "use client" ; 


// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Avatar, Button, Card, CardContent, CardHeader, Container, Heading, ScrollArea, Separator, Text } from "@/components/ui";
// import { alumniData } from "@/Data/alumini";

// import InfoSection from "@/components/common/InfoSection";

// const highlightedAlumini = [
//   {
//     name: "Ashutosh Dash",
//     company: "Badho",
//     batch: "2023",
//     text: "It is a great honor to be the part of MCA family, OUTR.",
//     imgURL:
//       "https://media.licdn.com/dms/image/C4D03AQFmebXb_Bln4Q/profile-displayphoto-shrink_400_400/0/1650807332853?e=1707350400&v=beta&t=tPPvhm8riQaAVED-N3UVw1duj4l-Ko9ug-RIcdhXtVI",
//   },
//   // More alumni...
// ];

// const Tabs = ({ selectedYear, setSelectedYear }) => {
//   return (
//     <ScrollArea className="h-[100vh] w-40 sticky top-0">
//       <Text className="font-bold mb-2">Batch of</Text>
//       {Object.keys(alumniData)
//         .reverse()
//         .map((year, i) => (
//           <Button
//             key={i}
//             variant={year === selectedYear ? "primary" : "outline"}
//             className="mb-2"
//             onClick={() => setSelectedYear(year)}
//           >
//             {year === "2024" || year === "2025" ? `${year}*` : year}
//           </Button>
//         ))}
//     </ScrollArea>
//   );
// };

// const TabContent = ({ alums }) => {
//   return (
//     <motion.div
//       className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
//       initial="hidden"
//       animate="visible"
//       variants={{
//         hidden: { opacity: 0 },
//         visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
//       }}
//     >
//       {alums.length === 0 ? (
//         <Text>No Data Available</Text>
//       ) : (
//         alums.map((alum, i) => (
//           <motion.div key={i} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
//             <Card>
//               <CardHeader>
//                 <div className="flex items-center space-x-4">
//                   <Avatar src={alum.imgURL || "https://xsgames.co/randomusers/assets/avatars/male/63.jpg"} />
//                   <div>
//                     <Heading size="sm">{alum.name}</Heading>
//                     <Text>{`${alum.company}, Batch of ${alum.batch}`}</Text>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <Text>{alum.text}</Text>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))
//       )}
//     </motion.div>
//   );
// };

// export default function Alumni() {
//   const [alumni, setAlumni] = useState([]);
//   const [selectedYear, setSelectedYear] = useState("2025");

//   useEffect(() => {
//     setAlumni(alumniData[selectedYear]);
//   }, [selectedYear]);

//   return (

//       <Container className="py-8">
//         {/* Hero Section */}
//         <motion.div
//           initial={{ y: 100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           <InfoSection
//             imageSrc="/resource.png"
//             heading="Alumni"
//             text="   They’re exemplary, they’re buoyant, they’re the high fliers,
//                 they’re the veterans. Here’s to help you learn more and connect
//                 with our respected alumni."
//             background="bg-blue-100"
//             darkBackground="dark:bbg-teal-400"
//             imageHeight={200}
//             imageWidth={400}
//             placedImage={false}
//           />
//         </motion.div>



//         {/* Highlights Section */}
//         <Text className="text-2xl font-semibold mt-10">Highlights</Text>
        
//           {highlightedAlumini.map((h, i) => (
          
//               <Card key={i}>
//                 <CardHeader>
//                   <div className="flex items-center space-x-4">
//                     <Avatar src={h.imgURL} />
//                     <div>
//                       <Heading size="sm">{h.name}</Heading>
//                       <Text>{`${h.company}, Batch of ${h.batch}`}</Text>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <Text>{h.text}</Text>
//                 </CardContent>
//               </Card>
       
//           ))}


//         {/* Alumni Data Section */}
//         <div className="flex gap-4 mt-16">
//           <Tabs selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
//           <TabContent alums={alumni.sort((a, b) => a.name.localeCompare(b.name))} />
//         </div>
//       </Container>

//     </>
//   );
// }

