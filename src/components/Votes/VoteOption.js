import { Radio, Checkbox } from "@chakra-ui/react"
import { Field } from "formik";

function VoteOptionSingle(props) {
    return (
        <Radio value={props.data.id}>{props.data.value}</Radio>
    )
}

function VoteOptionMultiple(props) {
    return (
        <Checkbox value={props.data.id}>{props.data.value}</Checkbox>
    )
}

export { VoteOptionSingle, VoteOptionMultiple };