import { Text, Box } from "@chakra-ui/react";

function VoteQuestion(props) {
    console.log(props)
    return (
        <Box display={props.display}>
            <Text>{props.data.title}</Text>
            <Text>{props.data.description}</Text>
        </Box>
    )
}

export default VoteQuestion;