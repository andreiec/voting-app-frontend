import { Box, Text,  Button, Center, Flex, Divider, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useState } from "react";
import { object, number, string, array } from 'yup'
import CreateVoteGeneralInformation from "./CreateVoteGeneralInformation";
import CreateVoteGroups from "./CreateVoteGroups";
import CreateVoteQuestions from "./CreateVoteQuestions";
import apiClient from "../../../http-common";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Cookies from "js-cookie";


// Function to compare start time and end time
const isSameOrBefore = (startTime, endTime) => {
    return moment(startTime, "HH:mm").isSameOrBefore(moment(endTime, 'HH:mm'));
}

const validationSchema = object({
    title: string()
        .required('Titul este obligatoriu.')
        .min(4, 'Lungimea minimă este de 4 caractere.')
        .max(255, 'Lungimea maximă este de 255 de caractere.'),

    description: string()
        .max(2047, 'Lungimea maximă este de 2048 de caractere.'),

    number_of_polls: number()
        .min(0)
        .max(50),

    voting_starts_at_hour: string()
        .test(
            'voting_starts_test',
            'Ora de start nu poate fi mai mare decât cea de final.',
            function(value) {
                const { voting_starts_at_date, voting_ends_at_date, voting_ends_at_hour } = this.parent;

                if (this.parent.manual_closing) {
                    return true;
                }

                return moment(voting_starts_at_date + " " + value).isBefore(moment(voting_ends_at_date + " " + voting_ends_at_hour))
            }
        ),

    voting_ends_at_hour: string()
        .test(
            'voting_ends_test',
            'Ora de final nu poate fi mai mică decât cea de început.',
            function(value) {
                const { voting_starts_at_date, voting_ends_at_date, voting_starts_at_hour } = this.parent;

                if (this.parent.manual_closing) {
                    return true;
                }

                return moment(voting_starts_at_date + " " + voting_starts_at_hour).isSameOrBefore(moment(voting_ends_at_date + " " + value))
            }
        )
        .test(
            'voting_ends_after_current_time_test',
            'Ora de final nu poate fi înainte de ora curentă.',
            function(value) {
                const currDate = new Date();

                if (moment(this.parent.voting_ends_at_date).isAfter(moment().format('YYYY-MM-DD'))) {
                    return true;
                }

                if (this.parent.manual_closing) {
                    return true;
                }

                return isSameOrBefore(String(currDate.getHours()).padStart(2, '0') + ":" + String(currDate.getMinutes()).padStart(2, '0'), value);
            }
        ),

    // Question validation schema
    questions: array(object({
        title: string()
            .required('Titul este obligatoriu')
            .min(4, 'Lungimea minimă este de 4 caractere')
            .max(255, 'Lungimea maximă este de 255 de caractere'),

        description: string()
            .max(2047, 'Lungimea maximă este de 2048 de caractere'),

        selection_type: string(),

        min_selections: number()
            .min(1, 'Numărul minim de opțiuni este 100')
            .max(100, 'Numărul maxim de opțiuni este 100')
            .test(
                'min_selec_test',
                'a',
                function(value) {
                    const { max_selections, selection_type } = this.parent;
                    
                    if (selection_type === 'single') {
                        return true;
                    }

                    return value <= max_selections;
                }
            ),

        max_selections: number()
            .min(1, 'Numărul minim de opțiuni este 100')
            .max(100, 'Numărul maxim de opțiuni este 100')
            .test(
                'max_selec_test',
                'a',
                function(value) {
                    const { min_selections, selection_type } = this.parent;

                    if (selection_type === 'single') {
                        return true;
                    }

                    return value >= min_selections;
                }
            ),
        
        options: array(object({
            value: string()
                .required()
        }))
            .min(1, 'Numărul minim de opțiuni este 1')
            .max(100, 'Numărul maxim de întrebări este 50'),
    }))
        .min(1)
        .max(30),

    groups: array()
        .min(1, 'Selectează cel puțin un grup'),
})


