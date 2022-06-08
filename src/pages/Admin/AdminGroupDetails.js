import { Flex, useToast } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminGroup from "../../components/Admin/Groups/AdminGroup";
import Titlebar from "../../layout/Titlebar";
import Cookies from "js-cookie";
import apiClient from "../../http-common";

function AdminGroupDetails() {
    const params = useParams();
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

    const fetchGroup = () => {
        apiClient
            .get(`groups/${params.id}/`, requestConfig)
            .then((response) => {
                setGroup(response.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            })
    }

    const handleSubmit = (data) => {
        let final_data = group;
        final_data.color = data.color;
        final_data.name = data.name;
        final_data.description = data.description;

        apiClient
            .put(`groups/${group.id}/`, final_data, requestConfig)
            .then((response) => {
                setIsLoading(false);
                navigate("/admin/groups/");
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

    const handleDelete = (data) => {
        apiClient
            .delete(`groups/${group.id}/`, requestConfig)
            .then((response) => {
                setIsLoading(false);
                navigate("/admin/groups/");
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
        fetchGroup();
    }, []);


    let content;


    if (!isLoading) {
        content = <AdminGroup data={{group: group, updateExisting: true, submitForm: handleSubmit, handleDelete: handleDelete}} />
    }
    

    if (error) {
        if (error.response?.status === 404 || error.response?.status === 400) {
            navigate("/not-found", { replace: false });
        }

        content = <p>{error.message}</p>;
    }


    // Display while loading request
    if (isLoading) {
        content = <p>Se încarcă..</p>;
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
                {content}
            </Flex>
        </Fragment>
    )
}

export default AdminGroupDetails;