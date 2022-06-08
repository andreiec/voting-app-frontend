import { Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CreateVoteForm from "../components/Forms/CreateVoteForm/CreateVoteForm";
import apiClient from "../http-common";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

function CreateVote() {
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const toast = useToast();

    const userSelector = useSelector(selector => selector.user);

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
            })
            .catch((error) => {
                setIsLoading(false);

                toast({
                    title: 'A apărut o eroare!',
                    status: 'error',
                    position: 'top',
                    duration: 4000,
                    isClosable: true,
                })
            });
    };

    useEffect(() => {
        if (userSelector.id) {
            fetchGroups();
        }
    }, [userSelector]);

    return (
        <Flex
            bg="white"
            borderRadius={{ base: "0", md: "15px" }}
            py={{ base:"20px", md:"60px" }}
            px={{ base:"30px", md:"80px" }}
            boxShadow={{ base: "", md: "sm" }}
            flexDir="column"
        >
            <CreateVoteForm data={{groups: groups, todayDate: new Date(), userID: userSelector.id}} />
        </Flex>
    )
}

export default CreateVote;