import { Icon, Flex, LinkBox } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function MobileNavigationItem(props) {
    
    return (
        <LinkBox
            as={NavLink}
            to={props.link}
            style={{ textDecoration: "none" }}
            onClick={props.onClose}
        >
            <Flex
                align="center"
                px="5px"
                h="60px"
                transition="0.2s ease"
                fontWeight="500"
            >
                {
                    <Icon
                        mr="4"
                        fontSize="xl"
                        _groupHover={{ color: "white" }}
                        as={props.icon}
                    />
                }
                {props.children}
            </Flex>
        </LinkBox>
    )
}

export default MobileNavigationItem;