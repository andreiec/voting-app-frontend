import { Box, Image, Text, Center, Menu, MenuButton, MenuList, MenuItem, MenuGroup, Icon, } from "@chakra-ui/react";
import { FaPowerOff } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import defaultUserImage from "../images/default-user.jpg";
import { authActions, userActions } from "../store";

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userSelector = useSelector(selector => selector.user)

    function logoutHandler() {
        dispatch(authActions.logout());
        dispatch(userActions.removeUser());
        navigate("/login");
    }

    return (
        <Box h="65px" boxShadow="sm" zIndex="10">
            <Box w="fit-content" mr="30px" ml="auto">
                <Menu isLazy>
                    <MenuButton>
                        <Center
                            h="45px"
                            px="20px"
                            mt="9px"
                            boxShadow="base"
                            borderRadius="15px"
                        >
                            <Text mb="3px" fontSize='base'>
                                {userSelector.last_name && `${userSelector.first_name} ${userSelector.last_name[0]}.`}
                            </Text>
                            <Image
                                src={defaultUserImage}
                                borderRadius="full"
                                w="30px"
                                ml="15px"
                            ></Image>
                        </Center>
                    </MenuButton>
                    <MenuList>
                        <MenuGroup
                            title={
                                userSelector.last_name && `${userSelector.first_name} ${userSelector.last_name}`
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
