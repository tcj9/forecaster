"use client"

import { useEffect, useState } from "react";
import DailyForecastPeriod from "@/components/forecast/DailyForecastPeriod";
import { DailyForecast, DailyForecastPeriod as Period } from '@/types/DailyForecast';
import { Box, Center, Stack, Wrap, WrapItem, } from '@chakra-ui/react';
import ForecastHeaderBar from "@/components/forecast/ForecastHeaderBar";

const DailyForecastPage = ({ searchParams }: { searchParams: any }) => {

    let [dailyForecast, setDailyForecast] = useState<DailyForecast | null>(null);
    let [dailyPeriods, setDailyPeriods] = useState<Period[] | null>(null)
    useEffect(() => {
        function getDailyData() {
            let dailyForecastEndpoint = searchParams.forecastUrl;
            fetch(dailyForecastEndpoint)
                .then(response => response.json())
                .then((response: { properties: DailyForecast; }) => {
                    let dailyForecastResponse = response.properties as DailyForecast;
                    let dailyForecastPeriods = dailyForecastResponse.periods.slice(0, 1);
                    dailyForecastPeriods.push(...dailyForecastResponse.periods.slice(1).filter(period => period.isDaytime));
                    setDailyForecast(dailyForecastResponse);
                    setDailyPeriods(dailyForecastPeriods);
                })
        }
        getDailyData();
    }, [searchParams.forecastUrl])

    return (
        <Box py={6} px={5} h={'100vh'}>
            <Stack spacing={4} width={'100%'} direction={'column'}>
                <ForecastHeaderBar locationColor={"blue.500"} forecastType="7 Day" location={searchParams.location} forecast={dailyForecast} />
                <Center py={12}>
                    <Wrap align={"center"} justify={"center"} spacing={{ base: 65, lg: 20 }}>
                        {dailyPeriods && dailyPeriods.map((period, index) => (
                            <WrapItem key={period.number}>
                                <DailyForecastPeriod period={period} />
                            </WrapItem>
                        ))}
                    </Wrap>
                </Center>
            </Stack>
        </Box>
    );
};

export default DailyForecastPage;