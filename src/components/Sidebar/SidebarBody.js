import { chakra, Flex, Text, Box, Image, Spacer } from "@chakra-ui/react";
import SidebarItem from "./SidebarItem";
import fmi_logo from "../../images/logo_fmi.png";

function SidebarBody(props) {
    return (
        <Box
        h="full"
        bg="brand.main_blue"
        display={{ base: "none", xl: "block" }}
        pos="fixed"
        w={{ base: "full", xl: "275px" }}
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

            {props.linkItems.map((link) => (
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
    )
}

export default SidebarBody;