import { Flex, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";



function Layout() {
    const [user, setUser] = useState(null);
    const authSelector = useSelector((selector) => selector.auth);
    const dispatch = useDispatch();


    return (
        <Box minH="100vh">
            <Sidebar />
            <Flex ml={{ base: 0, xl: "275px" }} flexDir="column" minH="100vh">
                <Navbar user={user} />
                <Box
                    px={{ base: 0, md: '70px' }}
                    py={{ base: 8, md: 8 }}
                    bg={{base: "brand.white", md:"brand.bg"}}
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
