import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {server} from "../index"
import { Button, Container, HStack, Heading, Image, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponant from './ErrorComponant'
import { Link } from 'react-router-dom'


const Coins = () => {
    const [coins,SetCoins]=useState([])
    const [loading,SetLoading]=useState(true)
    const [error,SetError]=useState(false)
    const [page,SetPage]=useState(1)
    const [currecy,SetCurrency]=useState(`usd`)

    const currecySymbol =currecy==="inr"?"₹" : currecy==="eur"?"€":"$";

const ChangePage =(page) =>{
    console.log(page)
  SetPage(page);
  SetLoading(true)
};
const Btn = new Array(132).fill(1)

useEffect(() =>{
    const fetchcoins =async () =>{
try {
    let {data} = await axios.get(`${server}/coins/markets?vs_currency=${currecy}&page=${page}`)
SetCoins(data)
console.log(coins)
SetLoading(false)
    
} catch (error) {
    SetError(true)
    SetLoading(false)
    
}
    }
    fetchcoins()

},[page, currecy])

if(error) return <ErrorComponant message="Error While Fetching Coins"/>

return( <Container maxW={"container.xl"} >
    {
        loading ? <Loader />:(
            <>
            <RadioGroup value={currecy} onChange={SetCurrency} p={"8"}>
              <HStack spacing={"4"}>
                <Radio value='inr'>INR</Radio>
                <Radio value='eur'>EUR</Radio>
                <Radio value='usd'>USD</Radio>
              </HStack>
            </RadioGroup>
            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
             {
                coins.map((i) =>(
                    <CoinCard key={i.id} id={i.id}  name={i.name} symbol={i.symbol} img={i.image} price={i.current_price} currecySymbol={currecySymbol} />
                    
                ))
             }
            </HStack>

            <HStack w={"full"} overflowX={"auto"} p={"8"}>

           {
            Btn.map((item,index) =>(
               
              <Button bgColor={"blackAlpha.900"} key={index} color={"white"} onClick={()=>ChangePage(index+1)}>{index+1}</Button>
            ))
           }
            </HStack>
            </>

        )
    }
    
    </Container>
)


}

const CoinCard = ({id,name, img,symbol,price,currecySymbol}) =>{
return (<Link to={`/coins/${id}`} target='blank' >
    <VStack w={'52'} shadow={"lg"} p={"8"} borderRadius={"lg"} transition={"all 0.3s "} m={"4"}
    css={{
        "&:hover":{
            transform:"scale(1.1)"
        }
    }
       
    }> 
        <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt='Exchanges' />
        <Heading size={"md"} noOfLines={1}>{symbol}</Heading>
       <Text noOfLines={1}>{name}</Text>
       <Text noOfLines={1}>{price? `${currecySymbol}${price}`:"NA"}</Text>
    </VStack>
</Link> )
}


export default Coins