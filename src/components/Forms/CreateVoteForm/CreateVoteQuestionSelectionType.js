import { Flex, FormControl, FormErrorMessage, FormLabel, NumberInput, NumberInputField, Select } from "@chakra-ui/react";
import { Field } from "formik";

function CreateVoteQuestionSelectionType(props) {

    const index = props.index_question;
    const errors = props.errors.questions;
    const values = props.values.questions;
    const touched = props.touched.questions;

    return (
        <Flex flexDir={{ base:'column', md: 'row' }} justifyContent="space-between" flexWrap='wrap'>

            {/* Question selection type */}
            <FormControl w='wrap-content'>
                <FormLabel fontWeight="600" htmlFor={`questions.${index}.selection_type`} w='12rem'>Selectează tipul întrebării</FormLabel>
                <Field as={Select} id={`questions.${index}.selection_type`} name={`questions.${index}.selection_type`} mb='15px' w='10rem'>
                    <option value="single">Simplă</option>
                    <option value="multiple">Multiplă</option>
                </Field>
            </FormControl>

            <Flex flexDir={{base:'column', md:'row'}} wrap='wrap'>

                {/* Question min selections */}
                <FormControl isInvalid={!!errors && !!touched && errors[index]?.min_selections && touched[index]?.min_selections} mb='15px' w='9rem' mr='15px'>
                    <FormLabel fontWeight="600" htmlFor={`questions.${index}.min_selections`} w='12rem'>Selecții minime</FormLabel>
                    <NumberInput value={values[index].min_selections} defaultValue={values[index].min_selections} isDisabled={values[index].selection_type === 'single'}>
                        <Field as={NumberInputField} id={`questions.${index}.min_selections`} name={`questions.${index}.min_selections`}/>
                    </NumberInput>
                    <FormErrorMessage>{!!errors && errors[index]?.min_selections}</FormErrorMessage>
                </FormControl>


                {/* Question max selections */}
                <FormControl isInvalid={!!errors && !!touched && errors[index]?.max_selections && touched[index]?.max_selections} mb='15px' w='9rem'>
                    <FormLabel fontWeight="600" htmlFor={`questions.${index}.max_selections`} w='12rem'>Selecții maxime</FormLabel>
                    <NumberInput value={values[index].max_selections} defaultValue={values[index].max_selections} isDisabled={values[index].selection_type === 'single'}>
                        <Field as={NumberInputField} id={`questions.${index}.max_selections`} name={`questions.${index}.max_selections`}/>
                    </NumberInput>
                    <FormErrorMessage>{!!errors && errors[index]?.max_selections}</FormErrorMessage>
                </FormControl>

            </Flex>
        </Flex>
    )
};

export default CreateVoteQuestionSelectionType;