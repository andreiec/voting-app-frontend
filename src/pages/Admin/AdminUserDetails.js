import { Center, Flex, Spinner, useToast } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminUser from "../../components/Admin/Users/AdminUser";
import Titlebar from "../../layout/Titlebar";
import Cookies from "js-cookie";
import apiClient from "../../http-common";

function AdminUserDetails() {
    const params = useParams();
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

    const fetchUser = () => {
        apiClient
            .get(`users/${params.id}/`, requestConfig)
            .then((response) => {
                setUser(response.data);

                apiClient
                    .get('groups/', requestConfig)
                    .then((group_response) => {
                        setAvailableGroups(group_response.data);
                        setIsLoading(false);
                    })
                    .catch((group_err) => {
                        setError(group_err);
                        setIsLoading(false);
                    })
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            })
    }

    const handleSubmit = (data) => {
        let final_data = {...user};
    
        final_data.first_name = data.first_name;
        final_data.last_name = data.last_name;
        final_data.is_staff = data.is_staff;
        final_data.is_admin = data.is_admin;

        if (data.group === "null") {
            final_data.group = null;
        } else {
            final_data.group = data.group;
        }

        apiClient
            .put(`users/${user.id}/`, final_data, requestConfig)
            .then((response) => {
                navigate("/admin/users/");

                toast({
                    title: 'User updatat cu succes!',
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
            })
    }

    const handleDelete = (data) => {
        apiClient
            .delete(`users/${user.id}/`, requestConfig)
            .then((response) => {
                setIsLoading(false);
                navigate("/admin/users/");

                toast({
                    title: 'User șters cu succes!',
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


    useEffect(() => {
        setIsLoading(true);
        fetchUser();
    }, []);


    let content;


    if (!isLoading) {
        content = <AdminUser data={{user: user, availableGroups: availableGroups, updateExisting: true, submitForm: handleSubmit, handleDelete: handleDelete}} />
    }
    

    if (error) {
        if (error.response?.status === 404 || error.response?.status === 400) {
            navigate("/not-found", { replace: false });
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
                {content}
            </Flex>
        </Fragment>
    )
}

export default AdminUserDetails;