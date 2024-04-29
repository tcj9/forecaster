'use client'

import WeatherMappings from '@/types/WeatherMappings';
import { Link } from '@chakra-ui/next-js';
import {
    Heading,
    Box,
    Center,
    Stack,
    Button,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IForecastLocationPageProps {
    params?: any
    searchParams: { lat: string, long: string, placeName: string, stateName: string }
}
let blankProps: IForecastLocationPageProps = { searchParams: { lat: "", long: "", placeName: "", stateName: "" } };
function ForecastLocationPage({ searchParams }: IForecastLocationPageProps = blankProps) {
    let router = useRouter();
    let [dailyForecastUrl, setDailyForecastUrl] = useState("");
    let [hourlyForecastUrl, setHourlyForecastUrl] = useState("");
    let [isFetching, setIsFetching] = useState(true);
    async function getForecastEndpoints(lat: string, long: string) {
        let weatherMappingsEndpoint = `https://api.weather.gov/points/${lat},${long}`;
        await fetch(weatherMappingsEndpoint)
            .then(response => response.json())
            .then(data => {
                let dailyForecastUrl = (data as WeatherMappings).properties.forecast;
                setDailyForecastUrl(dailyForecastUrl);
                return data;
            })
            .then(data => {
                let hourlyForecastUrl = (data as WeatherMappings).properties.forecastHourly;
                setHourlyForecastUrl(hourlyForecastUrl);
                return data;
            })
            .finally(() => {
                setIsFetching(false);
            })
    }
    useEffect(() => {
        if (searchParams.lat && searchParams.long) {
            getForecastEndpoints(searchParams.lat, searchParams.long);
        }
    }, [searchParams.lat, searchParams.long])
    function onDailyForecastClick() {
        setIsFetching(true);
        router.push(`/forecast/daily?location=${searchParams.placeName + ", " + searchParams.stateName}&forecastUrl=${dailyForecastUrl}`);
    }
    function onHourlyForecastClick() {
        setIsFetching(true);
        router.push(`/forecast/hourly?location=${searchParams.placeName + ", " + searchParams.stateName}&forecastUrl=${hourlyForecastUrl}`);
    }
    return (
        <Center h={"100vh"} py={6}>
            <VStack>
                <Box
                    maxW={'320px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    p={6}
                    textAlign={'center'}>
                    <Heading fontSize={'2xl'} fontFamily={'body'}>
                        {searchParams.placeName}, {searchParams.stateName}
                    </Heading>
                    <Stack mt={8} direction={'row'} spacing={4}>
                        <Button
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            bg={'blue.400'}
                            color={'white'}
                            isLoading={isFetching}
                            onClick={onDailyForecastClick}
                            boxShadow={
                                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                            }
                            _hover={{
                                bg: 'blue.500',
                            }}
                            _focus={{
                                bg: 'blue.500',
                            }}>
                            7 Day<br />Forecast
                        </Button>
                        <Button
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            bg={'green.400'}
                            color={'white'}
                            isLoading={isFetching}
                            onClick={onHourlyForecastClick}
                            boxShadow={
                                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                            }
                            _hover={{
                                bg: 'green.500',
                            }}
                            _focus={{
                                bg: 'green.500',
                            }}>
                            12 Hour<br />Forecast
                        </Button>
                    </Stack>
                </Box>
                <Text mt={5} as={Link} href={"/"}>Click here to select a different location.</Text>
            </VStack>
        </Center>
    );
}

export default ForecastLocationPage;