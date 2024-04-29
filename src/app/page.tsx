'use client'

import { Image } from '@chakra-ui/next-js';
import { Flex, Stack, Heading, Text, Input, Button, useColorModeValue, VStack } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function HomePage() {

  let router = useRouter();
  const [formStatus, setFormStatus] = useState({ showError: false, zipCodeInvalid: true });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateZipCode(zipCode: string) {
    let zipCodeRegex = /^[0-9]{5}$/i;
    if (!zipCodeRegex.test(zipCode)) {
      setFormStatus({ showError: true, zipCodeInvalid: true });
    } else {
      setFormStatus({ showError: false, zipCodeInvalid: false });
    }
  }

  async function onZipSubmit(formData: any) {
    setIsSubmitting(true);

    if (formStatus.zipCodeInvalid) {
      setFormStatus({ zipCodeInvalid: true, showError: true });
      setIsSubmitting(false);
    } else {
      let zipCode = formData.get("zipCode");
      await fetch(`https://api.zippopotam.us/us/${zipCode}`)
        .then(results => results.json())
        .then(data => {
          let { longitude, latitude, "place name": placeName, "state abbreviation": stateName } = data.places[0];
          router.push(`/forecast?lat=${latitude}&long=${longitude}&placeName=${placeName}&stateName=${stateName}`)
        })
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      py={12}
      px={4}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        boxShadow={'2xl'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        p={10}
        spacing={8}
        align={'center'}>
        <Stack align={'center'} spacing={2}>
          <Image alt='weather icon' src={"/imgs/logo512.png"} width={100} height={100} />
          <Heading
            textTransform={'uppercase'}
            fontSize={'3xl'}
            color={useColorModeValue('gray.800', 'gray.200')}
            textAlign={"center"}
            mb={3}
          >
            Get Weather For Your Desired Area
          </Heading>
          <Text textAlign={"center"} fontSize={'lg'} color={'gray.500'}>
            Enter the 5 digit zip code of your target area
          </Text>
        </Stack>
        <Stack spacing={4} action={async (formData: any) => await onZipSubmit(formData)} direction={{ base: 'column', md: 'row' }} w={'full'} as={"form"}>
          <VStack width="100%">
            <Input
              type={"text"}
              placeholder={'(ex. 10001)'}
              name='zipCode'
              color={'gray.800'}
              bg={"gray.200"}
              rounded={'full'}
              border={formStatus.showError ? 1 : 0}
              borderColor={"red"}
              borderStyle={"solid"}
              onChange={(e) => validateZipCode(e.target.value)}
            />
            {formStatus.showError ? (<Text textAlign={"left"} color={"red"}>Invalid zip code</Text>) : null}
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