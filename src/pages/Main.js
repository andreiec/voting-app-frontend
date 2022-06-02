import UserCard from "../components/User/UserCard";
import VotesList from "../components/Votes/VotesList";
import React, { useState, useEffect, Fragment } from "react";
import apiClient from "../http-common";
import { Center, Spinner, Box, Text, Flex } from "@chakra-ui/react";
import Cookies from "js-cookie";
import Titlebar from "../layout/Titlebar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Main() {
    const [votes, setVotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [firstTouch, setFirstTouch] = useState(true);
    const [error, setError] = useState(null);
    const userSelector = useSelector(selector => selector.user);

    const fetchVotes = () => {
        setIsLoading(true);

        let requestConfig = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        };

        apiClient
            .get(`users/${userSelector.id}/elections/9`, requestConfig)
            .then((response) => {
                setVotes(response.data);
                setIsLoading(false);
                setError(null);
            })
            .catch((error) => {
                setIsLoading(false);
                setError(error);
            });
    };

    useEffect(() => {
        if (userSelector.id) {
            setFirstTouch(false);
            fetchVotes();
        }
    }, [userSelector]);

    // Display if no votes exist
    let content = 
        <Box
            minW="21.5rem"
            w={{ base: 'full', md:'calc(100% - 23.6rem)'}}
        >
        </Box>;

    // Hide content if it is the first time loading the page
    if (!firstTouch) {
        content = 
            <Center
                minW="21.5rem"
                w={{ base: 'full', md:'calc(100% - 23.6rem)'}}
            >
                <Text
                    fontSize="xl"
                    fontWeight='600'
                    my='50px'
                >
                    Nu există voturi!
                </Text>
            </Center>
        ;
    }

    // Display votes if any
    if (votes.length > 0) {
        content = (
            <VotesList
                votes={votes}
                mainMenu='true'
            ></VotesList>
        );
    }

    // Display if error
    if (error) {
        content = <Box><Text>{error.message}</Text></Box>;
    }

    // Display while loading request
    if (isLoading) {
        content = (
            <Center
                minW="21.5rem"
                w={{ base: 'full', md:'calc(100% - 23.6rem)'}}
            >
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="lg"
                />
            </Center>
        );
    }

    return (
        <Fragment>
            <Titlebar title='Meniu principal' button={fetchVotes} buttonText="Reîncarcă"/>
            <Flex
                flexDir='row'
                gap='30px'
                flexWrap='wrap'
                justifyContent='space-between'
            >
                {content}
                <UserCard />
            </Flex>
        </Fragment>

    )
}

export default Main;
