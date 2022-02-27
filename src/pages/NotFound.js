import { Flex, Text, Button, Center, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import png404 from '../images/404.png'

function NotFound() {
    return (
        <Center h='100vh' bg='brand.bg'>
            <Flex flexDir="column" alignItems='center' px='45px'>
                <Image src={png404} alt='Not found' />
                <Text fontWeight='bold' fontSize="2xl" mt='15px' color='brand.text_title'>Pagina nu a fost găsită.</Text>
                <Button as={Link} to="/" mt='25px' bg='brand.main_blue' _hover={{bg:'brand.blue_light'}} color='brand.white' fontWeight='400'>Meniu Principal</Button>
            </Flex>
        </Center>
    )
};

export default NotFound;