import { Flex } from "@chakra-ui/react";
import AdminVoteTitle from "./AdminVoteTitle";

function AdminVoteInactive(props) {
    console.log(props.data)
    return (
        <Flex flexDir='column' gap='90px'>
            <AdminVoteTitle data={props.data.vote}/>
        </Flex>
    )
}

export default AdminVoteInactive;