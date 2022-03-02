import { Box, Button, Icon } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function VoteFormControl(props) {
    return (
        <Box mt="30px">
            <Button
                disabled={props.activeQuestion <= 0}
                onClick={() => {
                    props.setActiveQuestion((activeQuestion) => activeQuestion - 1);
                }}
            >
                <Icon as={FaArrowLeft} />
            </Button>

            <Button
                disabled={props.activeQuestion >= props.number_of_polls - 1}
                onClick={() => {
                    props.setActiveQuestion((activeQuestion) => activeQuestion + 1);
                }}
            >
                <Icon as={FaArrowRight} />
            </Button>

            <Button type="submit" bg="brand.green" color="brand.white" _hover={{ bg: "brand.green_light" }}>
                Votează
            </Button>
        </Box>
    );
}

export default VoteFormControl;
