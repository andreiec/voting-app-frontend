import { Radio, Checkbox } from "@chakra-ui/react";

function VoteOptionSingle(props) {
    return (
        <Radio w="min-content" value={props.data.id}>
            {props.data.value}
        </Radio>
    );
}

function VoteOptionMultiple(props) {
    return (
        <Checkbox w="min-content" value={props.data.id}>
            {props.data.value}
        </Checkbox>
    );
}

export { VoteOptionSingle, VoteOptionMultiple };
