import { Box, Button, Center, FormControl, FormErrorMessage, FormLabel, Input, StackDivider, Text, Textarea, VStack } from "@chakra-ui/react";
import { Fragment } from "react";
import { useFieldArray } from "react-hook-form";
import CreateVoteQuestionOptions from "./CreateVoteQuestionOptions";
import CreateVoteQuestionSelectionType from "./CreateVoteQuestionSelectionType";


const emptyQuestion = {
    title: '',
    description: '',
    selection_type: 'single',
    min_selections: '1',
    max_selections: '1',
    order: 0,
    options: [
        {
            value: '',
            order: 0,
        },
    ]
}

function CreateVoteQuestions(props) {

    const errors = props.errors?.questions;

    const { fields, append, remove } = useFieldArray({
        control: props.control,
        name: 'questions',
    })

    return (
        <Fragment>

            {/* Header */}
            <Center mb='50px'>
                <Text fontSize='2xl' fontWeight="600">Întrebari</Text>
            </Center>

            {/* Dynamic Form */}
            <VStack divider={<StackDivider borderColor='gray.200'/>} gap={10} align='stretch'>
                {fields.map((_, index_question) => (
                    <Box key={index_question}>
                        <Text fontSize='xl' mb='20px' fontWeight="600">{`Întrebarea ${index_question + 1}`}</Text>

                        {/* Question title */}
                        <FormControl isInvalid={!!errors && errors[index_question]?.title?.message} mb='15px' isRequired>
                            <FormLabel fontWeight="600" htmlFor={`questions.${index_question}.title`}>Titlu</FormLabel>
                            <Input id={`questions.${index_question}.title`} {...props.register(`questions.${index_question}.title`)} />
                            <FormErrorMessage>{!!errors && errors[index_question]?.title?.message}</FormErrorMessage>
                        </FormControl>


                        {/* Question description */}
                        <FormControl isInvalid={!!errors && errors[index_question]?.description?.message} mb='15px'>
                            <FormLabel fontWeight="600" htmlFor={`questions.${index_question}.description`}>Descriere</FormLabel>
                            <Textarea id={`questions.${index_question}.description`} {...props.register(`questions.${index_question}.description`)}/>
                            <FormErrorMessage>{!!errors && errors[index_question]?.description?.message}</FormErrorMessage>
                        </FormControl>


                        {/* Question Selection type */}
                        <CreateVoteQuestionSelectionType index_question={index_question} control={props.control} errors={props.errors} register={props.register} getValues={props.getValues} setValue={props.setValue} trigger={props.trigger}/>


                        {/* Question options dynamic form */}
                        <CreateVoteQuestionOptions index_question={index_question} control={props.control} errors={props.errors} register={props.register} getValues={props.getValues}/>


                        {/* Delete question button */}
                        <Button fontWeight='400' colorScheme='red' color='white' float='right' mt='30px' onClick={() => remove(index_question)} onMouseDown={(e) => e.preventDefault()}>Șterge întrebarea</Button>
                    </Box>
                ))}

                <Center>
                    <Button w='wrap-content' type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => append(emptyQuestion)}>Adaugă o întrebare</Button>
                </Center>
                
            </VStack>
        </Fragment>
    )
};

export default CreateVoteQuestions;