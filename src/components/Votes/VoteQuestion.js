import { Text, Box, RadioGroup, Stack, CheckboxGroup } from "@chakra-ui/react";
import { Fragment } from "react";
import { VoteOptionSingle, VoteOptionMultiple } from "./VoteOption";

function VoteQuestion(props) {
    return (
        <Fragment>
            <Box mb="20px">
                <Text fontSize='lg' fontWeight='600' color="gray.900">{props.data.title}</Text>
                <Text color="gray.500">{props.data.description}</Text>

            </Box>

            {props.data.selection_type === "single" && (
                <RadioGroup
                    name={props.data.id}
                    onChange={(event) => {
                        props.setFieldValue(props.data.id, [event], { shouldDirty: true, shouldValidate: true });
                    }}
                >
                    <Stack direction="column">
                        {props.data.options.map((option) => (
                            <VoteOptionSingle key={option.order} data={option} question_id={props.data.id} />
                        ))}
                    </Stack>
                </RadioGroup>
            )}

            {props.data.selection_type === "multiple" && (
                <>
                    <CheckboxGroup
                        name={props.data.id}
                        onChange={(event) => {
                            props.setFieldValue(props.data.id, event, { shouldDirty: true, shouldValidate: true } );
                        }}
                    >
                        <Stack direction="column">
                            {props.data.options.map((option) => (
                                <VoteOptionMultiple key={option.order} data={option} question_id={props.data.id} />
                            ))}
                        </Stack>
                    </CheckboxGroup>
                    <Text color='gray.900' mt='30px' fontSize='sm'>Selectează între {props.data.min_selections} și {props.data.max_selections} opțiuni</Text>
                </>
            )}

                    
        </Fragment>
    );
}

export default VoteQuestion;
