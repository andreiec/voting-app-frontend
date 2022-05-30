import { Flex } from "@chakra-ui/react";
import AdminVoteNumbers from "./AdminVoteNumbers";
import AdminVoteProgressCircle from "./AdminVoteProgressCircle";
import AdminVoteSubmittedVotes from "./AdminVoteSubmittedVotes";
import AdminVoteTitle from "./AdminVoteTitle";

function AdminVote(props) {
    return (
        <Flex flexDir='column' gap='90px'>
            <AdminVoteTitle data={props.data.vote}/>
            <AdminVoteNumbers data={{vote: props.data.vote, users: props.data.users, userVotes: props.data.userVotes}} />
            <AdminVoteProgressCircle data={{users: props.data.users, userVotes: props.data.userVotes, stopVoteHandler: props.data.stopVoteHandler}} />
            <AdminVoteSubmittedVotes data={{users: props.data.users, userVotes: props.data.userVotes}} />
        </Flex>
    )
}

export default AdminVote;