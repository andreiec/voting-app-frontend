import { Center, CircularProgress, CircularProgressLabel, Divider, Flex, Text } from "@chakra-ui/react";

function AdminVoteProgressCircle(props){

    const userVotes = props.data.userVotes;
    const users = props.data.users;

    const usersLength = users.length;
    const userVotesLength = userVotes.length;
    
    // Reactive label inside progress circle
    const circleProgressFontSize = userVotesLength.toString().length >= 7? 'sm' : '2xl';

    return (
        <Center flexDir='column' gap='15px'>
            <Text fontWeight='600'>Voturi exprimate</Text>
            <CircularProgress value={usersLength? (userVotesLength / usersLength * 100) : 0} size='120px' thickness={8}>
                <CircularProgressLabel fontSize={circleProgressFontSize}>{userVotesLength}</CircularProgressLabel>
            </CircularProgress>
        </Center>
    )
}

export default AdminVoteProgressCircle;