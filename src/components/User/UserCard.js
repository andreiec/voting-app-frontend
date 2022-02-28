import { Box, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import defaultUserImage from "../../images/default-user.jpg";

function UserCard() {

    return (
        <Box
            bg='brand.white'
            borderRadius='15px'
            h="45rem"
            minW="21.5rem"
            boxShadow='base'
            display={{ base: 'none', md: 'block' }}
        >
            <Flex
                flexDir='column'
                px='25px'
                py='40px'
                alignItems='center'
                h='full'
            >
                <Image
                    src={defaultUserImage}
                    borderRadius="full"
                    w="120px"
                />

                <Text
                    fontSize='2xl'
                    mt='20px'
                    fontWeight='600'
                    color='brand.text_title'
                >
                    Constantinescu
                </Text>

                <Text
                    fontSize='2xl'
                    fontWeight='600'
                    mt='-5px'
                    color='brand.text_title'
                >
                    Andrei-Eduard
                </Text>
                
                <Text
                    fontSize='md'
                    fontWeight='400'
                    mt='10px'
                    color='brand.text_body'
                >
                    Student
                </Text>

                <Spacer />

                <Text
                    fontSize='sm'
                    fontWeight='400'
                    mt='10px'
                    color='brand.text_body'
                >
                    Data înscrierii: 23.02.2021
                </Text>
            </Flex>

        </Box>
    )
}


export default UserCard;