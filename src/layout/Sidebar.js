import { chakra, Flex, Text, Box, Image, Spacer } from "@chakra-ui/react";
import SidebarItem from "../components/Sidebar/SidebarItem";
import { FaHome, FaLayerGroup, FaBalanceScale, FaCog, FaAddressCard, FaBook } from "react-icons/fa";
import fmi_logo from "../images/logo_fmi.png";
import { useSelector } from "react-redux";

let linkItems = [
    { name: "Meniu Principal", icon: FaHome, link: "/" },
    { name: "Voturile tale", icon: FaBalanceScale, link: "/votes" },
    { name: "Grupuri", icon: FaLayerGroup, link: "/groups" },
    { name: "Useri", icon: FaAddressCard, link: "/users" },
    { name: "Setări", icon: FaCog, link: "/settings" }
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
        <Box
            h="full"
            bg="brand.main_blue"
            display={{ base: "none", md: "block" }}
            pos="fixed"
            w={{ base: "full", md: "275px" }}
            transition="3s ease"
        >
            <Flex flexDir="column" h="100%">
                <Flex
                    mt="7"
                    mb="5"
                    alignItems="center"
                    justifyContent="space-around"
                >
                    <Text fontSize="xl" fontWeight="700" color="brand.white">
                        Aplicație Vot
                    </Text>
                </Flex>

                <chakra.hr borderColor="#4485d1" mx="7" mb="7" />

                {linkItems.map((link) => (
                    <SidebarItem
                        key={link.name}
                        link={link.link}
                        icon={link.icon}
                    >
                        <Text mb="0.7">{link.name}</Text>
                    </SidebarItem>
                ))}

                <Spacer />

                <Image px="10" src={fmi_logo} alt="FMI - UniBuc" mb="5" />
            </Flex>
        </Box>
    );
}

export default Sidebar;
