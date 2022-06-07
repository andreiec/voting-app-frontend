import { Button, Flex, Icon, Spacer, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";

function AdminCard(props) {
    const navigate = useNavigate();
    
    return (
        <Flex
            h="23.75rem"
            w="21.2rem"
            borderRadius="15px"
            py='30px'
            flexDir="column"
            overflow="hidden"
            boxShadow="base"
            backgroundColor="white"
            alignItems="center"
        >

            {/* Icon and title */}
            <Icon as={props.data.icon} boxSize="5rem" p='2px' color='gray.900'/>
            <Text fontSize='2xl' mt='20px' fontWeight='600' color='gray.900'>{props.data.title}</Text>

            <Spacer />

            {/* Button */}
            <Button colorScheme='blue' mb='15px' onClick={() => navigate(props.data.link)}><Text mb='3px'>Accesează</Text></Button>
        </Flex>
    )
}

export default AdminCard;