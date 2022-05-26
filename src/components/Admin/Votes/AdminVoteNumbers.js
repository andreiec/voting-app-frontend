import { Flex } from "@chakra-ui/react";
import AdminVoteNumbersCard from "./AdminVoteNumbersCard";

function AdminVoteNumbers(props) {

    const vote = props.data.vote;
    const users = props.data.users;
    const usersLength = users.length;

    // Count all options
    let optionsLength = 0;

    vote.questions.forEach((question) => {
        optionsLength += question.options.length;
    })

    return (
        <Flex flexDir='row' gap='65px' flexWrap='wrap' justifyContent='space-around' px={{base:'0px', md:'100px'}}>
            <AdminVoteNumbersCard title="Întrebări" value={vote.questions.length} />
            <AdminVoteNumbersCard title="Opțiuni" value={optionsLength} />
            <AdminVoteNumbersCard title="Grupuri" value={vote.groups.length} />
            <AdminVoteNumbersCard title="Votanți" value={usersLength} />
        </Flex>
    )
}

export default AdminVoteNumbers;