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
                color='brand.text_title'
                fontWeight='600'
            >
                {props.title}
            </Text>

            <Text
                fontSize='base'
                color='brand.text_body'
                fontWeight='400'
            >
                {props.description}
            </Text>

        </Flex>
    )
}

export default VoteFormTitle;