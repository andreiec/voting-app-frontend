import { Link, Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <Box h='100%'>
            <Link as={NavLink} to="/">Home</Link>
            <Link as={NavLink} to="/votes">Votes</Link>
            <Link as={NavLink} to="/settings">Settings</Link>
        </Box>
    )
}

export default Sidebar;