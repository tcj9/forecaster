import { DateTime } from "luxon"
import { Link } from "@chakra-ui/next-js";
import { useRouter } from "next/navigation";
import { Box, Heading, Text, Stack, } from '@chakra-ui/react';
import { DailyForecast, HourlyForecast } from "@/types/";


function ForecastHeaderBar({ forecast, forecastType, location, locationColor }: { locationColor: string, location: string, forecastType: string, forecast: DailyForecast | HourlyForecast | null }) {
    let router = useRouter();
    function handleLocationClick(mouseEvent: {}) {
        router.back();
    }

    return (
        <Stack
            p={5}
            alignItems={'center'}
            justifyContent={{
                base: 'flex-start',
                md: 'space-around',
            }}
            direction={{
                base: 'column',
                md: 'row',
            }}>
            <Stack
                width={{
                    base: '100%',
                    md: '40%',
                }}
                textAlign={'center'}>
                <Heading size={'lg'}>
                    {forecastType} Forecast for<br /><Text as={Link} onClick={handleLocationClick} href="#" color={locationColor}>{location}</Text>
                </Heading>
            </Stack>
            <Stack
                width={{
                    base: '100%',
                    md: '60%',
                }}>
                <Text textAlign={'center'}>
                    <strong><em>Last updated on:</em></strong> <em>{forecast && DateTime.fromISO(forecast.updated).toLocaleString({ weekday: 'long', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</em>
                </Text>
            </Stack>
        </Stack>

    )
}


export default ForecastHeaderBar;