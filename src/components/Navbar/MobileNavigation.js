import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, Text, DrawerBody, Flex, Button, useBreakpointValue } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { sidebarActions } from "../../store";

function SidebarMobile(props) {

    const sidebarSelector = useSelector(selector => selector.sidebar);
    const dispatch = useDispatch();

    const size = useBreakpointValue({base: 'full', md: 'xs'})

    return (
        <Drawer isOpen={sidebarSelector.opened} placement="left">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth="3px">
                    <Flex flexDir='row' justifyContent='space-between'>
                        <Text>Aplicație Vot</Text>
                        <Button onClick={() => {dispatch(sidebarActions.closeSidebar())}}/>
                    </Flex>
                    
                </DrawerHeader>
                <DrawerBody>

                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default SidebarMobile;