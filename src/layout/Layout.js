import { Box } from "@chakra-ui/react";
import { Fragment } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


function Layout(props) {
    return (
        <Box minH="100vh">
            <Sidebar />
            <Navbar />
            <Box ml={{ base: 0, md: 60 }}>
                <Box px={{ base: 0, md: 70 }} bg="red">
                    {props.children}
                </Box>
            </Box>
        </Box>
    )
};


export default Layout;