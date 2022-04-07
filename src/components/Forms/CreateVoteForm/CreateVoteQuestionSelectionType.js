import { Flex, FormControl, FormErrorMessage, FormLabel, NumberInput, NumberInputField, Select } from "@chakra-ui/react";
import { useState } from "react";

function CreateVoteQuestionSelectionType(props) {

    const index = props.index_question;
    const errors = props.errors.questions;

    // useState to update min and max selection (might change later)
    const [selectionType, setSelectionType] = useState('single');

    return (
        <Flex flexDir={{ base:'column', md: 'row' }} justifyContent="space-between" flexWrap='wrap'>

            {/* Question selection type */}
            <FormControl w='wrap-content' onChange={(event) => {setSelectionType(event.target.value)}}>
                <FormLabel fontWeight="600" htmlFor={`questions.${index}.selection_type`} w='12rem'>Selectează tipul întrebării</FormLabel>
                <Select id={`questions.${index}.selection_type`} mb='15px' w='10rem'  {...props.register(`questions.${index}.selection_type`)}>
                    <option value="single">Simplă</option>
                    <option value="multiple">Multiplă</option>
                </Select>
            </FormControl>

            <Flex flexDir={{base:'column', md:'row'}} wrap='wrap'>

                {/* Question min selections */}
                <FormControl isInvalid={!!errors && errors[index]?.min_selections?.message} mb='15px' w='9rem' mr='15px'>
                    <FormLabel fontWeight="600" htmlFor={`questions.${index}.min_selections`} w='12rem'>Selecții minime</FormLabel>
                    <NumberInput defaultValue={props.getValues(`questions[${index}].min_selections`)} isDisabled={selectionType === 'single'}>
                        <NumberInputField id={`questions.${index}.min_selections`} {...props.register(`questions.${index}.min_selections`)}/>
                    </NumberInput>
                    <FormErrorMessage>{!!errors && errors[index]?.min_selections?.message}</FormErrorMessage>
                </FormControl>


                {/* Question max selections */}
                <FormControl isInvalid={!!errors && errors[index]?.max_selections?.message} mb='15px' w='9rem'>
                    <FormLabel fontWeight="600" htmlFor={`questions.${index}.max_selections`} w='12rem'>Selecții maxime</FormLabel>
                    <NumberInput defaultValue={props.getValues(`questions[${index}].max_selections`)} isDisabled={selectionType === 'single'}>
                        <NumberInputField id={`questions.${index}.max_selections`} {...props.register(`questions.${index}.max_selections`)}/>
                    </NumberInput>
                    <FormErrorMessage>{!!errors && errors[index]?.max_selections?.message}</FormErrorMessage>
                </FormControl>

            </Flex>
        </Flex>
    )
};

export default CreateVoteQuestionSelectionType;