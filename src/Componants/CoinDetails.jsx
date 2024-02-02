import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../index'
import { useParams } from 'react-router-dom'
import ErrorComponant from './ErrorComponant'
import Loader from './Loader'
import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import Chart  from './Chart'

const CoinDetails = () => {
    const [coin,SetCoin]=useState([])
    const [loading,SetLoading]=useState(true)
    const [error,SetError]=useState(false)
    const [currecy,SetCurrency]=useState(`inr`)
    const [days,SetDays]=useState(`24h`)
    const [chartArray,SetChartArray]=useState([])
    const currecySymbol =currecy==="inr"?"₹" : currecy==="eur"?"€":"$";
    
    const params = useParams()
    const btns =["24h", "7d","14d","30d","60d","200d","365d","max"]
const switchChartStat =(key) =>{
switch (key) {
    case "24h":
        SetDays("24h")
        SetLoading(true)
        break;
    case  "7d":
        SetDays( "7d")
        SetLoading(true)
        break;
    case "14d":
        SetDays("14d")
        SetLoading(true)
        break;
    case "30d":
        SetDays("30d")
        SetLoading(true)
        break;
    case "60d":
        SetDays("60d")
        SetLoading(true)
        break;
    case "200d":
        SetDays("200d")
        SetLoading(true)
        break;
    case "365d":
        SetDays("365d")
        SetLoading(true)
        break;
    case "max":
        SetDays("max")
        SetLoading(true)
        break;

    default:
        break;
}

}


    useEffect(()=>{
        const fetchCoin = async () =>{
      try {
            const {data} = await axios.get(`${server}/coins/${params.id}`)
            const {data:ChartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currecy}&days=${days}`)
            SetCoin(data)
            SetChartArray(ChartData.prices)
          
            SetLoading(false)
           
        }

    catch (error) {
        SetError(true)
        SetLoading(false)
        
      }   }
        fetchCoin()
    },[currecy,days,params.id])

    if(error) return <ErrorComponant  message="Error While Fetching Coins" />

  return (
    <Container maxW={"container.xl"}>
    {loading ? <Loader />:(
        <>
       
        <Box w={"full"} borderWidth={1}> <Chart arr={chartArray} currency= {currecySymbol}  days={days} /></Box>
        
<HStack p={"4"} wrap={"wrap"} > {
        btns.map((i) =>(
            <Button key={i} onClick={()=> switchChartStat(i)}>{i}</Button>
        ))
    }

</HStack>

   
<RadioGroup value={currecy} onChange={SetCurrency} p={"8"}>
    <HStack spacing={"4"}>


    <Radio value="inr">INR</Radio>
    <Radio value="eur">EUR</Radio>
    <Radio value="usd">USD</Radio>
    </HStack>
</RadioGroup>

     <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
        <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"}>Last Updated On {Date(coin.market_data.last_updated).split("G")[0]}</Text>
        <Image src={coin.image.large} w={"16"} h={"16"} objectFit={"contain"} />
        <Stat>
            <StatLabel>{coin.name}</StatLabel>
            <StatNumber>{currecySymbol}{coin.market_data.current_price[currecy]}</StatNumber>
            <StatHelpText>
                <StatArrow type={coin.market_data.price_change_percentage_24h>0 ? "increase" : "decrease"} />
                {coin.market_data.price_change_percentage_24h}
            </StatHelpText>
        </Stat>
        <Badge fontSize={"2xl"} bgColor={"blackAlpha.900"} color={"white"}>
            {`#${coin.market_cap_rank}`}
        </Badge>

        <CustomeBar high={`${currecySymbol}${coin.market_data.high_24h[currecy]}`} 
        low={`${currecySymbol}${coin.market_data.low_24h[currecy]}`}/>

        <Box w={"full"} p={"4"}>
            <Item title= {"Max Supply"} value={coin.market_data.max_supply} />
            <Item title= {"Circulating Supply"} value={coin.market_data.circulating_supply} />
            <Item title= {"Market Cap"} value={`${currecySymbol}${coin.market_data.market_cap[currecy]}`} />
            <Item title= {"All Time Low"} value={`${currecySymbol}${coin.market_data.atl[currecy]}`} />
            <Item title= {"All Time High"} value={`${currecySymbol}${coin.market_data.ath[currecy]}`} />
        </Box>

       </VStack>
        </>
    )}
    </Container>
  )
}

const CustomeBar =({high,low}) =>{
   return <VStack w={"full"}> 

        <Progress value={50} colorScheme={"teal"} w={"full"}/>
        <HStack justifyContent={"space-between"} w={"full"}>
        <Badge children={low} colorScheme='red' />
        <Text fontSize={"sm"}>24H Range</Text>
        <Badge children={high} colorScheme='green' />
        </HStack>

    </VStack>
}
const Item =({title,value}) =>{
   return <HStack w={"full"} justifyContent={"space-between"} my={"4"}> 
   <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
   <Text>{value}</Text>

       

    </HStack>
}

export default CoinDetails