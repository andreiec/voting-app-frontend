import { Center, CircularProgress, CircularProgressLabel, Flex, Text } from "@chakra-ui/react";

function AdminVoteNumbers(props) {

    const vote = props.data.vote;
    const userVotes = props.data.userVotes;
    const users = props.data.users;
    const usersLength = users.length;
    const userVotesLength = userVotes.length;

    // Reactive label inside progress circle
    const circleProgressFontSize = userVotesLength.toString().length >= 7? 'sm' : '2xl';

    return (
        <Flex mt='50px' px={{base: '0px', md:'50px'}} justifyContent='space-between' flexDir={{base: 'column', md: 'row'}}>
            <Flex>
                {props.data.vote.questions.length}
                {props.data.users.length}
            </Flex>

            {/* Progress Circle */}
            <Center flexDir='column' gap='15px'>
                <Text fontWeight='600'>Voturi exprimate</Text>
                <CircularProgress value={usersLength? (userVotesLength / usersLength * 100) : 0} size='120px' thickness={8}>
                    <CircularProgressLabel fontSize={circleProgressFontSize}>{userVotesLength}</CircularProgressLabel>
                </CircularProgress>
            </Center>
        </Flex>
    )
}

export default AdminVoteNumbers;