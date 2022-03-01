import { Flex, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import apiClient from "../http-common";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Cookies from "js-cookie";
import { userActions } from "../store";

function Layout() {
    const [user, setUser] = useState(null);
    const authSelector = useSelector((selector) => selector.auth);
    const userDispatch = useDispatch();

    const fetchUser = () => {
        let requestConfig = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        };

        apiClient
            .get(`users/${authSelector.userID}/`, requestConfig)
            .then((response) => {
                setUser(response.data);
                userDispatch(userActions.setUser(response.data))
                //console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <Box minH="100vh">
            <Sidebar />
            <Flex ml={{ base: 0, md: "275px" }} flexDir="column" minH="100vh">
                <Navbar user={user} />
                <Box
                    px={{ base: 0, md: '70px' }}
                    py={{ base: 8, md: 8 }}
                    bg="brand.bg"
                    flex="1"
                >
                    <Outlet />
                </Box>
                <Footer />
            </Flex>
        </Box>
    );
}

export default Layout;
