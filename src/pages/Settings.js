import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Titlebar from "../layout/Titlebar";
import { useEffect, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import apiClient from "../http-common";
import { object, string, ref } from 'yup'
import Cookies from "js-cookie";
import { useSelector } from "react-redux";


const initialValues = {
    password1: "",
    password2: "",
}


const validationSchema = object({
    password1: string()
        .required('Obligatoriu')
        .matches(
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Trebuie să conțină cel puțin 8 caractere, o literă mare, un număr și un caracter special"
          ),
    password2: string()
        .required('Obligatoriu')
        .oneOf([ref('password1'), null], 'Parolele trebuie să fie aceleași')
})


function Settings() {
    const navigate = useNavigate();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const userSelector = useSelector(selector => selector.user);

    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
    });

    let requestConfig = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
        },
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
          reset({ password1: '', password2: '' });
        }
    }, [isSubmitSuccessful, reset]);

    const submitHandler = (data) => {
        setIsLoading(true);

        apiClient
            .post(`users/${userSelector.id}/change-password/`, {password: data.password1}, requestConfig)
            .then(() => {
                toast({
                    title: 'Parolă updatată cu succes!',
                    status: 'success',
                    position: 'top',
                    duration: 4000,
                    isClosable: true,
                })

                setIsLoading(false);
            })
            .catch(() => {
                toast({
                    title: 'A apărut o eroare!',
                    status: 'error',
                    position: 'top',
                    duration: 4000,
                    isClosable: true,
                })

                setIsLoading(false);
            })
    }

    return (
        <>
            <Titlebar title='Setări' button={() => {navigate('/')}} buttonText="Meniu Principal" />

            {/* Change password */}
            <Flex
                bg="white"
                borderRadius={{ base: "0", md: "15px" }}
                py={{ base:"20px", md:"40px" }}
                px={{ base:"50px", md:"60px" }}
                boxShadow={{ base: "", md: "sm" }}
                minH={{base:"82vh", md:"31rem"}}
                flexDir="column"
            >
                <Flex maxW='300px' flexDir='column'>
                    <Text fontSize='xl' mb='20px' fontWeight='600'>Schimbă parola</Text>

                    <form onSubmit={handleSubmit(submitHandler)} autoComplete="off">
                        <FormControl isInvalid={!!errors?.password1?.message} mb='10px' isRequired>
                            <FormLabel fontWeight="600" htmlFor="password1">Noua parolă</FormLabel>
                            <Input id="password1" {...register('password1')} type='password' />
                            <FormErrorMessage>{errors?.password1?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors?.password2?.message} mb='10px' isRequired>
                            <FormLabel fontWeight="600" htmlFor="password2">Confirmă parola</FormLabel>
                            <Input id="password2" {...register('password2')} type='password' />
                            <FormErrorMessage>{errors?.password2?.message}</FormErrorMessage>
                        </FormControl>

                        <Button
                            isLoading={isLoading}
                            w="full"
                            mt="25px"
                            colorScheme='blue'
                            fontWeight="400"
                            type="submit"
                        >
                            Confirmă
                        </Button>
                    </form>
                </Flex>
            </Flex>
        </>
    )
}

export default Settings;