import { Flex, Text, Button, Center, Box, FormControl, FormLabel, Input, Link, Alert, AlertIcon, CloseButton } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'

import { authActions } from "../store";
import apiClient from '../http-common';


function Login() {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const navigate = useNavigate();
    const authDispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    function submitHandler() {
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        setIsLoading(true);

        apiClient.post('auth/token/', {
            email: enteredEmail,
            password: enteredPassword,
        }).then((response) => {
            setIsLoading(false);
            setError(null);
            authDispatch(authActions.login(response.data['access']));
            navigate('/');
        }).catch(err => {
            setIsLoading(false);
            setError(err);
        });
    };

    return (
        <Center h='100vh' bg={{base: 'brand.white', md: 'brand.bg'}}>
            <Flex flexDir="column" alignItems='center' mb='35px'>
                <Text fontWeight='bold' fontSize="3xl" color='brand.text_title'>Bun venit!</Text>
                <Text fontSize="sm" color='brand.text_body'>Autentifică-te pentru a continua.</Text>

                <Box bg='brand.white' borderRadius='10px' mt='30px' >
                    <Box m={{base: '0px', md: '40px'}} p={{base: '40px', md: '0px'}} w={{base: '100vw', md: '340px' }}>
                        {error && <Alert status='error' my='25px'><AlertIcon />Email-ul sau parola este greșită.<CloseButton position='absolute' right='8px' top='8px' onClick={() => setError(false)}/></Alert>}

                        <form>
                            <FormControl>
                                <FormLabel fontWeight='600' htmlFor='email'>E-mail</FormLabel>
                                <Input id='email' type='email' required ref={emailInputRef} />
                                <FormLabel fontWeight='600' htmlFor='password' mt='10px'>Parolă</FormLabel>
                                <Input id='password' type='password' required ref={passwordInputRef} />
                            </FormControl>

                            <Button onClick={submitHandler} isLoading={isLoading} w='full' mt='25px' bg='brand.main_blue' _hover={{bg:'brand.blue_light'}} color='brand.white' fontWeight='400'>Autentifică-te</Button>
                        </form>

                        <Box mt='10px'>
                            <Link href='#' color='brand.main_blue'>Parolă uitată?</Link>
                        </Box>
                    </Box>
                </Box>

            </Flex>
        </Center>
    )
}

export default Login;