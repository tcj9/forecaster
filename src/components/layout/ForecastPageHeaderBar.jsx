import { DateTime } from "luxon"
import { Link } from "@chakra-ui/next-js";
import { Heading, Text, Stack, } from '@chakra-ui/react';


function ForecastPageHeaderBar({ forecastType, locationName, locationColor, updatedOn, zipCode }) {
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
                    {forecastType} Forecast for<br /><Text as={Link} href={`/${zipCode}`} color={locationColor}>{locationName}</Text>
                </Heading>
            </Stack>
            <Stack
                width={{
                    base: '100%',
                    md: '60%',
                }}>
                <Text textAlign={'center'}>
                    <strong><em>Last updated on:</em></strong> <em>{DateTime.fromISO(updatedOn).toLocaleString({ weekday: 'long', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</em>
                </Text>
            </Stack>
        </Stack>
    )
}


export default ForecastPageHeaderBar;