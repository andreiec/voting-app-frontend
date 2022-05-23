import { FaHome, FaLayerGroup, FaBalanceScale, FaCog, FaAddressCard, FaBook } from "react-icons/fa";
import { useSelector } from "react-redux";
import SidebarBody from "../components/Sidebar/SidebarBody";

let linkItems = [
    { name: "Meniu Principal", icon: FaHome, link: "/" },
    { name: "Voturile tale", icon: FaBalanceScale, link: "/votes" },
    { name: "Grupuri", icon: FaLayerGroup, link: "/groups" },
];

function Sidebar() {

    const userSelector = useSelector(selector => selector.user);

    // If user is staff, add the admin button
    if (userSelector.is_staff && linkItems[0].name !== "Admin") {
        linkItems = [{ name: "Admin", icon: FaBook, link: "/admin" }, ...linkItems]
    }

    // Remove button if user is not staff
    if (!userSelector.is_staff && linkItems[0].name === "Admin") {
        linkItems.shift();
    }

    return (
        <SidebarBody linkItems={linkItems} />
    );
}

export default Sidebar;
