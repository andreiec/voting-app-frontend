import { Button, Center, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function VoteConfirmed(props) {
    return (
        <Flex
            bg="brand.white"
            borderRadius={{ base: "0", md: "15px" }}
            py="30px"
            px="50px"
            boxShadow={{ base: "", md: "sm" }}
            flexDir="column"
        >
            <Text
                fontSize='xl'
                fontWeight='600'
                color='brand.text_title'
                mb='8px'
            >
                Vot confirmat!
            </Text>
            <Text
                fontSize='sm'
                fontWeight='400'
                color='brand.text_body'
            >
                Votul tău a fost înregistrat.
            </Text>

            <Center mt="100px">
                <Button
                    as={Link}
                    to="/"
                    colorScheme='blue'
                    fontWeight="400"
                    px='20px'
                >
                    Meniu Principal
                </Button>
            </Center>
        </Flex>
    )
}

export default VoteConfirmed;