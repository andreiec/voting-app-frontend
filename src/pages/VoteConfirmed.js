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

            <Center>
                <Button
                    as={Link}
                    to="/"
                    mt="100px"
                    bg="brand.main_blue"
                    _hover={{ bg: "brand.blue_light" }}
                    color="brand.white"
                    fontWeight="400"
                >
                    Meniu Principal
                </Button>
            </Center>
        </Flex>
    )
}

export default VoteConfirmed;