import { Box, Image, Text, Center, Menu, MenuButton, MenuList, MenuItem, MenuGroup, Icon, Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { FaPowerOff, FaCog } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi"
import { authActions, userActions } from "../store";

import defaultUserImage from "../images/default-user.jpg";
import MobileNavigation from "../components/Navbar/MobileNavigation";


function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const userSelector = useSelector(selector => selector.user);

    function logoutHandler() {
        dispatch(authActions.logout());
        dispatch(userActions.removeUser());
        navigate("/login");
    }

    return (
        <>
            <Flex h="65px" boxShadow="sm" zIndex="10">

                <Flex
                    alignItems="center"       
                    justifyContent="flex-start"
                    ml='20px'
                    mt='10px'
                    display={{base: 'block', xl: 'none'}}
                >

                    <IconButton
                        boxShadow="base"
                        colorScheme='whiteAlpha'
                        color='gray.900'
                        onClick={onOpen}
                        aria-label="open menu"
                        icon={<FiMenu />}
                    />
                </Flex>

                <Box w="fit-content" mr="30px" ml="auto">
                    <Menu autoSelect={false}>
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
                                    onClick={() => navigate('/settings')}
                                    icon={<Icon mb="-2px" as={FaCog} />}
                                >
                                    <Text>Setări</Text>
                                </MenuItem>
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
            </Flex>

            <MobileNavigation onClose={onClose} isOpen={isOpen}/>
        </>
    );
}

export default Navbar;
