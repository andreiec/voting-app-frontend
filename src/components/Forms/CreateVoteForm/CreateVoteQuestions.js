import { Box, Button, Center, FormControl, FormErrorMessage, FormLabel, Input, StackDivider, Text, Textarea, VStack } from "@chakra-ui/react";
import { Field, FieldArray } from "formik";
import { Fragment } from "react";
import CreateVoteQuestionOptions from "./CreateVoteQuestionOptions";
import CreateVoteQuestionSelectionType from "./CreateVoteQuestionSelectionType";


const emptyQuestion = {
    title: '',
    description: '',
    selection_type: 'single',
    min_selections: 1,
    max_selections: 1,
    order: 0,
    options: [
        {
            value: '',
            order: 0,
        },
    ]
}

function CreateVoteQuestions(props) {

    const errors = props.errors.questions;
    const values = props.values.questions;
    const touched = props.touched.questions;

    return (
        <Fragment>

            {/* Header */}
            <Center mb='50px'>
                <Text fontSize='2xl' fontWeight="600">Întrebari</Text>
            </Center>

            {/* Dynamic Form */}
            <FieldArray name="questions">
                {({ push, remove, }) => (
                    <VStack divider={<StackDivider borderColor='gray.200'/>} gap={10} align='stretch'>
                        {values.map((_, index_question) => (
                            <Box key={index_question}>
                                <Text fontSize='xl' mb='20px' fontWeight="600">{`Întrebarea ${index_question + 1}`}</Text>

                                {/* Question title */}
                                <FormControl isInvalid={!!errors && !!touched && errors[index_question]?.title && touched[index_question]?.title} mb='15px' isRequired>
                                    <FormLabel fontWeight="600" htmlFor={`questions.${index_question}.title`}>Titlu</FormLabel>
                                    <Field as={Input} id={`questions.${index_question}.title`} name={`questions.${index_question}.title`} />
                                    <FormErrorMessage>{!!errors && errors[index_question]?.title}</FormErrorMessage>
                                </FormControl>


                                {/* Question description */}
                                <FormControl isInvalid={!!errors && !!touched && errors[index_question]?.description && touched[index_question]?.description} mb='15px'>
                                    <FormLabel fontWeight="600" htmlFor={`questions.${index_question}.description`}>Descriere</FormLabel>
                                    <Field as={Textarea} id={`questions.${index_question}.description`} name={`questions.${index_question}.description`} />
                                    <FormErrorMessage>{!!errors && errors[index_question]?.description}</FormErrorMessage>
                                </FormControl>


                                {/* Question Selection type */}
                                <CreateVoteQuestionSelectionType index_question={index_question} values={props.values} errors={props.errors} touched={props.touched} />


                                {/* Question options dynamic form */}
                                <CreateVoteQuestionOptions index_question={index_question} values={props.values} errors={props.errors} touched={props.touched}/>


                                {/* Delete question button */}
                                <Button fontWeight='400' colorScheme='red' color='brand.white' float='right' mt='30px' onClick={() => remove(index_question)}>Șterge întrebarea</Button>
                            </Box>
                        ))}

                        <Center>
                            <Button w='wrap-content' onClick={() => push(emptyQuestion)}>Adaugă o întrebare</Button>
                        </Center>
                        
                    </VStack>
                )}
            </FieldArray>
        </Fragment>
    )
};

export default CreateVoteQuestions;