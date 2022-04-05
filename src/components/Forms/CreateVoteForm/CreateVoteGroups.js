import { Center, Checkbox, CheckboxGroup, Text, VStack } from "@chakra-ui/react";
import { Field } from "formik";
import { Fragment } from "react";


function CreateVoteGroups(props) {
    return (
        <Fragment>
            {/* Groups header */}
            <Center mb='30px'>
            <Text fontSize='2xl' fontWeight="600">Grupuri</Text>
            </Center>

            {/* Groups field */}
            <Field name='groups'>
            {() => (
                <CheckboxGroup onChange={(event) => props.setFieldValue('groups', event)} colorScheme='blue'>
                    <VStack spacing={3} align='stretch'>
                        {props.groups.map((group, index) => (
                            <Checkbox key={group.id} value={group.id} >{group.name}</Checkbox>
                        ))}
                    </VStack>
                </CheckboxGroup>
            )}
            </Field>
        </Fragment>
    )
};

export default CreateVoteGroups;