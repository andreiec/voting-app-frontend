import { Flex } from "@chakra-ui/react"
import AdminCard from "../../components/Admin/AdminCard";
import { FaBalanceScale, FaLayerGroup, FaUserCog } from "react-icons/fa";

function Admin() {
    return (
        <Flex flexDir='row' justifyContent='space-around' flexWrap='wrap' gap='5rem'>
            <AdminCard data={{title: "Voturi", link: "votes", icon: FaBalanceScale}}/>
            <AdminCard data={{title: "Grupuri", link: "groups", icon: FaLayerGroup}}/>
            <AdminCard data={{title: "Utilizatori", link: "users", icon: FaUserCog}}/>
        </Flex>
    )
}

export default Admin;