import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import VoteQuestion from "./VoteQuestion";
import { Form, Formik } from "formik";
import VoteFormTitle from "../Forms/VoteFormTitle";
import VoteFormControl from "../Forms/VoteFormControl";

function Vote(props) {
    const [activeQuestion, setActiveQuestion] = useState(0);

    const submitHandler = (values, submitProps) => {
        console.log(JSON.stringify(values));
    };

    return (
        <Flex
            bg="brand.white"
            borderRadius={{ base: "0", md: "15px" }}
            py="30px"
            px="50px"
            boxShadow={{ base: "", md: "sm" }}
            minH={{base:"82vh", md:"31rem"}}
            flexDir="column"
        >
            <VoteFormTitle title={props.data.title} description={props.data.description} rest={{ mb: "50px" }} />

            <Box flexGrow="1">
                <Formik initialValues={{}} onSubmit={submitHandler}>
                    {({ values, setFieldValue }) => (
                        <Form id={props.data.id}>
                            {props.data.questions.map((question, index) => (
                                <Box
                                    key={question.order}
                                    visibility={activeQuestion === index ? "visible" : "hidden"}
                                    position={activeQuestion === index ? "static" : "absolute"}
                                >
                                    <VoteQuestion data={question} setFieldValue={setFieldValue} />
                                </Box>
                            ))}
                        </Form>
                    )}
                </Formik>
            </Box>

            <VoteFormControl
                activeQuestion={activeQuestion}
                setActiveQuestion={setActiveQuestion}
                number_of_polls={props.data.number_of_polls}
                formID={props.data.id}
                rest={{ mt: "30px" }}
            />
        </Flex>
    );
}

export default Vote;
