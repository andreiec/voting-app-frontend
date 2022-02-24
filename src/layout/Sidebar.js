import { Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <div>
            <Link as={NavLink} to="/">Home</Link>
            <Link as={NavLink} to="/votes">Votes</Link>
            <Link as={NavLink} to="/settings">Settings</Link>
        </div>
    )
}

export default Sidebar;