function CreateVoteForm(props) {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const groups = props.data.groups;
    const todayDate = props.data.todayDate;

    let requestConfig = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
        },
    };

    // Function to handle form submission
    const submitForm = (data) => {

        setIsLoading(true);

        // Construct object to be parsed to backend
        let final_data = { ...data };

        final_data['owner'] = props.data.userID;
        final_data['number_of_polls'] = final_data.questions.length;

        // Get dates from data
        const start_date_data = data.voting_starts_at_date.split('-');
        const start_date = new Date(start_date_data[0], start_date_data[1] - 1, start_date_data[2], ...data.voting_starts_at_hour.split(':'));

        const end_date_data = data.voting_starts_at_date.split('-');
        const end_date = new Date(end_date_data[0], end_date_data[1] - 1, end_date_data[2], ...data.voting_ends_at_hour.split(':'));
        
        // Remove these 4 keys to combine them into only 2
        delete final_data['voting_starts_at_date'];
        delete final_data['voting_starts_at_hour'];
        delete final_data['voting_ends_at_date'];
        delete final_data['voting_ends_at_hour'];

        // Add the 2 dates needed for backend
        final_data['voting_starts_at'] = start_date.toISOString().split('.')[0] + 'Z';
        final_data['voting_ends_at'] = end_date.toISOString().split('.')[0] + 'Z';

        // Iterate through each question and put its order
        final_data.questions.forEach((question, q_index) => {
            question['order'] = q_index;

            if (question['selection_type'] === 'single') {
                question['min_selections'] = 1;
                question['max_selections'] = 1;
            }
            
            // Iterate through each option and put its order
            question.options.forEach((option, o_index) => {
                option['order'] = o_index;
            })
        });


        apiClient
            .post("elections/", final_data, requestConfig)
            .then((response) => {
                setIsLoading(false);
                navigate("/");
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });
    }

    const initialValues = {
        title: '',
        description: '',
        voting_starts_at_date: new Date(todayDate.getTime() - todayDate.getTimezoneOffset() * 60 * 1000).toISOString().split('T')[0],
        voting_ends_at_date: new Date(todayDate.getTime() - todayDate.getTimezoneOffset() * 60 * 1000).toISOString().split('T')[0],
        voting_starts_at_hour: String(todayDate.getHours() + ':' + String(todayDate.getMinutes()).padStart(2, '0')).padStart(2, '0'),
        voting_ends_at_hour: String(todayDate.getHours() + ':' + String(todayDate.getMinutes()).padStart(2, '0')).padStart(2, '0'),
        manual_closing: true,
        questions: [{
            title: '',
            description: '',
            selection_type: 'single',
            min_selections: '1',
            max_selections: '1',
            order: 0,
            options: [
                {
                    value: '',
                    order: 0,
                },
            ]
        }],
        groups: [],
    };

    const { register, handleSubmit, control, setValue, getValues, trigger, formState: { errors, isValid, isDirty } } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
    });

    return (
        <form onSubmit={handleSubmit(submitForm)} autoComplete="off">
            <Flex flexDir='column'>

                {/* Header */}
                <Box mb='40px'>
                    <Text fontSize='xl' color='gray.900'>Creează un vot.</Text>
                    <Text fontSize='md' color='gray.500'>Adaugă câmpurile dorite și opțiunile pentru fiecare întrebare.</Text>
                </Box>


                {/* General Information */}
                <CreateVoteGeneralInformation control={control} errors={errors} register={register} setValue={setValue} todayDate={todayDate} trigger={trigger} />
                <Divider mb='40px' mt='20px'/>


                {/* Groups */}
                <CreateVoteGroups groups={groups} errors={errors} register={register} setValue={setValue}/>
                <Divider my='40px'/>


                {/* Questions dynamic form */}
                <CreateVoteQuestions errors={errors} control={control} register={register} setValue={setValue} getValues={getValues} trigger={trigger}/>
                

                {/* Submit button */}
                <Center mt="80px">
                    <Button
                        isLoading={isLoading}
                        colorScheme="green"
                        color="white"
                        fontWeight="400"
                        type="submit"
                        disabled={!(isValid && isDirty)}
                    >
                        Finalizează
                    </Button>
                </Center>
            </Flex>
            {/*<pre>{JSON.stringify(getValues(), null, 4)}</pre>*/}
        </form>
    )
}

export default CreateVoteForm;
