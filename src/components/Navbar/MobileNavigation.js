import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, Text, DrawerBody, Flex, useBreakpointValue, DrawerCloseButton } from "@chakra-ui/react";
import { FaHome, FaLayerGroup, FaBalanceScale, FaCog, FaAddressCard, FaBook } from "react-icons/fa";
import { useSelector } from "react-redux";
import MobileNavigationItem from "./MobileNavigationItem";

let linkItems = [
    { name: "Meniu Principal", icon: FaHome, link: "/" },
    { name: "Voturile tale", icon: FaBalanceScale, link: "/votes" },
    { name: "Grupuri", icon: FaLayerGroup, link: "/groups" },
    { name: "Useri", icon: FaAddressCard, link: "/users" },
    { name: "Setări", icon: FaCog, link: "/settings" }
];

function MobileNavigation(props) {

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
        <Drawer isOpen={props.isOpen} onClose={props.onClose} placement="left">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth="3px">
                    <Flex flexDir='row' justifyContent='space-between'>
                        <Text>Aplicație Vot</Text>
                        <DrawerCloseButton />
                    </Flex>
                    
                </DrawerHeader>
                <DrawerBody>
                    {linkItems.map((link) => (
                        <MobileNavigationItem
                            key={link.name}
                            link={link.link}
                            icon={link.icon}
                            onClose={props.onClose}
                        >
                            <Text mb="0.7" fontSize='lg' fontWeight='500'>{link.name}</Text>
                        </MobileNavigationItem>
                    ))}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default MobileNavigation;