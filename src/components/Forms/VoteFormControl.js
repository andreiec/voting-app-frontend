import { Box, Flex, Button, Center, Icon, Text } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa";

function VoteFormControl(props) {
    return (
        <Box {...props.rest}>
            <Flex flexDir={{base:'column', lg:'row'}} justifyContent='space-between' flexWrap='wrap' alignItems='center' rowGap='30px'>
                <Box w='111px' visibility='hidden'></Box>

                <Box>
                    <Button
                        mr="30px"
                        boxShadow="base"
                        disabled={props.activeQuestion <= 0}
                        onClick={() => {
                            props.setActiveQuestion((activeQuestion) => activeQuestion - 1);
                        }}
                    >
                        <Icon as={FaArrowLeft} />
                    </Button>

                    <Button
                        boxShadow="base"
                        disabled={props.activeQuestion >= props.number_of_polls - 1}
                        onClick={() => {
                            props.setActiveQuestion((activeQuestion) => activeQuestion + 1);
                        }}
                    >
                        <Icon as={FaArrowRight} />
                    </Button>
                </Box>

                <Button
                    disabled={props.activeQuestion < props.number_of_polls - 1}
                    boxShadow="base"
                    type="submit"
                    bg="brand.green"
                    color="brand.white"
                    form={props.formID}
                    _hover={{ bg: "brand.green_light" }}
                >
                    <Flex flexDir='row'>
                        <Icon as={FaCheck} pt='2px'></Icon>
                        <Text display="inline" mt='-2px' ml='6px'>Votează</Text>
                    </Flex>
                </Button>
            </Flex>
        </Box>
    );
}

export default VoteFormControl;
