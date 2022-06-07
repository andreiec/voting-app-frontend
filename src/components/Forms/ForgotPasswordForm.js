import { Button, Box, FormControl, FormLabel, Input, Link, FormErrorMessage, useToast, } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import apiClient from "../../http-common";
import { object, string } from 'yup'

const initialValues = {
    email: "",
}

const validationSchema = object({
    email: string()
        .required('Obligatoriu')
        .email()
})

function ForgotPasswordForm(props) {
    const navigate = useNavigate();
    const toast = useToast();

    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = (values, submitProps) => {
        setIsLoading(true);

        apiClient
            .post("password_reset/", {
                email: values.email,
            })
            .then((response) => {
                setIsLoading(false);

                toast({
                    title: 'A fost trimis un mail de confirmare!',
                    status: 'success',
                    position: 'top',
                    duration: 4000,
                    isClosable: true,
                })

                navigate('/login')
            
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

                <Box mt="10px">
                    <Link as={ReachLink} to="/login" color="blue.600">
                        Înapoi
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}

export default ForgotPasswordForm;
