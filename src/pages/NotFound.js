import { Flex, Text, Button, Center, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import png404 from "../images/404.png";

function NotFound() {
    return (
        <Center h="100vh" bg="brand.bg">
            <Flex flexDir="column" alignItems="center" px="45px">
                <Image src={png404} alt="Not found" />
                <Text
                    fontWeight="bold"
                    fontSize="2xl"
                    mt="15px"
                    color="gray.900"
                >
                    Pagina nu a fost găsită.
                </Text>
                <Button
                    as={Link}
                    to="/"
                    mt="25px"
                    colorScheme='blue'
                    fontWeight="400"
                >
                    Meniu Principal
                </Button>
            </Flex>
        </Center>
    );
}

export default NotFound;
