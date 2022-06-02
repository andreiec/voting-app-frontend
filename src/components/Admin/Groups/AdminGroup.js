import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup'
import { useForm } from "react-hook-form";
import { Box, Button, Center, FormControl, FormErrorMessage, FormLabel, Input, Text, Textarea } from "@chakra-ui/react";

const validationSchema = object({
    name: string()
        .required()
        .min(2, 'Lungimea minimă este de 2 caractere')
        .max(127, 'Lungimea maximă este de 127 de caractere'),

    description: string()
        .required()
        .min(4, 'Lungimea minimă este de 4 caractere')
        .max(2047, 'Lungimea maximă este de 2047 de caractere'),
})

function AdminGroup(props) {
    const group = props.data.group;

    const [color, setColor] = useState(props.data.updateExisting? group.color : '#ffffff');
    const [isLoading, setIsLoading] = useState(false);

    let initialValues = {
        name: '',
        description: '',
        color: '#ffffff'
    }

    if (props.data.updateExisting) {
        initialValues = {
            name: group.name,
            description: group.description,
            color: group.color
        }
    }


    const submitForm = (data) => {
        console.log(data)
    }

    const { register, handleSubmit, setValue, formState: { errors, isValid, isDirty } } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
    });

    return (
        <form onSubmit={handleSubmit(submitForm)} autoComplete="off">

            {/* Header */}
            <Box mb='40px'>
                <Text fontSize='xl' color='brand.text_title'>Editează un grup.</Text>
                <Text fontSize='md' color='brand.text_body'>Editează câmpurile dorite pentru a updata detaliile grupului.</Text>
            </Box>

            {/* Title field */}
            <FormControl isInvalid={!!errors?.name?.message} mb='15px' isRequired>
                <FormLabel fontWeight="600" htmlFor="name">Nume</FormLabel>
                <Input id="name" {...register('name')}/>
                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            </FormControl>
            

            {/* Description field */}
            <FormControl isInvalid={!!errors?.description?.message} mb='35px'>
                <FormLabel fontWeight="600" htmlFor="description">Descriere</FormLabel>
                <Textarea id="description" {...register('description')}/>
                <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
            </FormControl>

            {/* Color field */}
            <FormLabel fontWeight="600" htmlFor="color">Culoare</FormLabel>
            <HexColorPicker color={color} onChange={(event) => {setColor(event); setValue('color', event, { shouldDirty: true }); }} />
            
            {/* Submit button */}
            <Center mt="40px">
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
        </form>
    )
}

export default AdminGroup;