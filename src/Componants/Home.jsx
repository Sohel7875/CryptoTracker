import { Box, Image, Text, transition } from '@chakra-ui/react'
import React from 'react'
import img from "../assests/btc.png"
import {motion} from "framer-motion"


const Home = () => {
  return <Box w={"full"} h={"85vh"} bgColor={"blackAlpha.900"} >
   <motion.div style={{
    height:"80vh",
   }}
   animate ={{
    translateY:"20px"
   }}
   transition={{
    duration:2,
    repeat:Infinity,
    repeatType:'reverse'

   }}>
   <Image w={"full"} h={"full"} objectFit={"contain"} src={img} filter={"grayscale(1)"}  />
   </motion.div>
    <Text fontSize={"6xl"} textAlign={"center"} mt={"15"} color={"whiteAlpha.700"} fontWeight={"thin"}>S Currency</Text>  </Box>
}

export default Home