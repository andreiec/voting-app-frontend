import { Button, Box, FormControl, FormLabel, Input, FormErrorMessage, useToast, } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import apiClient from "../../http-common";
import { object, string, ref } from 'yup'
import { useSearchParams } from 'react-router-dom';

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

function ResetPasswordForm(props) {
    const navigate = useNavigate();
    const toast = useToast();

    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    
    const token = searchParams.get('token');

    // Validate token, if all good submit password
    const submitHandler = (values, submitProps) => {
        setIsLoading(true);

        apiClient
            .post("password_reset/validate_token/", { token: token })
            .then((response) => {
                apiClient
                    .post("password_reset/confirm/", {
                        password: values.password1,
                        token: token,
                    })
                    .then((response) => {
                        setIsLoading(false);

                        toast({
                            title: 'Parola resetată cu succes!',
                            status: 'success',
                            position: 'top',
                            duration: 4000,
                            isClosable: true,
                        })

                        navigate('/login')
                    
                    })
                    .catch((err) => {
                        setIsLoading(false);

                        toast({
                            title: 'A apărut o eroare 2!',
                            status: 'error',
                            position: 'top',
                            duration: 4000,
                            isClosable: true,
                        })
                    });
            })
            .catch((err) => {
                toast({
                    title: 'A apărut o eroare 1!',
                    status: 'error',
                    position: 'top',
                    duration: 4000,
                    isClosable: true,
                })
            })
    };


    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
    });


    return (
        <Box bg="white" borderRadius="10px" mt="30px">
            <Box m={{ base: "0px", md: "40px" }} p={{ base: "40px", md: "0px" }} w={{ base: "100vw", md: "340px" }}>
                
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
            </Box>
        </Box>
    );
}

export default ResetPasswordForm;
