'use client'

import { Link } from '@chakra-ui/next-js';
import { Heading, Box, Center, Stack, Button, Text, VStack, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function ForecastLocationPage({ params }) {
    let router = useRouter();
    let [isFetching, setIsFetching] = useState(false);
    let [locationData, setLocationData] = useState(null);
    async function fetchLocationData(zipCode) {
        return await fetch(`/api/getLocationInfo?zipCode=${zipCode}`)
            .then(response => response.json())
            .catch(err => console.error(err))
    }
    useEffect(() => {
        async function setupPage() {
            await fetchLocationData(params.zipCode)
                .then(data => setLocationData(data))
                .catch(err => console.error(err))
        }
        setupPage()
    }, [params.zipCode]);

    function onDailyForecastClick() {
        setIsFetching(true);
        router.push(`${params.zipCode}/daily/`);
    }
    function onHourlyForecastClick() {
        setIsFetching(true);
        router.push(`${params.zipCode}/hourly?`);
    }
    return (
        <Center h={"100vh"}>
            {locationData ? <VStack>
                <Box
                    maxW={'320px'}
                    w={'full'}
                    bg={'white'}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    p={6}
                    textAlign={'center'}>
                    <Heading fontSize={'2xl'} fontFamily={'body'}>
                        {locationData && locationData.locationName}
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
            </VStack> : <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />}
        </Center>
    );
}

export default ForecastLocationPage;