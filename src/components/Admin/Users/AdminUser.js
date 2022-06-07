import { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup'
import { Controller, useForm } from "react-hook-form";
import { Box, Button, Center, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, Input, Select, Text, Textarea } from "@chakra-ui/react";

const validationSchema = object({
    first_name: string()
        .required("Prenumele este obligatoriu")
        .max(60, 'Lungimea maximă este de 60 de caractere'),

    last_name: string()
        .required("Numele este obligatoriu")
        .max(60, 'Lungimea maximă este de 60 de caractere'),

    email: string()
        .required("Mailul este obligatoriu")
        .email("Mail invalid")
})

function AdminUser(props) {
    const user = props.data.user;
    const availableGroups = props.data.availableGroups;

    const [isLoading, setIsLoading] = useState(false);

    let initialValues = {
        first_name: '',
        last_name: '',
        group: null,
        is_staff: false,
        email: '',
    }

    if (props.data.updateExisting) {
        initialValues = {
            first_name: user.first_name,
            last_name: user.last_name,
            group: user.group? user.group.id : null,
            is_staff: user.is_staff,
            email: user.email,
        }
    }

    const { register, handleSubmit, setValue, getValues, formState: { errors, isValid, isDirty }, control } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
    });

    return (
        <form onSubmit={handleSubmit(props.data.submitForm)} autoComplete="off">

            {/* Header */}
            <Box mb='40px'>
                <Text fontSize='xl' color='gray.900'>{props.data.updateExisting? "Editează" : "Adaugă" } un user.</Text>
                <Text fontSize='md' color='gray.500'>{props.data.updateExisting? "Editează" : "Completează" } câmpurile dorite pentru a updata detaliile userului.</Text>
            </Box>

            {/* Last name field */}
            <FormControl isInvalid={!!errors?.last_name?.message} mb='15px' isRequired>
                <FormLabel fontWeight="600" htmlFor="last_name">Nume</FormLabel>
                <Input id="last-name" {...register('last_name')}/>
                <FormErrorMessage>{errors?.last_name?.message}</FormErrorMessage>
            </FormControl>
            

            {/* First name field */}
            <FormControl isInvalid={!!errors?.first_name?.message} mb='15px' isRequired>
                <FormLabel fontWeight="600" htmlFor="first_name">Prenume</FormLabel>
                <Input id="first_name" {...register('first_name')}/>
                <FormErrorMessage>{errors?.first_name?.message}</FormErrorMessage>
            </FormControl>


            {/* First name field */}
            <FormControl isInvalid={!!errors?.email?.message} mb='15px' isRequired>
                <FormLabel fontWeight="600" htmlFor="email">Mail</FormLabel>
                <Input id="email" {...register('email')}/>
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>


            {/* Group */}
            <FormControl w='wrap-content' mb='15px'>
                <FormLabel fontWeight="600" htmlFor='group' w='12rem'>Grup</FormLabel>
                <Controller
                    control={control}
                    name='group'
                    render={({ field: { onChange, onBlur, ref } }) => (
                        <Select onChange={(event) => {setValue('group', event.target.value, { shouldDirty: true });}} onBlur={onBlur} ref={ref} value={getValues(`group`)} name='group' id='group'>
                            <option key={0} value="null">Fără Grup</option>
                            {availableGroups.map((group, index) => (
                                <option key={index + 1} value={group.id}>{group.name}</option>
                            ))}
                        </Select>
                    )}
                />
            </FormControl>


            {/* Is staff */}
            <FormControl mb='35px'>
                <FormLabel fontWeight="600" htmlFor="is_staff">Admin</FormLabel>
                <Checkbox id="is_staff" {...register("is_staff")}/>
            </FormControl>
            
            
            {/* Submit button if create vote*/}
            {!props.data.updateExisting &&
                <Center mt="40px">
                    <Button
                        isLoading={isLoading}
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
                        onClick={props.data.handleDelete}
                    >
                        <Text mb='3px'>
                            Șterge
                        </Text>
                    </Button>

                    {/* Add a new vote button */}
                    <Button
                        isLoading={isLoading}
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

export default AdminUser;