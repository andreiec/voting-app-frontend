import { Flex, Text } from "@chakra-ui/react";

function VoteFormTitle(props) {
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
                {props.title}
            </Text>

            <Text
                fontSize='base'
                color='gray.500'
                fontWeight='400'
            >
                {props.description}
            </Text>

        </Flex>
    )
}

export default VoteFormTitle;