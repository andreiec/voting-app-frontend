import { Center, Flex, FormControl, FormErrorMessage, FormLabel, Input, Switch, Text, Textarea } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import TimePicker from 'react-time-picker';


function CreateVoteGeneralInformation(props) {
    const todayDate = props.todayDate;

    const [startDateValue, onStartDateChange] = useState(todayDate);
    const [startHourValue, onStartHourChange] = useState(String(todayDate.getHours() + ':' + String(todayDate.getMinutes()).padStart(2, '0')).padStart(2, '0'));

    const [endDateValue, onEndDateChange] = useState(new Date(todayDate.getTime() + 2000));
    const [endHourValue, onEndHourChange] = useState(String(todayDate.getHours() + ':' + String(todayDate.getMinutes()).padStart(2, '0')).padStart(2, '0'));

    const [manualClosing, setManualClosing] = useState(true);

    return (
        <Fragment>
            <Center>
                <Text fontSize='2xl' mb='20px' fontWeight="600">Informații generale</Text>
            </Center>

            {/* TODO add this format to login page*/}
            {/* Title field */}
            <FormControl isInvalid={!!props.errors?.title?.message} mb='15px' isRequired>
                <FormLabel fontWeight="600" htmlFor="title">Titlu</FormLabel>
                <Input id="title" {...props.register('title')}/>
                <FormErrorMessage>{props.errors?.title?.message}</FormErrorMessage>
            </FormControl>
            

            {/* Description field */}
            <FormControl isInvalid={!!props.errors?.description?.message} mb='35px'>
                <FormLabel fontWeight="600" htmlFor="description">Descriere</FormLabel>
                <Textarea id="description" {...props.register('description')}/>
                <FormErrorMessage>{props.errors?.description?.message}</FormErrorMessage>
            </FormControl>


            {/* Manual closing field */}
            <FormControl isInvalid={!!props.errors?.manual_closing?.message} mb='35px'>
                <FormLabel fontWeight="600">Utilizare manuală</FormLabel>
                    <Switch
                        onChange={() => {props.setValue('manual_closing', !manualClosing); setManualClosing(!manualClosing);}}
                        size='lg'
                        defaultIsChecked
                    />
                <FormErrorMessage>{props.errors?.manual_closing?.message}</FormErrorMessage>
            </FormControl>


            <Flex flexDir={{base:'column', md:'row'}} gap={{base: 25, md: '54px'}} flexWrap='wrap' justifyContent='stretch' mb='45px'>

                {/* Start date field */}
                <FormControl isInvalid={!!props.errors?.voting_starts_at_date?.message} w='fit-content'>
                    <FormLabel fontWeight="600" w='fit-content'>Data începerii votului</FormLabel>
                        <DatePicker
                            dateFormat="dd MMM yyyy"
                            placeholderText='Selectează data'
                            maxDate={endDateValue}
                            minDate={todayDate}
                            onChange={(date) => {onStartDateChange(date); props.setValue('voting_starts_at_date', new Date((date.getTime() - date.getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0])}}
                            value={startDateValue}
                            selected={startDateValue}
                            clearIcon={null}
                            disabled={manualClosing}
                        />
                    <FormErrorMessage>{props.errors?.voting_starts_at_date?.message}</FormErrorMessage>
                </FormControl>


                {/* Start hour field */}
                <FormControl isInvalid={!!props.errors?.voting_starts_at_hour?.message} w='fit-content'>
                    <FormLabel fontWeight="600" w='fit-content'>Ora începerii votului</FormLabel>
                        <TimePicker
                            onChange={(hour) => {onStartHourChange(hour); props.setValue('voting_starts_at_hour', hour)}}
                            value={startHourValue}
                            clearIcon={null}
                            disabled={manualClosing}
                            disableClock={true}
                        />
                    <FormErrorMessage>{props.errors?.voting_starts_at_hour?.message}</FormErrorMessage>
                </FormControl>
            </Flex>

            <Flex flexDir={{base:'column', md:'row'}} gap={{base: 25, md: 50}} flexWrap='wrap' mb='25px'>

                {/* End date field */}
                <FormControl isInvalid={!!props.errors?.voting_ends_at_date?.message} w='fit-content'>
                    <FormLabel fontWeight="600" w='fit-content'>Data încheierii votului</FormLabel>
                        <DatePicker
                            dateFormat="dd MMM yyyy"
                            placeholderText='Selectează data'
                            minDate={startDateValue}
                            onChange={(date) => {onEndDateChange(date); props.setValue('voting_ends_at_date', new Date((date.getTime() - date.getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0])}}
                            value={endDateValue}
                            selected={endDateValue}
                            clearIcon={null}
                            disabled={manualClosing}
                        />
                    <FormErrorMessage>{props.errors?.voting_ends_at_date?.message}</FormErrorMessage>
                </FormControl>

                
                {/* End hour field */}
                <FormControl isInvalid={!!props.errors?.voting_ends_at_hour?.message} w='fit-content'>
                    <FormLabel fontWeight="600" w='fit-content'>Ora încheierii votului</FormLabel>
                        <TimePicker
                            onChange={(hour) => {onEndHourChange(hour); props.setValue('voting_ends_at_hour', hour)}}
                            value={endHourValue}
                            clearIcon={null}
                            disabled={manualClosing}
                            disableClock={true}
                        />
                    <FormErrorMessage>{props.errors?.voting_ends_at_hour?.message}</FormErrorMessage>
                </FormControl>
            </Flex>

        </Fragment>
    )
};

export default CreateVoteGeneralInformation;