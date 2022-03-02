import { Box, Button, Icon, Text } from "@chakra-ui/react";
import { useState } from "react";
import VoteQuestion from "./VoteQuestion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { Form, Formik } from "formik";

function Vote(props) {
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [formData, setFormData] = useState({});

    const submitHandler = (values, submitProps) => {
        console.log(JSON.stringify(values));
    }

    return (
        <Box bg='brand.white' borderRadius='15px' p='30px' boxShadow='sm'>
            <Text fontSize='xl' color='brand.text_title'>{props.data.title}</Text>
            <Text fontSize='base' color='brand.text_body'>{props.data.description}</Text>

            <Formik 
                initialValues={{}}
                onSubmit={submitHandler}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        {props.data.questions.map((question) => (
                            <VoteQuestion key={question.order} data={question} setFieldValue={setFieldValue}/>
                        ))}

                        <Button
                            disabled={activeQuestion <= 0}
                            onClick={() => {setActiveQuestion((activeQuestion) => activeQuestion - 1 )}}
                        >
                            <Icon as={FaArrowLeft} />
                        </Button>

                        <Button
                            disabled={activeQuestion >= props.data.number_of_polls - 1}
                            onClick={() => {setActiveQuestion((activeQuestion) => activeQuestion + 1)}}
                        >
                            <Icon as={FaArrowRight} />
                        </Button>

                        <Button
                            type="submit"
                            bg="brand.green"
                            color="brand.white"
                            _hover={{bg: "brand.green_light"}}
                        >
                            Votează
                        </Button>
                    </Form>
                )}
                

            </Formik>
        </Box>
    )
}

export default Vote;