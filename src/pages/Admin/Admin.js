import { Flex } from "@chakra-ui/react"
import AdminCard from "../../components/Admin/AdminCard";
import { MdOutlineHowToVote } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { ImStack } from "react-icons/im"
import Titlebar from "../../layout/Titlebar";

function Admin() {
    return (
        <>
            <Titlebar title='Admin'/>

            <Flex flexDir='row' justifyContent='space-around' flexWrap='wrap' gap='5rem'>
                <AdminCard data={{title: "Voturi", link: "votes", icon: MdOutlineHowToVote}}/>
                <AdminCard data={{title: "Grupuri", link: "groups", icon: ImStack}}/>
                <AdminCard data={{title: "Utilizatori", link: "users", icon: AiOutlineUsergroupAdd}}/>
            </Flex>
        </>
    )
}

export default Admin;