"use client"

import { useEffect, useState } from "react";
import DailyForecastPeriod from "@/components/forecast/DailyForecastPeriod";
import { Center, Stack, Wrap, WrapItem, Spinner } from '@chakra-ui/react';
import ForecastHeaderBar from "@/components/layout/ForecastPageHeaderBar";

const DailyForecastPage = ({ params }) => {
    let [dailyForecastData, setDailyForecastData] = useState(null);
    async function fetchLocationData(zipCode) {
        return await fetch(`/api/forecast?zipCode=${zipCode}&type=daily`)
            .then(response => response.json())
            .catch(err => console.error(err))
    }
    useEffect(() => {
        async function setupPage() {
            await fetchLocationData(params.zipCode)
                .then(data => setDailyForecastData(data))
                .catch(err => console.error(err))
        }
        setupPage()
    }, [params.zipCode]);

    return (
        <Center height={"100vh"}>
            {dailyForecastData ?
                <Stack spacing={4} h={"100%"} width={'100%'} direction={'column'}>
                    <ForecastHeaderBar forecastType={"7 Day"} locationName={dailyForecastData.locationName} zipCode={params.zipCode} locationColor={"blue.500"} updatedOn={dailyForecastData.updatedOn} />
                    <Center py={12}>
                        <Wrap align={"center"} justify={"center"} spacing={{ base: 65, lg: 20 }}>
                            {dailyForecastData.periods.map((period, index) => (
                                <WrapItem key={period.number}>
                                    <DailyForecastPeriod period={period} />
                                </WrapItem>
                            ))}
                        </Wrap>
                    </Center>
                </Stack> :
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />}
        </Center>
    );
};

export default DailyForecastPage;