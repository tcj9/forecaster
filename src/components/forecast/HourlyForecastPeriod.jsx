import { DateTime } from "luxon"
import { Heading, List, ListItem, Stack, Text, } from '@chakra-ui/react';
function HourlyForecastPeriod({ period }) {
    let startDate = DateTime.fromISO(period.startTime);
    let endDate = DateTime.fromISO(period.endTime);
    return (
        <Stack
            py={3}
            justifyContent={{
                base: 'flex-start',
                md: 'space-around',
            }}
            direction={{
                base: 'column',
                md: 'row',
            }}
            alignItems={{ md: 'center' }}>
            <List spacing={3} textAlign="start">
                <ListItem>
                    <Text>
                        <em>From:</em> <strong>{startDate.toLocaleString({ hour: '2-digit', minute: '2-digit' })}</strong>
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <em>To:</em>  <strong>{endDate.toLocaleString({ hour: '2-digit', minute: '2-digit' })}</strong>
                    </Text>
                </ListItem>
            </List>
            <Text>
                <em>Details:</em> {period.shortForecast}
            </Text>
            <Heading size={'md'}>{period.temperature}&deg;F</Heading>
        </Stack>
    );
};
export default HourlyForecastPeriod;