"use client"

import { useEffect, useState } from "react";
import HourlyForecastPeriod from "@/components/forecast/HourlyForecastPeriod";
import { Center, Divider, List, ListItem, Spinner, Stack } from '@chakra-ui/react';
import ForecastHeaderBar from "@/components/layout/ForecastPageHeaderBar";


const HourlyForecastPage = ({ params }) => {
    let [hourlyForecastData, setHourlyForecastData] = useState(null);
    async function fetchLocationData(zipCode) {
        return await fetch(`/api/forecast?zipCode=${zipCode}&type=hourly`)
            .then(response => response.json())
            .catch(err => console.error(err))
    }
    useEffect(() => {
        async function setupPage() {
            await fetchLocationData(params.zipCode)
                .then(data => setHourlyForecastData(data))
                .catch(err => console.error(err))
        }
        setupPage()
    }, [params.zipCode]);

    return (
        <Center height={"100vh"}>
            {hourlyForecastData ?
                (
                    <Stack spacing={4} h={"100%"} width={'100%'} direction={'column'}>
                        <ForecastHeaderBar forecastType={"12 Hour"} locationName={hourlyForecastData.locationName} zipCode={params.zipCode} locationColor={"green.500"} updatedOn={hourlyForecastData.updatedOn} />
                        <List spacing={3} textAlign="start">
                            {hourlyForecastData.periods.map((period, index) => (
                                <ListItem key={period.number}>
                                    <Divider />
                                    <HourlyForecastPeriod period={period} />
                                </ListItem>
                            ))}
                        </List>
                    </Stack>
                )
                :
                (<Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />)
            }
        </Center>
    );
};

export default HourlyForecastPage;