import { Button, Box, FormControl, FormLabel, Input, Link, Alert, AlertIcon, CloseButton, FormErrorMessage, } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authActions } from "../../store";
import apiClient from "../../http-common";
import { Form, Formik, Field } from "formik";
import * as Yup from 'yup';

const initialValues = {
    email: "",
    password: "",
}

const validationSchema = Yup.object({
    email: Yup.string().email('Email invalid').required('Obligatoriu'),
    password: Yup.string().required('Obligatoriu')
})


function LoginForm(props) {
    const navigate = useNavigate();
    const authDispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const submitHandler = (values, submitProps) => {
        setIsLoading(true);

        apiClient
            .post("auth/token/", {
                email: values.email,
                password: values.password,
            })
            .then((response) => {
                setIsLoading(false);
                setError(null);
                authDispatch(authActions.login(response.data["access"]));
                navigate("/");
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
            });
    };

    return (
        <Box bg="brand.white" borderRadius="10px" mt="30px">
            <Box m={{ base: "0px", md: "40px" }} p={{ base: "40px", md: "0px" }} w={{ base: "100vw", md: "340px" }}>
                {error && (
                    <Alert status="error" my="25px">
                        <AlertIcon />
                        Email-ul sau parola greșită.
                        <CloseButton
                            position="absolute"
                            right="8px"
                            top="8px"
                            onClick={() => props.handleSetError(false)}
                        />
                    </Alert>
                )}

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitHandler}>
                    <Form>
                        <Field name="email">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.email && form.touched.email}>
                                    <FormLabel fontWeight="600" htmlFor="email">
                                        E-mail
                                    </FormLabel>
                                    <Input {...field} id="email" />
                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Field name="password">
                            {({ field, form }) => (
                                <FormControl mt="10px" isInvalid={form.errors.password && form.touched.password}>
                                    <FormLabel fontWeight="600" htmlFor="password">
                                        Parolă
                                    </FormLabel>
                                    <Input {...field} id="password" type="password" />
                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Button
                            isLoading={isLoading}
                            w="full"
                            mt="25px"
                            bg="brand.main_blue"
                            _hover={{ bg: "brand.blue_light" }}
                            color="brand.white"
                            fontWeight="400"
                            type="submit"
                        >
                            Autentifică-te
                        </Button>
                    </Form>
                </Formik>

                <Box mt="10px">
                    <Link href="#" color="brand.main_blue">
                        Parolă uitată?
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}

export default LoginForm;
