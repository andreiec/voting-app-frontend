import { Box, Text, Button, Center, CloseButton, Input, InputGroup, InputLeftAddon, InputRightAddon, VStack, } from "@chakra-ui/react";
import { Fragment } from "react";
import { useFieldArray } from "react-hook-form";

const emptyOption = {
    value: '',
    order: 0,
}

function CreateVoteQuestionOption(props) {

    const { append, remove } = useFieldArray({
        control: props.control,
        name: `questions.${props.index_question}.options`,
    })

    const fields = props.getValues(`questions.${props.index_question}.options`);

    return (
        <Fragment>
            {/* Header */}
            <Text fontSize='xl' my='20px' fontWeight="600">Opțiuni</Text>

            {/* Dynamic form */}
            <VStack align='stretch'>
                {fields.map((_, index_question_option) => (
                    <Box key={index_question_option}>
                        <InputGroup>
                            <InputLeftAddon children={index_question_option + 1} />
                            <Input type='text' placeholder='Opțiune' borderRadius='0' id={`questions.${props.index_question}.options.${index_question_option}.value`} {...props.register(`questions.${props.index_question}.options.${index_question_option}.value`)}/>
                            <InputRightAddon p='0' color='brand.white' children={<CloseButton size='sm' w='2rem' color='gray.900' borderLeftRadius='0' h='100%' onClick={() => remove(index_question_option)} onMouseDown={(e) => e.preventDefault()} />}/>
                        </InputGroup>
                    </Box>
                ))}
            </VStack>
            
            <Center mt='2rem'>
                <Button w='wrap-content' onMouseDown={(e) => e.preventDefault()} onClick={() => append(emptyOption)}>Adaugă o opțune</Button>
            </Center>
        </Fragment>
    )
};

export default CreateVoteQuestionOption;