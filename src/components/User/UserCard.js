import { Box, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import defaultUserImage from "../../images/default-user.jpg";

function UserCard() {

    const userSelector = useSelector(selector => selector.user);
    const joinedDate = new Date(Date.parse(userSelector.date_joined));

    return (
        <Box
            bg='brand.white'
            borderRadius='15px'
            h="45rem"
            minW="21.2rem"
            maxW="21.2rem"
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
                    {userSelector.last_name}
                </Text>

                <Text
                    fontSize='2xl'
                    fontWeight='600'
                    mt='-5px'
                    color='brand.text_title'
                >
                    {userSelector.first_name}
                </Text>
                
                <Text
                    fontSize='md'
                    fontWeight='400'
                    mt='10px'
                    color='brand.text_body'
                >
                    {userSelector.group_name}
                </Text>

                <Spacer />

                <Text
                    fontSize='sm'
                    fontWeight='400'
                    mt='10px'
                    color='brand.text_body'
                >
                    Data înscrierii: {joinedDate.toLocaleDateString()}
                </Text>
            </Flex>

        </Box>
    )
}


export default UserCard;