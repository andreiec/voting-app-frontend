import { Button, Center, CircularProgress, CircularProgressLabel, Tag, Text } from "@chakra-ui/react";

function AdminVoteProgressCircle(props){

    const userSubmissions = props.data.userSubmissions;
    const users = props.data.users;

    const usersLength = users.length;
    const userSubmissionsLength = userSubmissions.length;
    
    // Reactive label inside progress circle
    const circleProgressFontSize = userSubmissionsLength.toString().length >= 7? 'sm' : '2xl';

    return (
        <Center flexDir='column' gap='20px'>
            <Text fontWeight='600'>Voturi exprimate</Text>
            <CircularProgress value={usersLength? (userSubmissionsLength / usersLength * 100) : 0} size='120px' thickness={8}>
                <CircularProgressLabel fontSize={circleProgressFontSize}>{userSubmissionsLength}</CircularProgressLabel>
            </CircularProgress>
            <Text fontWeight='500'> Dintr-un total de <Tag fontWeight='semibold'>{usersLength}</Tag> voturi posibile</Text>
            <Button colorScheme='green' px='25px' mt='10px' onClick={props.data.stopVoteHandler}><Text mb='3px'>Stop vot</Text></Button>
        </Center>
    )
}

export default AdminVoteProgressCircle;