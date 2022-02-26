import { Flex, Text, Button, Center, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import png404 from '../images/404.png'

function NotFound() {
    return (
        <Center h='100vh' bg='brand.bg'>
            <Flex flexDir="column" alignItems='center'>
                <Image src={png404} alt='Not found' />
                <Text fontWeight='bold' fontSize="2xl" mt='10px'>Pagina nu a fost găsită.</Text>
                <Button as={Link} to="/" w='160px' mt='20px' bg='brand.main_blue' _hover={{bg:'brand.blue_light'}} color='brand.white' fontWeight='400'>Meniu Principal</Button>
            </Flex>
        </Center>
    )
};

export default NotFound;