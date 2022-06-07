import { Box, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import defaultUserImage from "../../images/default-user.jpg";

function UserCard() {

    const userSelector = useSelector(selector => selector.user);
    const joinedDate = new Date(Date.parse(userSelector.date_joined));

    return (
        <Box
            bg='white'
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
                    color='gray.900'
                >
                    {userSelector.last_name}
                </Text>

                <Text
                    fontSize='2xl'
                    fontWeight='600'
                    mt='-5px'
                    color='gray.900'
                >
                    {userSelector.first_name}
                </Text>
                
                <Text
                    fontSize='md'
                    fontWeight='400'
                    mt='10px'
                    color='gray.500'
                >
                    {userSelector.group_name}
                </Text>

                <Spacer />

                <Text
                    fontSize='sm'
                    fontWeight='400'
                    mt='10px'
                    color='gray.500'
                >
                    Data înscrierii: {joinedDate.toLocaleDateString()}
                </Text>
            </Flex>

        </Box>
    )
}


export default UserCard;