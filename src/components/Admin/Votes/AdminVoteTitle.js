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
                color='brand.text_title'
                fontWeight='600'
            >
                {props.data.title}
            </Text>

            <Text
                fontSize='base'
                color='brand.text_body'
                fontWeight='400'
            >
                {props.data.description}
            </Text>

            <Text
                fontSize='base'
                color='brand.text_body'
                fontWeight='400'
            >
                {(new Date(props.data.created)).toISOString().split('T')[0]}
            </Text>

        </Flex>
    )
}

export default AdminVoteTitle;