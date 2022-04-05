import { Box, Text, Button, Center, CloseButton, Input, InputGroup, InputLeftAddon, InputRightAddon, VStack, } from "@chakra-ui/react";
import { Field, FieldArray } from "formik";
import { Fragment } from "react";

const emptyOption = {
    value: '',
    order: 0,
}

function CreateVoteQuestionOption(props) {
    return (
        <Fragment>
            {/* Header */}
            <Text fontSize='xl' my='20px' fontWeight="600">Opțiuni</Text>

            {/* Dynamic form */}
            <FieldArray name={`questions.${props.index_question}.options`}>
                {({ push: pushOption, remove: removeOption, }) => (
                    <Box>
                        <VStack align='stretch'>
                            {props.values.questions[props.index_question].options.map((_, index_question_option) => (
                                <Box key={index_question_option}>
                                    <InputGroup>
                                        <InputLeftAddon children={index_question_option + 1} />
                                        <Field as={Input} type='text' placeholder='Opțiune' borderRadius='0' id={`questions.${props.index_question}.options.${index_question_option}.value`} name={`questions.${props.index_question}.options.${index_question_option}.value`}/>
                                        <InputRightAddon p='0' color='brand.white' children={<CloseButton size='sm' w='2rem' color='gray.900' borderLeftRadius='0' h='100%' onClick={() => removeOption(index_question_option)} />}/>
                                    </InputGroup>
                                </Box>
                            ))}
                        </VStack>
                        
                        <Center mt='2rem'>
                            <Button w='wrap-content' onClick={() => pushOption(emptyOption)}>Adaugă o opțune</Button>
                        </Center>
                    </Box>
                )}
            </FieldArray>
        </Fragment>
    )
};

export default CreateVoteQuestionOption;