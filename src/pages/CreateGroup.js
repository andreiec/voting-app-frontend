import { Flex, useToast } from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminGroup from "../components/Admin/Groups/AdminGroup";
import Titlebar from "../layout/Titlebar";
import Cookies from "js-cookie";
import apiClient from "../http-common";

function CreateGroup() {
    const navigate = useNavigate();
    const toast = useToast();

    const [group, setGroup] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    let requestConfig = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
        },
    };

    const handleSubmit = (data) => {
        apiClient
            .post("groups/", data, requestConfig)
            .then((response) => {
                setIsLoading(false);
                navigate("/admin/groups/");

                toast({
                    title: 'Grup creat cu succes!',
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
                    })
                } else {
                    setError(err);
                }
                setIsLoading(false);
            })
    }

    return (
        <Fragment>
            <Titlebar title='Detalii' button={() => {navigate("/admin/groups/")}} buttonText="Înapoi" />
            <Flex
                bg="white"
                borderRadius={{ base: "0", md: "15px" }}
                py={{ base:"20px", md:"40px" }}
                px={{ base:"50px", md:"60px" }}
                boxShadow={{ base: "", md: "sm" }}
                minH={{base:"82vh", md:"31rem"}}
                flexDir="column"
            >
                <AdminGroup data={{group: group, updateExisting: false, submitForm: handleSubmit}} />
            </Flex>
        </Fragment>
    )
}

export default CreateGroup;