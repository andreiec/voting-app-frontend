import { Flex, Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";


function Layout(props) {
    return (
        <Box minH="100vh">
            <Sidebar />
            <Flex ml={{ base: 0, md: 60 }} flexDir='column' minH='100vh'>
                <Navbar />
                <Box px={{ base: 0, md: 70 }} py={{ base: 8, md: 12}} bg="brand.bg" flex='1'>
                    {props.children}
                </Box>
                <Footer />
            </Flex>
        </Box>
    )
};


export default Layout;