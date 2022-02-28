import VotesList from "../components/Votes/VotesList";
import React, { useState, useEffect, useCallback } from "react";
import apiClient from "../http-common";
import { Center, Spinner, Box, Text } from "@chakra-ui/react";
import Cookies from "js-cookie";
import Titlebar from "../layout/Titlebar";

function AllVotes() {
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
            <Center
                minW="21.5rem"
                w='full'
                h='70vh'
            >
                <Text
                    fontSize="xl"
                    fontWeight='600'
                    my='50px'
                >
                    Nu există voturi!
                </Text>
            </Center>
        );
    }

    // Display votes if any
    if (votes.length > 0) {
        content = (
            <VotesList
                votes={votes}
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
            <Center h='70vh'>
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
        <React.Fragment>
            <Titlebar title='Voturile tale' buttonFunction={fetchVotes}/>
            {content}
        </React.Fragment> 
    )
}

export default AllVotes;
