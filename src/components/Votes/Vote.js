import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import VoteQuestion from "./VoteQuestion";
import VoteFormTitle from "../Forms/VoteFormTitle";
import VoteFormControl from "../Forms/VoteFormControl";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, array, number } from 'yup'

function Vote(props) {
    const [activeQuestion, setActiveQuestion] = useState(0);

    
    let initialValues = { };
    let validationObject = { };

    props.data.questions.forEach((question) => {
        initialValues[question.id] = [];
        validationObject[question.id] = array(string()).min(question.min_selections).max(question.max_selections);
    });

    const validationSchema = object(validationObject);
    
    const { handleSubmit, control, setValue, formState: { errors, isValid, isDirty } } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
    });


    return (
        <>
            <VoteFormTitle title={props.data.title} description={props.data.description} rest={{ mb: "50px" }} />

            <Box flexGrow="1">
                <form onSubmit={handleSubmit(props.submitHandler)} autoComplete="off" id={props.data.id}>
                    {props.data.questions.map((question, index) => (
                        <Box
                            key={question.order}
                            visibility={activeQuestion === index ? "visible" : "hidden"}
                            position={activeQuestion === index ? "static" : "absolute"}
                        >
                            <VoteQuestion data={question} setFieldValue={setValue} />
                        </Box>
                    ))}
                </form>
            </Box>

            <VoteFormControl
                activeQuestion={activeQuestion}
                setActiveQuestion={setActiveQuestion}
                number_of_polls={props.data.number_of_polls}
                handleVote={handleSubmit(props.submitHandler)}
                formID={props.data.id}
                rest={{ mt: "30px" }}
                isDirty={isDirty}
                isValid={isValid}
            />
        </>
    );
}

export default Vote;
