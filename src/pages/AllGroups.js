import GroupsList from "../components/Groups/GroupsList";
import React, { useState, useEffect, useCallback } from "react";
import apiClient from "../http-common";
import { Center, Spinner, Box, Text } from "@chakra-ui/react";
import Cookies from "js-cookie";
import Titlebar from "../layout/Titlebar";

function AllGroups() {
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [firstTouch, setFirstTouch] = useState(true);
    const [error, setError] = useState(null);

    const fetchGroups = () => {
        setIsLoading(true);

        let requestConfig = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        };

        apiClient
            .get("groups/", requestConfig)
            .then((response) => {
                setGroups(response.data);
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
        fetchGroups();
    }, []);

    // Display if no groups exist
    let content;

    // Hide content if it is the first time loading the page
    if (!firstTouch) {
        content = (
            <Center w="full" h="full">
                <Text size="xl">Nu există voturi!</Text>
            </Center>
        );
    }

    // Display groups if any
    if (groups.length > 0) {
        content = <GroupsList groups={groups}></GroupsList>;
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
        <React.Fragment>
            <Titlebar title='Grupuri' button={fetchGroups} buttonText="Reîncarcă" />
            {content}
        </React.Fragment>
    )
}

export default AllGroups;
