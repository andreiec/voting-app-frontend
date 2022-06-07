import { Flex, Text } from "@chakra-ui/react";

function GroupTitle(props) {
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
                {props.data.name}
            </Text>

            <Text
                fontSize='base'
                color='gray.500'
                fontWeight='400'
            >
                {props.data.description}
            </Text>
        </Flex>
    )
}

export default GroupTitle;