import { Flex, Text, Center } from "@chakra-ui/react";
import ForgotPasswordForm from "../components/Forms/ForgotPasswordForm";


function ForgotPassword() {
    return (
        <Center h="100vh" bg={{ base: "white", md: "brand.bg" }}>
            <Flex flexDir="column" alignItems="center" mb="35px">
                <Text fontWeight="bold" fontSize="3xl" color="gray.900">
                    Parolă uitată
                </Text>
                <Text fontSize="sm" color="gray.500">
                    Introdu adresa de mail pentru a continua.
                </Text>
                <ForgotPasswordForm />
            </Flex>
        </Center>
    );
}

export default ForgotPassword;
