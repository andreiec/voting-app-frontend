import { Flex, Center } from "@chakra-ui/react";
import AdminVoteInactiveQuestionTable from "./AdminVoteInactiveQuestionTable";
import AdminVoteTitle from "./AdminVoteTitle";

function AdminVoteInactive(props) {
    
    const vote = props.data.vote;

    return (
        <Flex flexDir='column' gap='90px'>
            <AdminVoteTitle data={vote}/>

            <Center gap='30px'>
                {vote.questions.map((question, index) => {
                    return (
                        <AdminVoteInactiveQuestionTable key={index} question={question} />
                    )
                })}
            </Center>
        </Flex>
    )
}

export default AdminVoteInactive;