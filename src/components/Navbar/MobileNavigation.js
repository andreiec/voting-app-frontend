import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, Text, DrawerBody, Flex, useBreakpointValue, DrawerCloseButton } from "@chakra-ui/react";

function MobileNavigation(props) {

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

                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default MobileNavigation;