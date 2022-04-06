import { Center, FormControl, FormErrorMessage, FormLabel, Input, Text, Textarea } from "@chakra-ui/react";
import { Fragment } from "react";

function CreateVoteGeneralInformation(props) {
    return (
        <Fragment>
            <Center>
                <Text fontSize='2xl' mb='20px' fontWeight="600">Informații generale</Text>
            </Center>

            {/* TODO add this format to login page*/}
            {/* Title field */}
            <FormControl isInvalid={!!props.errors?.title?.message} mb='15px' isRequired>
                <FormLabel fontWeight="600" htmlFor="title">Titlu</FormLabel>
                <Input id="title" {...props.register('title')}/>
                <FormErrorMessage>{props.errors?.title?.message}</FormErrorMessage>
            </FormControl>
            

            {/* Description field */}
            <FormControl isInvalid={!!props.errors?.description?.message} mb='15px'>
                <FormLabel fontWeight="600" htmlFor="description">Descriere</FormLabel>
                <Textarea id="description" {...props.register('description')}/>
                <FormErrorMessage>{props.errors?.description?.message}</FormErrorMessage>
            </FormControl>
        </Fragment>
    )
};

export default CreateVoteGeneralInformation;