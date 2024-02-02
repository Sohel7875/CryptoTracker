import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} color={"whiteAlpha.700"} minH={"48"} p={"16"} py={["16","9"]}> 
    <Stack direction={["column", 'row']} alignItems={"center"} h={"full"} >
        <VStack w={"full"} alignItems={["center","flex-start"] }>
            <Text fontWeight={"bold"}>About US</Text>
            <Text fontWeight={"bold"} fontSize={"sm"} letterSpacing={"widest"} textAlign={["center", "left"]}>We Are The Best Crypto Trading App in India, We Provide our Guidence at a very Cheap price</Text>

            
        </VStack>
        <VStack>
        <Avatar boxSize={"28"} mt={["4","0"]} />
        <Text> Our Founder</Text>


        </VStack>
    </Stack>
    
    
    </Box>
  )
}

export default Footer