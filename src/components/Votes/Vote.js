import { Box, Button, Icon, Text } from "@chakra-ui/react";
import { useState } from "react";
import VoteQuestion from "./VoteQuestion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

function Vote(props) {
    const [activeQuestion, setActiveQuestion] = useState(0);

    function displayQuestion(question) {
        return (
            <VoteQuestion
                key={question.id}
                data={question}
                display={question.order === activeQuestion}
            />
        )
    }

    return (
        <Box bg='brand.white' borderRadius='15px' p='30px' boxShadow='sm'>
            <Text fontSize='xl' color='brand.text_title'>{props.data.title}</Text>
            <Text fontSize='base' color='brand.text_body'>{props.data.description}</Text>

            {displayQuestion(props.data.questions[activeQuestion])}

            <Button
                disabled={activeQuestion <= 0}
                onClick={() => {setActiveQuestion((activeQuestion) => activeQuestion - 1 )}}
                >
                <Icon as={FaArrowLeft} />
            </Button>

            <Button
                disabled={activeQuestion >= props.data.number_of_polls - 1}
                onClick={() => {setActiveQuestion((activeQuestion) => activeQuestion + 1)}}
            >
                <Icon as={FaArrowRight} />
            </Button>

        </Box>
    )
}

export default Vote;