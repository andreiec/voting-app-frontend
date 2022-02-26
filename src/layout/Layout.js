import { Flex, Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";


function Layout() {
    return (
        <Box minH="100vh">
            <Sidebar />
            <Flex ml={{ base: 0, md: '275px' }} flexDir='column' minH='100vh'>
                <Navbar />
                <Box px={{ base: 0, md: 70 }} py={{ base: 8, md: 12}} bg="brand.bg" flex='1'>
                    <Outlet />
                </Box>
                <Footer />
            </Flex>
        </Box>
    )
};


export default Layout;