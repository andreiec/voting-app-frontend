import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Center, Flex, Spinner } from "@chakra-ui/react";

import apiClient from "../http-common";
import Cookies from "js-cookie";
import Group from "../components/Groups/Group";
import Titlebar from "../layout/Titlebar";


function SingleGroup() {
    const params = useParams();
    const [group, setGroup] = useState({});
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    let requestConfig = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
        },
    };

    // Get group then get all users of group
    const fetchGroup = () => {
        setIsLoading(true);
        apiClient
            .get(`groups/${params.id}/`, requestConfig)
            .then((response) => {
                setGroup(response.data);

                apiClient
                    .get(`groups/${params.id}/users/`, requestConfig)
                    .then((users_response) => {
                        setUsers(users_response.data);
                        setIsLoading(false);
                        setError(null);
                    })
                    .catch((users_err) => {
                        setError(users_err);
                        setIsLoading(false);
                    })
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            })
    };

    useEffect(() => {
        fetchGroup();
    }, []);

    
    let content = null;

    // Initial content, if no error display it
    content = group.id ? <Group data={{group: group, users: users}} /> : null;
    
    if (error) {
        if (error.response.status === 404 || error.response.status === 400) {
            navigate("/not-found", { replace: true });
        }

        content = <p>{error.message}</p>;
    }

    // Display while loading request
    if (isLoading) {
        {/* Loding spinner */}
        content = <Center>
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.600"
                size="lg"
            />
        </Center>
    }

    return (
        <>
            <Titlebar title='Detalii' button={() => {navigate('/groups')}} buttonText="Înapoi" />
            <Flex
                bg="white"
                borderRadius={{ base: "0", md: "15px" }}
                py={{ base:"20px", md:"40px" }}
                px={{ base:"50px", md:"60px" }}
                boxShadow={{ base: "", md: "sm" }}
                minH={{base:"82vh", md:"31rem"}}
                flexDir="column"
            >
                {content}
            </Flex>
        </>
    )
}

export default SingleGroup;
