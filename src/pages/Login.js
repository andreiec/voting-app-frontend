import { Flex, Text, Center } from "@chakra-ui/react";
import LoginForm from "../components/Forms/LoginForm";


function Login() {
    return (
        <Center h="100vh" bg={{ base: "brand.white", md: "brand.bg" }}>
            <Flex flexDir="column" alignItems="center" mb="35px">
                <Text fontWeight="bold" fontSize="3xl" color="brand.text_title">
                    Bun venit!
                </Text>
                <Text fontSize="sm" color="brand.text_body">
                    Autentifică-te pentru a continua.
                </Text>
                <LoginForm />
            </Flex>
        </Center>
    );
}

export default Login;
