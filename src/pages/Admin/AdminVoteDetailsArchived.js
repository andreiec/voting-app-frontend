import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import apiClient from "../../http-common";
import { Flex } from "@chakra-ui/react";
import Titlebar from "../../layout/Titlebar";
import AdminVoteInactive from "../../components/Admin/Votes/AdminVoteInactive";

function AdminVoteDetailsArchived() {
    const params = useParams();

    // State for vote, groups, users, and all votes
    const [vote, setVote] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    let requestConfig = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
        },
    };

    const fetchVote = () => {                                                        
        apiClient
            .get(`archived-elections/${params.id}/`, requestConfig)
            .then((election_response) => {
                setVote(election_response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                setError(error);
            });
    };

    useEffect(() => {
        setIsLoading(true);
        fetchVote();
    }, []);

    let content;


    if (!isLoading) {
        content = <AdminVoteInactive data={{vote: vote}} />;
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
            <Titlebar title='Detalii' buttonText="Înapoi" button={() => {navigate(-1)}}/>
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

export default AdminVoteDetailsArchived;