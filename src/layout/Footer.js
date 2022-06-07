import { Text, Flex, Box, Spacer } from "@chakra-ui/react";

function Footer() {
    return (
        <Box
            display={{ base: "none", md: "block" }}
            h="47px"
            borderTop="1px"
            borderColor="#e0e1ea"
            bg="brand.bg"
        >
            <Flex
                px="8"
                flexDirection="row"
                color="gray.400"
                mt="10px"
                fontSize="sm"
                fontWeight="500"
            >
                <Text>@ Facultatea de Matematică și Informatică</Text>
                <Spacer />
                <Text mr="20px">Despre</Text>
                <Text>Contact</Text>
            </Flex>
        </Box>
    );
}

export default Footer;
