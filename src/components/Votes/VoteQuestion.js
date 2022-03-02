import { Text, Box, RadioGroup, Stack, CheckboxGroup } from "@chakra-ui/react";
import { Fragment } from "react";
import { VoteOptionSingle, VoteOptionMultiple } from "./VoteOption";

function VoteQuestion(props) {
    return (
        <Fragment>
            <Box mb="20px">
                <Text color="brand.text_title">{props.data.title}</Text>
                <Text color="brand.text_body">{props.data.description}</Text>
            </Box>

            {props.data.selection_type === "single" && (
                <RadioGroup
                    name={props.data.id}
                    onChange={(event) => {
                        props.setFieldValue(props.data.id, event);
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
                <CheckboxGroup
                    name={props.data.id}
                    onChange={(event) => {
                        props.setFieldValue(props.data.id, event);
                    }}
                >
                    <Stack direction="column">
                        {props.data.options.map((option) => (
                            <VoteOptionMultiple key={option.order} data={option} question_id={props.data.id} />
                        ))}
                    </Stack>
                </CheckboxGroup>
            )}
        </Fragment>
    );
}

export default VoteQuestion;
