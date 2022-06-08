import { Box, Flex, Button, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa";
import CustomAlertDialog from "../Misc/CustomAlertDialog";

function VoteFormControl(props) {

    // Alert dialog logic
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box {...props.rest}>
            <Flex flexDir={{base:'column', lg:'row'}} justifyContent='space-between' flexWrap='wrap' alignItems='center' rowGap='30px'>
                <Box w='125px' visibility='hidden'></Box>

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
                    boxShadow="base"
                    onClick={onOpen}
                    colorScheme='green'
                    px='23px'
                    form={props.formID}
                    disabled={!(props.isDirty && props.isValid)}
                >
                    <Flex flexDir='row'>
                        <Icon as={FaCheck} pt='2px'></Icon>
                        <Text display="inline" mt='-2px' ml='6px'>Votează</Text>
                    </Flex>
                </Button>

                <CustomAlertDialog
                    onOpen={onOpen}
                    onClose={onClose}
                    isOpen={isOpen}
                    handleAlertConfirm={props.handleVote}
                    data={{
                        title: "Confirmă votul.",
                        body: "Ești sigur că vrei să confirmi votul?",
                        leftButtonText: "Închide",
                        rightButtonText: "Confirmă",
                        rightButtonColorScheme: "green",
                    }}
                />
            </Flex>
        </Box>
    );
}

export default VoteFormControl;
