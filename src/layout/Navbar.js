import { Box, Image, Text, Center, Menu, MenuButton, MenuList, MenuItem, MenuGroup, Icon } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { FaPowerOff } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux";

import apiClient from '../http-common'
import defaultUserImage from '../images/default-user.jpg'
import Cookies from "js-cookie";
import { authActions } from '../store/index'
import { useNavigate } from "react-router-dom";

let requestConfig = {
    headers : {
        "Content-type": "application/json",
        "Authorization": `Bearer ${Cookies.get("token")}`,
    }
}

function Navbar() {
    const [user, setUser] = useState(null);
    const authSelector = useSelector(selector => selector.auth);
    const authDispatch = useDispatch();
    const navigate = useNavigate();

    const fetchUser = () => {
        apiClient.get(`users/${authSelector.userID}/`, requestConfig).then((response) => {
            setUser(response.data);
        }).catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        fetchUser();
    }, []);

    function logoutHandler() {
        authDispatch(authActions.logout());
        navigate('/');
    }

    return (
        <Box h='20' boxShadow='sm' zIndex='10'>
            <Box w='fit-content' mr='30px' ml='auto'>
                <Menu isLazy>
                    <MenuButton>
                        <Center h='55px' px='20px'  mt='10px'  boxShadow='base' borderRadius='10'>
                            <Text mb='3px'>{user && `${user.first_name} ${user.last_name[0]}.`}</Text>
                            <Image src={defaultUserImage} borderRadius='full' w='35px' ml='15px'></Image>
                        </Center>
                    </MenuButton>
                    <MenuList>
                        <MenuGroup title={user && `${user.first_name} ${user.last_name}`}>
                            <MenuItem onClick={logoutHandler} icon={<Icon mb='-2px' as={FaPowerOff} />} >
                                <Text>Deconectează-te</Text>
                            </MenuItem>
                        </MenuGroup>
                    </MenuList>
                </Menu>
            </Box>
        </Box>
    )
}

export default Navbar;