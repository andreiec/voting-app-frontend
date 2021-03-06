import { Flex, Text } from "@chakra-ui/react";

function AdminVoteTitle(props) {
    return (
        <Flex
            flexDir='column'
            alignItems='center'
            flexWrap='wrap'
            {...props.rest}
        >
            <Text
                fontSize='2xl'
                color='gray.900'
                fontWeight='600'
            >
                {props.data.title}
            </Text>

            <Text
                fontSize='base'
                color='gray.500'
                fontWeight='400'
            >
                {props.data.description}
            </Text>

            <Text
                fontSize='base'
                color='gray.500'
                fontWeight='400'
                mt='10px'
            >
                {(new Date(props.data.voting_starts_at)).toISOString().split('T')[0]}
            </Text>

        </Flex>
    )
}

export default AdminVoteTitle;