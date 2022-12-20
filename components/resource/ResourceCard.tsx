import { Box, Card, Heading, Text } from "@chakra-ui/react"
import ResourceCardStyles from "./resourceCard.module.css"

export default function ResourceCard(){
  return (
    <Card p="2" m="auto" bg="purple.50" className={ResourceCardStyles.card}>
        <div className={ResourceCardStyles.card_hero}>
            <Box bg="purple.400" opacity={"0.3"}  className={`${ResourceCardStyles.blob} ${ResourceCardStyles.blob1}`}></Box>
            <Box bg="purple.400" opacity={"0.3"}  className={`${ResourceCardStyles.blob} ${ResourceCardStyles.blob2}`}></Box>
            <Box bg="purple.400" opacity={"0.3"}  className={`${ResourceCardStyles.blob} ${ResourceCardStyles.blob3}`}></Box>
            <Heading fontWeight={"extrabold"} className={ResourceCardStyles.card_heading}>Frontend Development</Heading>
        </div>
        <div className={ResourceCardStyles.card_content}>
            <Text> with Author name</Text>
            <Text>tags</Text>
        </div>
    </Card>
  )
}