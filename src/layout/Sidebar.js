import { chakra, Flex, Text, Box, Spacer } from "@chakra-ui/react";
import SidebarItem from "../components/Sidebar/SidebarItem"
import { FaHome, FaLayerGroup, FaBalanceScale, FaCog, FaAddressCard } from "react-icons/fa";


const linkItems = [
    { name: "Meniu Principal", icon: FaHome, link: "/" },
    { name: "Voturile tale", icon: FaBalanceScale, link: "/votes" },
    { name: "Grupuri", icon: FaLayerGroup, link: "/groups" },
    { name: "Useri", icon: FaAddressCard, link: "/users" },
    { name: "Setări", icon: FaCog, link: "/settings" }
];


function Sidebar() {
    return (
        <Box h='full' bg='brand.main_blue' display={{ base: 'none', md: 'block' }} pos='fixed' w={{ base: 'full', md: 60 }} transition="3s ease" style={{filter: 'drop-shadow(3px 0px 10px rgba(0, 0, 0, 0.05))' }}>
            <Flex mt='7' mb='5' alignItems="center" justifyContent='space-around'>
                <Text fontSize="xl" fontWeight="700" color='brand.white'>Aplicație Vot</Text>
            </Flex>

            <chakra.hr borderColor="#4485d1" mx='5' mb='7'/>
            
            {linkItems.map((link) => (
                <SidebarItem key={link.name} link={link.link} icon={link.icon}><Text mb='0.7'>{link.name}</Text></SidebarItem>
            ))}
        </Box>
    )
}

export default Sidebar;