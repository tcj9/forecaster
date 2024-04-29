"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HourlyForecastPeriod from "@/components/forecast/HourlyForecastPeriod";
import { HourlyForecast, HourlyForecastPeriod as Period } from '@/types/HourlyForecast';
import { Box, Divider, List, ListItem, Stack } from '@chakra-ui/react';
import ForecastHeaderBar from "@/components/forecast/ForecastHeaderBar";


const HourlyForecastPage = ({ searchParams }: { searchParams: any }) => {

    let [hourlyForecast, setHourlyForecast] = useState<HourlyForecast | null>(null);
    let [hourlyPeriods, setHourlyPeriods] = useState<Period[] | null>(null);
    let router = useRouter();

    useEffect(() => {
        function getHourlyData() {
            let hourlyForecastEndpoint = searchParams.forecastUrl;
            fetch(hourlyForecastEndpoint)
                .then(response => response.json())
                .then((response: { properties: HourlyForecast; }) => {
                    let hourlyForecastResponse = response.properties as HourlyForecast;
                    setHourlyForecast(hourlyForecastResponse);
                    setHourlyPeriods(hourlyForecastResponse.periods.slice(0, 12));
                })
        }
        getHourlyData();
    }, [searchParams.forecastUrl])

    return (
        <Box py={6} px={5} h={'100vh'}>
            <Stack spacing={4} width={'100%'} direction={'column'}>
                <ForecastHeaderBar locationColor={"green.500"} forecastType="12 Hour" location={searchParams.location} forecast={hourlyForecast} />
                <List spacing={3} textAlign="start">
                    {hourlyPeriods && hourlyPeriods.map((period, index) => (
                        <ListItem key={period.number}>
                            <Divider />
                            <HourlyForecastPeriod period={period} />
                        </ListItem>
                    ))}
                </List>
            </Stack>
        </Box>
    );
};

export default HourlyForecastPage;
