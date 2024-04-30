import { Box, Center, Heading, Text, Stack, Image } from '@chakra-ui/react';
function DailyForecastPeriod({ period }) {
    return (
        <Box
            role={'group'}
            p={6}
            h={280}
            w={'215px'}
            bg={"white"}
            boxShadow={'2xl'}
            rounded={'lg'}
            pos={'relative'}
            zIndex={1}>
            <Center
                rounded={'lg'}
                mt={-12}
                pos={'relative'}
                height={'100px'}
                _after={{
                    transition: 'all .3s ease',
                    content: '""',
                    w: 'full',
                    h: 'full',
                    pos: 'absolute',
                    top: 5,
                    left: 0,
                    backgroundColor: `blue.700`,
                    filter: 'blur(15px)',
                    zIndex: -1,
                }}
                _groupHover={{
                    _after: {
                        filter: 'blur(20px)',
                    },
                }}>
                <Image
                    rounded={'lg'}
                    height={100}
                    width={100}
                    objectFit={'cover'}
                    src={period.icon}
                    alt='forecast image'
                />
            </Center>
            <Stack pt={10} align={'center'}>
                <Text fontWeight={800} fontSize={'xl'}>
                    {period.name}
                </Text>
                <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                    {period.temperature}&deg;F
                </Heading>
                <Stack direction={'row'} align={'center'}>
                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                        {period.shortForecast}
                    </Text>
                </Stack>
            </Stack>
        </Box>
    )
}
export default DailyForecastPeriod;