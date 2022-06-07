import { Flex, Text, Center } from "@chakra-ui/react";
import LoginForm from "../components/Forms/LoginForm";


function Login() {
    return (
        <Center h="100vh" bg={{ base: "white", md: "brand.bg" }}>
            <Flex flexDir="column" alignItems="center" mb="35px">
                <Text fontWeight="bold" fontSize="3xl" color="gray.900">
                    Bun venit!
                </Text>
                <Text fontSize="sm" color="gray.500">
                    Autentifică-te pentru a continua.
                </Text>
                <LoginForm />
            </Flex>
        </Center>
    );
}

export default Login;
