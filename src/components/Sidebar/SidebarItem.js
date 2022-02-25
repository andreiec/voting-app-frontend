import { Icon, Flex, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function SidebarItem(props) {
    return (
        <Link as={NavLink} to={props.link} style={{ textDecoration: 'none' }}>
            <Flex align='center' color='brand.text_unfocused' px='20px' h='50px' _hover={{ bg: 'brand.blue_light', color: 'brand.white'}} transition='0.2s ease' fontWeight='500'>
                {<Icon mr="4" fontSize="16" _groupHover={{ color: 'white', }} as={props.icon} />}
                {props.children}
            </Flex>
        </Link>
    )
}

export default SidebarItem;