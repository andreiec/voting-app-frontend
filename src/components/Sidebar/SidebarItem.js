import { Icon, Flex, LinkBox } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function SidebarItem(props) {
    return (
        <LinkBox
            as={NavLink}
            to={props.link}
            style={{ textDecoration: "none" }}
        >
            <Flex
                align="center"
                color="brand.text_unfocused"
                px="20px"
                h="50px"
                _hover={{ bg: "blue.500", color: "white" }}
                transition="0.2s ease"
                fontWeight="500"
            >
                {
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{ color: "white" }}
                        as={props.icon}
                    />
                }
                {props.children}
            </Flex>
        </LinkBox>
    );
}

export default SidebarItem;
