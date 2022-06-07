import { Box, Flex, Text } from "@chakra-ui/react";
import GroupTitle from "./GroupTitle"
import GroupUsersTable from "./GroupUsersTable";

function Group(props) {
    return (
        <Flex flexDir='column' alignItems='center'>
            <GroupTitle data={{name: props.data.group.name, description: props.data.group.description}} />
            <Text fontSize='xs' mt='20px' fontWeight='700' color='gray.600'>CULOARE</Text>
            <Box w='70px' h='20px' bg={props.data.group.color} mt='3px' mb='90px' />
            <GroupUsersTable data={{ users: props.data.users }} />
        </Flex>
    )
}

export default Group;