import { Flex, Center, Text, Divider } from "@chakra-ui/react";
import AdminVoteInactiveQuestionTable from "./AdminVoteInactiveQuestionTable";
import AdminVoteProgressCircle from "./AdminVoteProgressCircle";
import AdminVoteTitle from "./AdminVoteTitle";

function AdminVoteInactive(props) {
    
    const vote = props.data.vote;
    const userVotes = props.data.userVotes.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    const userLength = props.data.users.length;
    vote.questions[0].title='fsdfasdfas dfasdfadsfasdj foasjdfoipajsdoifjaosdjfo ajsdoifjaiosdjiop sdjfoiajsdoifjao psidjfosadjoifpa?'

    return (
        <Flex flexDir='column' gap='60px' mb='40px'>
            <AdminVoteTitle data={vote}/>

            <Center gap='100px' flexDir='column'>
                {vote.questions.map((question, index) => {
                    return (
                        <Flex flexDir='column' alignItems='center' gap='40px'>
                            <Text fontSize='md' fontWeight='600' w='fit-content'>{question.title}</Text>
                            <AdminVoteInactiveQuestionTable key={index} data={{question: question, userVotes: userVotes, userLength: userLength}}/>
                        </Flex>
                    )
                })}
            </Center>
        </Flex>
    )
}

export default AdminVoteInactive;