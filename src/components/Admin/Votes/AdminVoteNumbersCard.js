import { Flex, Text, Center } from "@chakra-ui/react";

function AdminVoteNumbersCard(props) {
    return (
        <Center flexDir='column' w='150px' h='150px' boxShadow='base' justifyContent='center' px='10px' pt='10px' pb='20px' gap='5px' borderRadius='10px'>
            <Text fontSize='lg' fontWeight='600'>{props.title}</Text>
            <Text fontSize='3xl'>{props.value}</Text>
        </Center>
    )
}

export default AdminVoteNumbersCard;