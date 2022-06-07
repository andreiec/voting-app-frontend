import { Button, Box, FormControl, FormLabel, Input, Link, FormErrorMessage, useToast, } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import { authActions, automaticLogout } from "../../store";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import apiClient from "../../http-common";
import { object, string } from 'yup'
import jwt_decode from "jwt-decode";

const initialValues = {
    email: "",
    password: "",
}

const validationSchema = object({
    email: string()
        .email('Email invalid')
        .required('Obligatoriu'),
    password: string()
        .required('Obligatoriu')
})

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime * 1000).getTime();

    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
}

function LoginForm(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();

    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = (values, submitProps) => {
        setIsLoading(true);


        apiClient
            .post("auth/token/", {
                email: values.email,
                password: values.password,
            })
            .then((response) => {
                setIsLoading(false);

                const remainingTime = calculateRemainingTime(jwt_decode(response.data["access"])["exp"]);

                dispatch(automaticLogout(remainingTime));
                dispatch(authActions.login(response.data["access"]));

                navigate("/");
            })
            .catch((err) => {
                setIsLoading(false);
                
                // Toast error
                if (err.response.status === 401) {
                    toast({
                        title: 'Email sau parolă greșită!',
                        status: 'error',
                        position: 'top',
                        duration: 4000,
                        isClosable: true,
                    })
                } else {
                    toast({
                        title: 'A apărut o eroare!',
                        status: 'error',
                        position: 'top',
                        duration: 4000,
                        isClosable: true,
                    })
                }
            });
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
                        <FormControl isInvalid={!!errors?.email?.message} mb='10px' isRequired>
                            <FormLabel fontWeight="600" htmlFor="email">Email</FormLabel>
                            <Input id="email" {...register('email')}/>
                            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors?.password?.message} isRequired>
                            <FormLabel fontWeight="600" htmlFor="password">Parolă</FormLabel>
                            <Input id="password" {...register('password')} type='password'/>
                            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
                        </FormControl>

                        <Button
                            isLoading={isLoading}
                            w="full"
                            mt="25px"
                            colorScheme='blue'
                            fontWeight="400"
                            type="submit"
                        >
                            Autentifică-te
                        </Button>
                </form>

                <Box mt="10px">
                    <Link as={ReachLink} to="/forgot-password" color="blue.600">
                        Parolă uitată?
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}

export default LoginForm;
