import { Box, Text,  Button, Center, Flex, Divider } from "@chakra-ui/react";
import { useState } from "react";
import { object, number, string, array } from 'yup'
import CreateVoteGeneralInformation from "./CreateVoteGeneralInformation";
import CreateVoteGroups from "./CreateVoteGroups";
import CreateVoteQuestions from "./CreateVoteQuestions";

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";

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

        selection_type: string(),

        min_selections: number()
            .min(1)
            .max(100),

        max_selections: number()
            .min(1)
            .max(100),
        
        options: array(object({
            value: string()
                //.required()
        }))
            .min(1)
            .max(100),
    }))
        .min(1)
        .max(50),
    groups: array().min(1),
})

const submitForm = (data) => {
    console.log(data);
}

function CreateVoteForm(props) {

    const [isLoading, setIsLoading] = useState(false);
    const groups = props.data.groups;

    const { register, handleSubmit, control, setValue, getValues, watch, formState: { errors, isSubmitting, isValid, isDirty } } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
    });

    return (
        <form onSubmit={handleSubmit(submitForm)} autoComplete="off">
            <Flex flexDir='column'>

                {/* Header */}
                <Box mb='40px'>
                    <Text fontSize='xl' color='brand.text_title'>Creează un vot.</Text>
                    <Text fontSize='md' color='brand.text_body'>Adaugă câmpurile dorite și opțiunile pentru fiecare întrebare.</Text>
                </Box>


                {/* General Information */}
                <CreateVoteGeneralInformation errors={errors} register={register} />
                <Divider mb='40px' mt='20px'/>


                {/* Groups */}
                <CreateVoteGroups groups={groups} errors={errors} register={register} setValue={setValue}/>
                <Divider my='40px'/>


                {/* Questions dynamic form */}
                <CreateVoteQuestions errors={errors} control={control} register={register} setValue={setValue} getValues={getValues} watch={watch}/>
                

                {/* Submit button */}
                <Center mt="80px">
                    <Button
                        isLoading={isLoading}
                        colorScheme="green"
                        color="brand.white"
                        fontWeight="400"
                        type="submit"
                        disabled={!(isValid && isDirty)}
                    >
                        Finalizează
                    </Button>
                </Center>
            </Flex>
        </form>
    )
}

export default CreateVoteForm;
