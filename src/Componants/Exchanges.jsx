import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {server} from "../index"
import { Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponant from './ErrorComponant'


const Exchanges = () => {
    const [exchange,SetExchanges]=useState([])
    const [loading,SetLoading]=useState(true)
    const [error,SetError]=useState(false)

    
useEffect(() =>{
    const fetchExchange =async () =>{
try {
    let {data} = await axios.get(`${server}/exchanges`)
SetExchanges(data)
console.log(exchange)
SetLoading(false)
    
} catch (error) {
    SetError(true)
    SetLoading(false)
    
}
    }
    fetchExchange()

},[])

if(error) return <ErrorComponant message="Error While Fetching Exchanges"/>

return( 
    
        loading ? <Loader />:(<Container maxW={"container.xl"} >
            <>
            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
             {
                exchange.map((i) =>(
                    <ExchangeCard key={i.id} name={i.name} url={i.url} img={i.image} rank={i.trust_score_rank} />
                    
                ))
             }
            </HStack>
            </>
            </Container>
        )
    
    
)


}

const ExchangeCard = ({name, img,url,rank}) =>{
return (<a href={url} target='blank' >
    <VStack w={'52'} shadow={"lg"} p={"8"} borderRadius={"lg"} transition={"all 0.3s "} m={"4"}
    css={{
        "&:hover":{
            transform:"scale(1.1)"
        }
    }
       
    }> 
        <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt='Exchanges' />
        <Heading size={"md"} noOfLines={1}>{rank}</Heading>
       <Text noOfLines={1}>{name}</Text>
    </VStack>
</a> )
}

export default Exchanges