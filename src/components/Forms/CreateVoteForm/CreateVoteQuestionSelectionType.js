import { Flex, FormControl, FormErrorMessage, FormLabel, Input, NumberInput, NumberInputField, Select } from "@chakra-ui/react";
import { useState } from "react";
import { Controller } from "react-hook-form";

function CreateVoteQuestionSelectionType(props) {

    const index = props.index_question;
    const errors = props.errors.questions;
    
    const [_, setSelectionType] = useState(props.getValues(`questions[${index}].selection_type`));

    return (
        <Flex flexDir={{ base:'column', md: 'row' }} justifyContent="space-between" flexWrap='wrap'>

            {/* Question selection type */}
            <FormControl w='wrap-content' onChange={(event) => {setSelectionType(event.target.value)}}>
                <FormLabel fontWeight="600" htmlFor={`questions.${index}.selection_type`} w='12rem'>Selectează tipul întrebării</FormLabel>
                <Controller
                    control={props.control}
                    name={`questions.${index}.selection_type`}
                    render={({ field: { onChange, onBlur, ref } }) => (
                        <Select onChange={onChange} onBlur={onBlur} ref={ref} value={props.getValues(`questions.${index}.selection_type`)} name={`questions.${index}.selection_type`} id={`questions.${index}.selection_type`} mb='15px' w='10rem'>
                            <option value="single">Simplă</option>
                            <option value="multiple">Multiplă</option>
                        </Select>
                    )}
                />
            </FormControl>

            <Flex flexDir={{base:'column', md:'row'}} wrap='wrap'>

                {/* Question min selections */}
                <FormControl isInvalid={!!errors && errors[index]?.min_selections?.message} mb='15px' w='9rem' mr='15px'>
                    <FormLabel fontWeight="600" htmlFor={`questions.${index}.min_selections`}>Selecții minime</FormLabel>
                        <Controller
                            control={props.control}
                            name={`questions.${index}.min_selections`}
                            render={({ field: { onChange, ref } }) => (
                                <NumberInput onChange={onChange} onBlur={() => {props.trigger(`questions.${index}.max_selections`); props.trigger(`questions.${index}.min_selections`);}} value={parseInt(props.getValues(`questions.${index}.min_selections`))} isDisabled={props.getValues(`questions.${index}.selection_type`) === 'single'}>
                                    <NumberInputField ref={ref} id={`questions.${index}.min_selections`} name={`questions.${index}.min_selections`}/>
                                </NumberInput>
                            )}
                        />
                    {/*<FormErrorMessage>{!!errors && errors[index]?.min_selections?.message}</FormErrorMessage>*/}
                </FormControl>


                {/* Question max selections */}
                <FormControl isInvalid={!!errors && errors[index]?.max_selections?.message} mb='15px' w='9rem'>
                    <FormLabel fontWeight="600" htmlFor={`questions.${index}.max_selections`}>Selecții maxime</FormLabel>
                        <Controller
                            control={props.control}
                            name={`questions.${index}.max_selections`}
                            render={({ field: { onChange, ref } }) => (
                                <NumberInput onChange={onChange} onBlur={() => {props.trigger(`questions.${index}.max_selections`); props.trigger(`questions.${index}.min_selections`);}} value={parseInt(props.getValues(`questions.${index}.max_selections`))} isDisabled={props.getValues(`questions.${index}.selection_type`) === 'single'}>
                                    <NumberInputField ref={ref} id={`questions.${index}.max_selections`} name={`questions.${index}.max_selections`}/>
                                </NumberInput>
                            )}
                        />
                    {/*<FormErrorMessage>{!!errors && errors[index]?.max_selections?.message}</FormErrorMessage>*/}
                </FormControl>
            </Flex>
        </Flex>
    )
};

export default CreateVoteQuestionSelectionType;