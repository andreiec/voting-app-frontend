import { Flex, useToast } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminUser from "../components/Admin/Users/AdminUser";
import Titlebar from "../layout/Titlebar";
import Cookies from "js-cookie";
import apiClient from "../http-common";

function CreateUser() {
    const navigate = useNavigate();
    const toast = useToast();

    const [user, setUser] = useState(null);
    const [availableGroups, setAvailableGroups] = useState([]);
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    let requestConfig = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
        },
    };

    const fetchGroups = () => {
        apiClient
            .get("groups/", requestConfig)
            .then((response) => {
                setAvailableGroups(response.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            })
    }

    const handleSubmit = (data) => {
        if (data.group === "null") {
            data.group = null;
        }

        apiClient
            .post("users/", data, requestConfig)
            .then((response) => {
                setIsLoading(false);
                navigate("/admin/users/");

                toast({
                    title: 'Utilizator creat cu succes!',
                    status: 'success',
                    position: 'top',
                    duration: 4000,
                    isClosable: true,
                });
            })
            .catch((err) => {
                if (err.response.status === 409) {
                    toast({
                        title: 'Nu se pot face modificări cât timp este un vot activ!',
                        status: 'error',
                        position: 'top',
                        duration: 4000,
                        isClosable: true,
                    });
                } else {
                    setError(err);
                }
                setIsLoading(false);
            })
    }

    
    useEffect(() => {
        setIsLoading(true);
        fetchGroups();
    }, [])


    return (
        <Fragment>
            <Titlebar title='Detalii' button={() => {navigate("/admin/users/")}} buttonText="Înapoi" />
            <Flex
                bg="white"
                borderRadius={{ base: "0", md: "15px" }}
                py={{ base:"20px", md:"40px" }}
                px={{ base:"50px", md:"60px" }}
                boxShadow={{ base: "", md: "sm" }}
                minH={{base:"82vh", md:"31rem"}}
                flexDir="column"
            >
                <AdminUser data={{user: user, updateExisting: false, submitForm: handleSubmit, availableGroups: availableGroups}} />
            </Flex>
        </Fragment>
    )
}

export default CreateUser;