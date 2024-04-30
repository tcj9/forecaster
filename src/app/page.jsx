'use client'

import { Image } from '@chakra-ui/next-js';
import { Flex, Stack, Heading, Text, Input, Button, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function HomePage() {

    let router = useRouter();
    let [showError, setShowError] = useState(false);
    let [isSubmitting, setIsSubmitting] = useState(false);

    function onZipSubmit(submission) {
        setIsSubmitting(true)
        let zipCode = submission.get("zipCode");
        let zipCodeRegex = /^[0-9]{5}$/i;
        if (!zipCodeRegex.test(zipCode)) {
            setIsSubmitting(false)
            setShowError(true);
        } else {
            setTimeout(() => {
                router.push(`/${zipCode}`);
            }, 500)
        }
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            py={12}
            px={4}
            bg={'gray.50'}>
            <Stack
                boxShadow={'2xl'}
                bg={'white'}
                rounded={'xl'}
                p={10}
                spacing={8}
                align={'center'}>
                <Stack align={'center'} spacing={2}>
                    <Image alt='weather icon' src={"/imgs/logo512.png"} width={100} height={100} />
                    <Heading
                        textTransform={'uppercase'}
                        fontSize={'3xl'}
                        color={'gray.800'}
                        textAlign={"center"}
                        mb={3}
                    >
                        Get Weather For Your Desired Area
                    </Heading>
                    <Text textAlign={"center"} fontSize={'lg'} color={'gray.500'}>
                        Enter the 5 digit zip code of your target area
                    </Text>
                </Stack>
                <Stack spacing={4} action={onZipSubmit} direction={{ base: 'column', md: 'row' }} w={'full'} as={"form"}>
                    <VStack width="100%">
                        <Input
                            type={"text"}
                            placeholder={'(ex. 10001)'}
                            name='zipCode'
                            color={'gray.800'}
                            bg={"gray.200"}
                            rounded={'full'}
                            border={showError ? 1 : 0}
                            borderColor={"red"}
                            borderStyle={"solid"}
                            onChange={() => setShowError(false)}
                        />
                        {showError ? (<Text textAlign={"left"} color={"red"}>Invalid zip code</Text>) : null}
                    </VStack>
                    <Button
                        type='submit'
                        bg={'blue.400'}
                        rounded={'full'}
                        color={'white'}
                        flex={'1 0 auto'}
                        _hover={{ bg: 'blue.500' }}
                        _focus={{ bg: 'blue.500' }}
                        _disabled={{ bg: "gray.500" }}
                        isLoading={isSubmitting}
                    >
                        Search
                    </Button>
                </Stack>
            </Stack>
        </Flex >
    );
}