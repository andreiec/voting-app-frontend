import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup'
import { useForm } from "react-hook-form";
import { Box, Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import CustomAlertDialog from "../../Misc/CustomAlertDialog";

const validationSchema = object({
    name: string()
        .required()
        .min(2, 'Lungimea minimă este de 2 caractere')
        .max(127, 'Lungimea maximă este de 127 de caractere'),

    description: string()
        .max(2047, 'Lungimea maximă este de 2047 de caractere'),
})

function AdminGroup(props) {
    const group = props.data.group;

    // Alert dialog logic
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [color, setColor] = useState(props.data.updateExisting? group.color : '#ffffff');

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

    const { register, handleSubmit, setValue, formState: { errors, isValid, isDirty } } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
    });

    return (
        <form onSubmit={handleSubmit(props.data.submitForm)} autoComplete="off">

            {/* Header */}
            <Box mb='40px'>
                <Text fontSize='xl' color='gray.900'>{props.data.updateExisting? "Editează" : "Adaugă" } un grup.</Text>
                <Text fontSize='md' color='gray.500'>{props.data.updateExisting? "Editează" : "Completează" } câmpurile dorite pentru a updata detaliile grupului.</Text>
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
            
            {/* Submit button if create group */}
            {!props.data.updateExisting &&
                <Center mt="40px">
                    <Button
                        colorScheme="green"
                        color="white"
                        fontWeight="400"
                        type="submit"
                        disabled={!(isValid && isDirty)}
                    >
                        Finalizează
                    </Button>
                </Center>
            }

            {/* Submit and delete button if update vote*/}
            {props.data.updateExisting &&
                <Flex 
                    mx={{base: '30px', md: '0px'}}
                    flexDir={{base: 'column', md: 'row'}}
                    gap='15px' mt='40px'
                    justifyContent='space-between'>
                    
                    <Button
                        colorScheme='red'
                        float={{base: "none", md:'right'}}
                        w={{base: "100%", md: '120px'}}
                        onClick={onOpen}
                    >
                        <Text mb='3px'>
                            Șterge
                        </Text>
                    </Button>

                    <CustomAlertDialog
                        onOpen={onOpen}
                        onClose={onClose}
                        isOpen={isOpen}
                        handleAlertConfirm={props.data.handleDelete}
                        data={{
                            title: "Confirmă ștergerea.",
                            body: "Ești sigur că vrei să ștergi grupul?",
                            leftButtonText: "Închide",
                            rightButtonText: "Șterge",
                            rightButtonColorScheme: "red",
                        }} />

                    {/* Add a new vote button */}
                    <Button
                        colorScheme="green"
                        color="white"
                        fontWeight="400"
                        type="submit"
                        disabled={!(isValid && isDirty)}
                    >
                        Finalizează
                    </Button>


                </Flex>
            }
        </form>
    )
}

export default AdminGroup;