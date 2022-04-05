import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CreateVoteForm from "../components/Forms/CreateVoteForm";
import apiClient from "../http-common";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

function CreateVote() {
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [firstTouch, setFirstTouch] = useState(true);
    const [error, setError] = useState(null);
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
            fetchGroups();
        }
    }, [userSelector]);

    return (
        <Flex
            bg="brand.white"
            borderRadius={{ base: "0", md: "15px" }}
            py={{ base:"20px", md:"60px" }}
            px={{ base:"30px", md:"80px" }}
            boxShadow={{ base: "", md: "sm" }}
            flexDir="column"
        >
            <CreateVoteForm data={{groups: groups}} />
        </Flex>
    )
}

export default CreateVote;