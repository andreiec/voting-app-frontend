import { Flex } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminGroup from "../../components/Admin/Groups/AdminGroup";
import Titlebar from "../../layout/Titlebar";
import Cookies from "js-cookie";
import apiClient from "../../http-common";

function AdminGroupDetails() {
    const params = useParams();
    const navigate = useNavigate();
    
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


    useEffect(() => {
        setIsLoading(true);
        fetchGroup();
    }, []);


    let content;


    if (!isLoading) {
        content = <AdminGroup data={{group: group, updateExisting: true}} />
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
                bg="brand.white"
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