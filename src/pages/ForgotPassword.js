import { Flex, Text, Center } from "@chakra-ui/react";
import LoginForm from "../components/Forms/LoginForm";


function ForgotPassword() {
    return (
        <Center h="100vh" bg={{ base: "white", md: "brand.bg" }}>
            <Flex flexDir="column" alignItems="center" mb="35px">
                <Text fontWeight="bold" fontSize="3xl" color="gray.900">
                    Parolă uitată
                </Text>
                <Text fontSize="sm" color="gray.500">
                    Introdu noua parolă și confirmarea acesteia.
                </Text>
                <LoginForm />
            </Flex>
        </Center>
    );
}

export default ForgotPassword;
