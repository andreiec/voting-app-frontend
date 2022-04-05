import { Center, FormControl, FormErrorMessage, FormLabel, Input, Text, Textarea } from "@chakra-ui/react";
import { Field } from "formik";
import { Fragment } from "react";

function CreateVoteGeneralInformation(props) {
    return (
        <Fragment>
            <Center>
                <Text fontSize='2xl' mb='20px' fontWeight="600">Informații generale</Text>
            </Center>

            {/* TODO add this format to login page*/}
            {/* Title field */}
            <FormControl isInvalid={!!props.errors.title && props.touched.title} mb='15px' isRequired>
                <FormLabel fontWeight="600" htmlFor="title">Titlu</FormLabel>
                <Field as={Input} id="title" name="title" />
                <FormErrorMessage>{props.errors.title}</FormErrorMessage>
            </FormControl>
            

            {/* Description field */}
            <FormControl isInvalid={!!props.errors.description && props.touched.description} mb='15px'>
                <FormLabel fontWeight="600" htmlFor="description">Descriere</FormLabel>
                <Field as={Textarea} id="description" name="description" />
                <FormErrorMessage>{props.errors.description}</FormErrorMessage>
            </FormControl>
        </Fragment>
    )
};

export default CreateVoteGeneralInformation;