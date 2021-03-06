import { Center, Checkbox, CheckboxGroup, FormControl, FormErrorMessage, Text, VStack } from "@chakra-ui/react";
import { Fragment } from "react";


function CreateVoteGroups(props) {
    return (
        <Fragment>

            {/* Groups header */}
            <Center mb='30px'>
            <Text fontSize='2xl' fontWeight="600">Grupuri</Text>
            </Center>

            {/* Groups field */}
            <FormControl>
                <CheckboxGroup onChange={(event) => props.setValue('groups', event, { shouldValidate: true })} colorScheme='blue'>
                    <VStack spacing={3} align='stretch'>
                        {props.groups.map((group, index) => (
                            <Checkbox key={group.id} value={group.id}>{group.name}</Checkbox>
                        ))}
                    </VStack>
                </CheckboxGroup>
                <FormErrorMessage>{!!props.errors && props.errors?.groups?.message}</FormErrorMessage>
            </FormControl>
        </Fragment>
    )
};

export default CreateVoteGroups;