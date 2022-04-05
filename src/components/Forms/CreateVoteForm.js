import { Box, FormControl, FormErrorMessage, FormLabel, Input, Text, Textarea, Button, Center, Flex, Select, NumberInputField, NumberInput, Divider, VStack, StackDivider } from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";
import { useState } from "react";
import { object, number, string, boolean, array } from 'yup'


const emptyOption = {
    value: '',
    order: 0,
}

const emptyQuestion = {
    title: '',
    description: '',
    selection_type: 'single',
    min_selections: 1,
    max_selections: 1,
    order: 0,
    options: [
        emptyOption
    ]
}


function CreateVoteForm() {

    const [isLoading, setIsLoading] = useState(false);

    return (
        <Formik 
            initialValues={{
                title: '',
                description: '',
                number_of_polls: 1,
                questions: [emptyQuestion],
            }}
            validationSchema={object({
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
            })}
            onSubmit={(values) => {
                console.log(values)
            }}
        >

            {({ values, errors, dirty, isValid, touched }) => (
                <Form autoComplete="off">
                {console.log(errors)}
                    <Flex 
                        flexDir='column'
                    >
                        {/* Header */}
                        <Box mb='40px'>
                            <Text fontSize='xl' color='brand.text_title'>Creează un vot.</Text>
                            <Text fontSize='md' color='brand.text_body'>Adaugă câmpurile dorite și opțiunile pentru fiecare întrebare.</Text>
                        </Box>

                        <Center>
                            <Text fontSize='xl' mb='20px' fontWeight="600">Informații generale</Text>
                        </Center>

                        {/* TODO add this format to login page*/}
                        {/* Title field */}
                        <FormControl isInvalid={!!errors.title && touched.title} mb='15px' isRequired>
                            <FormLabel fontWeight="600" htmlFor="title">Titlu</FormLabel>
                            <Field as={Input} id="title" name="title" />
                            <FormErrorMessage>{errors.title}</FormErrorMessage>
                        </FormControl>
                        

                        {/* Description field */}
                        <FormControl isInvalid={!!errors.description && touched.description} mb='15px'>
                            <FormLabel fontWeight="600" htmlFor="description">Descriere</FormLabel>
                            <Field as={Textarea} id="description" name="description" />
                            <FormErrorMessage>{errors.description}</FormErrorMessage>
                        </FormControl>
                        
                        <Divider mb='40px' mt='20px'/>

                        <Center mb='30px'>
                            <Text fontSize='xl' mb='20px' fontWeight="600">Întrebari</Text>
                        </Center>

                        {/* Dynamic form */}
                        <FieldArray name="questions">
                            {({ push, remove, }) => (
                                <VStack divider={<StackDivider borderColor='gray.200'/>} gap={10} align='stretch'>
                                    {values.questions.map((_, index_question) => (
                                        <Box key={index_question}>
                                            <Text fontSize='md' mb='20px' fontWeight="600">{`Întrebarea ${index_question + 1}`}</Text>

                                            {/* Question title */}
                                            <FormControl isInvalid={!!errors.questions && !!touched.questions && errors.questions[index_question]?.title && touched.questions[index_question]?.title} mb='15px' isRequired>
                                                <FormLabel fontWeight="600" htmlFor={`questions.${index_question}.title`}>Titlu</FormLabel>
                                                <Field as={Input} id={`questions.${index_question}.title`} name={`questions.${index_question}.title`} />
                                                <FormErrorMessage>{!!errors.questions && errors.questions[index_question]?.title}</FormErrorMessage>
                                            </FormControl>


                                            {/* Question description */}
                                            <FormControl isInvalid={!!errors.questions && !!touched.questions && errors.questions[index_question]?.description && touched.questions[index_question]?.description} mb='15px'>
                                                <FormLabel fontWeight="600" htmlFor={`questions.${index_question}.description`}>Descriere</FormLabel>
                                                <Field as={Textarea} id={`questions.${index_question}.description`} name={`questions.${index_question}.description`} />
                                                <FormErrorMessage>{!!errors.questions && errors.questions[index_question]?.description}</FormErrorMessage>
                                            </FormControl>


                                            <Flex flexDir={{ base:'column', md: 'row' }} justifyContent="space-between" flexWrap='wrap'>

                                                {/* Question selection type */}
                                                <FormControl w='wrap-content'>
                                                    <FormLabel fontWeight="600" htmlFor={`questions.${index_question}.selection_type`} w='12rem'>Selectează tipul întrebării</FormLabel>
                                                    <Field as={Select} id={`questions.${index_question}.selection_type`} name={`questions.${index_question}.selection_type`} mb='15px' w='10rem'>
                                                        <option value="single">Simplă</option>
                                                        <option value="multiple">Multiplă</option>
                                                    </Field>
                                                </FormControl>

                                                <Flex flexDir={{base:'column', md:'row'}} wrap='wrap'>

                                                    {/* Question min selections */}
                                                    <FormControl isInvalid={!!errors.questions && !!touched.questions && errors.questions[index_question]?.min_selections && touched.questions[index_question]?.min_selections} mb='15px' w='9rem' mr='15px'>
                                                        <FormLabel fontWeight="600" htmlFor={`questions.${index_question}.min_selections`} w='12rem'>Selecții minime</FormLabel>
                                                        <NumberInput defaultValue={values.questions[index_question].min_selections} isDisabled={values.questions[index_question].selection_type === 'single'}>
                                                            <Field as={NumberInputField} id={`questions.${index_question}.min_selections`} name={`questions.${index_question}.min_selections`}/>
                                                        </NumberInput>
                                                        <FormErrorMessage>{!!errors.questions && errors.questions[index_question]?.min_selections}</FormErrorMessage>
                                                    </FormControl>


                                                    {/* Question max selections */}
                                                    <FormControl isInvalid={!!errors.questions && !!touched.questions && errors.questions[index_question]?.max_selections && touched.questions[index_question]?.max_selections} mb='15px' w='9rem'>
                                                        <FormLabel fontWeight="600" htmlFor={`questions.${index_question}.max_selections`} w='12rem'>Selecții maxime</FormLabel>
                                                        <NumberInput defaultValue={values.questions[index_question].max_selections} isDisabled={values.questions[index_question].selection_type === 'single'}>
                                                            <Field as={NumberInputField} id={`questions.${index_question}.max_selections`} name={`questions.${index_question}.max_selections`}/>
                                                        </NumberInput>
                                                        <FormErrorMessage>{!!errors.questions && errors.questions[index_question]?.max_selections}</FormErrorMessage>
                                                    </FormControl>

                                                </Flex>
                                            </Flex> 

                                            {/* Delete question button */}
                                            <Button fontWeight='400' bg='brand.red' color='brand.white' float='right' mt='30px' _hover={{bg: 'brand.red_dark'}} onClick={() => remove(index_question)}>Șterge întrebarea</Button>
                                        </Box>
                                    ))}

                                    <Center>
                                        <Button w='wrap-content' onClick={() => push(emptyQuestion)}>Adaugă o întrebare</Button>
                                    </Center>
                                    
                                </VStack>
                            )}
                        </FieldArray>
                        

                        {/* Submit button */}
                        <Center mt="80px">
                            <Button
                                isLoading={isLoading}
                                bg="brand.green"
                                _hover={{ bg: "brand.green_light" }}
                                color="brand.white"
                                fontWeight="400"
                                type="submit"
                                disabled={!(isValid && dirty)}
                            >
                                Finalizează
                            </Button>
                        </Center>


                        <pre><Box mt='10rem'>{JSON.stringify({ values, errors }, null, 4)}</Box></pre>
                    </Flex>
                </Form>
            )}
        </Formik>
    )
}

export default CreateVoteForm;
