import UserCard from "../components/User/UserCard";
import VotesList from "../components/Votes/VotesList";
import React, { useState, useEffect, useCallback } from "react";
import apiClient from "../http-common";
import { Center, Spinner, Box, Text, Flex, Spacer } from "@chakra-ui/react";
import Cookies from "js-cookie";

function Main() {
    const [votes, setVotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [firstTouch, setFirstTouch] = useState(true);
    const [error, setError] = useState(null);

    const fetchVotes = () => {
        setIsLoading(true);

        let requestConfig = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        };

        apiClient
            .get("elections/", requestConfig)
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
        setFirstTouch(false);
        fetchVotes();
    }, []);

    // Display if no votes exist
    let content;

    // Hide content if it is the first time loading the page
    if (!firstTouch) {
        content = (
            <Center w="full" h="full">
                <Text size="xl">Nu există voturi!</Text>
            </Center>
        );
    }

    // Display votes if any
    if (votes.length > 0) {
        content = (
            <VotesList
                votes={[
                    votes[0],
                    votes[1],
                    votes[0],
                    votes[1],                    
                    votes[0],
                    votes[1],
                    votes[1],
                ]}
                mainMenu='true'
            ></VotesList>
        );
    }

    // Display if error
    if (error) {
        content = <p>{error.message}</p>;
    }

    // Display while loading request
    if (isLoading) {
        content = (
            <Center w="full" h="full">
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
        <Flex flexDir='row' gap='30px' flexWrap='wrap' justifyContent='space-between'>
            {content}
            <UserCard />
        </Flex>
    )
}

export default Main;
