import { Box, FormControl, Checkbox, CheckboxGroup, FormErrorMessage, FormLabel, Input, Text, Textarea, Button, Center, Flex, Select, NumberInputField, NumberInput, Divider, VStack, StackDivider, InputLeftAddon, InputGroup, InputRightAddon, CloseButton } from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik, } from "formik";
import { useState } from "react";
import { object, number, string, boolean, array } from 'yup'
import CreateVoteGeneralInformation from "./CreateVoteGeneralInformation";
import CreateVoteGroups from "./CreateVoteGroups";
import CreateVoteQuestions from "./CreateVoteQuestions";


const initialValues = {
    title: '',
    description: '',
    questions: [{
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
    }],
    groups: [],
}

const validationSchema = object({
    title: string()
        .required('Titul este obligatoriu.')
        .min(4, 'Lungimea minimă este de 4 caractere.')
        .max(255, 'Lungimea maximă este de 255 de caractere.'),

    description: string()
        .max(2047, 'Lungimea maximă este de 2048 de caractere.'),

    number_of_polls: number()
        .min(0)
        .max(50),

    // Question validation schema
    questions: array(object({
        title: string()
            .required('Titul este obligatoriu.')
            .min(4, 'Lungimea minimă este de 4 caractere.')
            .max(255, 'Lungimea maximă este de 255 de caractere.'),

        description: string()
            .max(2047, 'Lungimea maximă este de 2048 de caractere.'),

        min_selections: number()
            .min(1)
            .max(100),

        max_selections: number()
            .min(1)
            .max(100),
        
        options: array(object({
            value: string()
                .required()
        }))
            .min(1)
            .max(100),
    }))
        .min(1)
        .max(3),
    groups: array().min(1),
})


function CreateVoteForm(props) {

    const [isLoading, setIsLoading] = useState(false);
    const groups = props.data.groups;

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema}>
            {({ values, errors, dirty, isValid, touched, setFieldValue }) => (
                <Form autoComplete="off">
                    <Flex flexDir='column' >

                        {/* Header */}
                        <Box mb='40px'>
                            <Text fontSize='xl' color='brand.text_title'>Creează un vot.</Text>
                            <Text fontSize='md' color='brand.text_body'>Adaugă câmpurile dorite și opțiunile pentru fiecare întrebare.</Text>
                        </Box>


                        {/* General Information */}
                        <CreateVoteGeneralInformation errors={errors} touched={touched}/>
                        <Divider mb='40px' mt='20px'/>


                        {/* Groups */}
                        <CreateVoteGroups groups={groups} setFieldValue={setFieldValue}/>
                        <Divider my='40px'/>


                        {/* Questions dynamic form */}
                        <CreateVoteQuestions values={values} errors={errors} touched={touched} />
                        

                        {/* Submit button */}
                        <Center mt="80px">
                            <Button
                                isLoading={isLoading}
                                colorScheme="green"
                                color="brand.white"
                                fontWeight="400"
                                type="submit"
                                disabled={!(isValid && dirty)}
                            >
                                Finalizează
                            </Button>
                        </Center>


                        {/*<pre><Box mt='10rem'>{JSON.stringify({ values, errors }, null, 4)}</Box></pre>*/}
                    </Flex>
                </Form>
            )}
        </Formik>
    )
}

export default CreateVoteForm;
