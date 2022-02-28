import {
    Box,
    Image,
    Text,
    Center,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    Icon,
} from "@chakra-ui/react";
import { FaPowerOff } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import defaultUserImage from "../images/default-user.jpg";
import { authActions } from "../store";

function Navbar(props) {
    const authDispatch = useDispatch();
    const navigate = useNavigate();

    function logoutHandler() {
        authDispatch(authActions.logout());
        navigate("/login");
    }

    return (
        <Box h="20" boxShadow="sm" zIndex="10">
            <Box w="fit-content" mr="30px" ml="auto">
                <Menu isLazy>
                    <MenuButton>
                        <Center
                            h="55px"
                            px="20px"
                            mt="10px"
                            boxShadow="base"
                            borderRadius="10"
                        >
                            <Text mb="3px">
                                {props.user &&
                                    `${props.user.first_name} ${props.user.last_name[0]}.`}
                            </Text>
                            <Image
                                src={defaultUserImage}
                                borderRadius="full"
                                w="35px"
                                ml="15px"
                            ></Image>
                        </Center>
                    </MenuButton>
                    <MenuList>
                        <MenuGroup
                            title={
                                props.user &&
                                `${props.user.first_name} ${props.user.last_name}`
                            }
                        >
                            <MenuItem
                                onClick={logoutHandler}
                                icon={<Icon mb="-2px" as={FaPowerOff} />}
                            >
                                <Text>Deconectează-te</Text>
                            </MenuItem>
                        </MenuGroup>
                    </MenuList>
                </Menu>
            </Box>
        </Box>
    );
}

export default Navbar;
