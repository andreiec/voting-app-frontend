import { Flex, Text, Button, Center, Box, FormControl, FormLabel, Input, Link, Alert, AlertIcon, CloseButton } from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";
import apiClient from '../http-common'

function Login() {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const loginUser = useCallback((userEmail, userPass) => {
        setIsLoading(true);

        apiClient.post('auth/token/', {
            email: userEmail,
            password: userPass,
        }).then((response) => {
            console.log(response.data)
            setIsLoading(false)
            setError(null)
        }).catch(error => {
            setIsLoading(false)
            setError(error)
        });
    }, []);


    function submitHandler(event) {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        loginUser(enteredEmail, enteredPassword);
    }

    return (
        <Center h='100vh' bg='brand.bg'>
            <Flex flexDir="column" alignItems='center'>
                <Text fontWeight='bold' fontSize="3xl" color='brand.text_title'>Bun venit!</Text>
                <Text fontSize="sm" color='brand.text_body'>Autentifică-te pentru a continua.</Text>

                <Box bg='brand.white' borderRadius='10px' mt='30px'>
                    <Box m='40px' w='340px'>
                        {error && <Alert status='error' my='25px'><AlertIcon />Email-ul sau parola este greșită.<CloseButton position='absolute' right='8px' top='8px' onClick={() => setError(false)}/></Alert>}

                        <form onSubmit={submitHandler}>
                            <FormControl onSubmit={submitHandler}>
                                <FormLabel fontWeight='600' htmlFor='email'>E-mail</FormLabel>
                                <Input id='email' type='email' required ref={emailInputRef} />
                                <FormLabel fontWeight='600' htmlFor='password' mt='10px'>Parolă</FormLabel>
                                <Input id='password' type='password' required ref={passwordInputRef} />
                            </FormControl>

                            <Button type='submit' isLoading={isLoading} w='full' mt='25px' bg='brand.main_blue' _hover={{bg:'brand.blue_light'}} color='brand.white' fontWeight='400'>Autentifică-te</Button>
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