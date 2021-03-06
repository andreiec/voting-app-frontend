import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import apiClient from "../../http-common";
import { Center, Flex, Spinner, useToast } from "@chakra-ui/react";
import AdminVote from "../../components/Admin/Votes/AdminVote";
import Titlebar from "../../layout/Titlebar";

function AdminVoteDetails() {
    const params = useParams();
    const toast = useToast();

    // State for vote, groups, users, and all votes
    const [vote, setVote] = useState({});
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);
    const [userSubmissions, setuserSubmissions] = useState([]);

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

        // Workflow is like this 
        // GET election -> GET all groups from election -> GET all users from election groups -> GET all submissions
        //                                                            

        apiClient
            .get(`elections/${params.id}/`, requestConfig)
            .then((election_response) => {
                setVote(election_response.data);

                // Get groups from election
                apiClient
                    .get(`elections/${params.id}/groups/`, requestConfig)
                    .then((group_response) => {
                        setGroups(group_response.data);

                        // Get users from group
                        const vote_groups_ids = election_response.data.groups;
                        let promises = [];
        
                        // Iterate over every group and make request for its users, and save them
                        // This is the most ambigous js I've ever written
                        // Create a list of promises (inside the promises array), then make one big promise out of them
                        // Then wait for the big promise
        
                        vote_groups_ids.forEach((group) => {
                            promises.push(
                                apiClient
                                    .get(`groups/${group}/users/`, requestConfig)
                                    .then((group_response) => {
                                        return group_response.data;
                                    })
                                    .catch((group_error) => {
                                        setIsLoading(false);
                                        setError(group_error);
                                    })
                            )
                        })
                        
                        // Set users state from the big promise
                        Promise.all(promises)
                            .then((groups_users) => {
                                setUsers(groups_users.flat());

                                // Get all submited votes from election
                                apiClient
                                    .get(`elections/${params.id}/submissions/`, requestConfig)
                                    .then((submissions_response) => {
                                        setuserSubmissions(submissions_response.data);
                                        setIsLoading(false);
                                    }).catch((submissions_error) => {
                                        setIsLoading(false);
                                        setError(submissions_error)
                                    })
                                
                            })
                            .catch((groups_users_error) => {
                                setIsLoading(false);
                                setError(groups_users_error)
                            })
                    })
                    .catch((group_error) => {
                        setIsLoading(false);
                        setError(group_error);
                })
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


    const stopVoteHandler = () => {
        apiClient
            .get(`elections/${params.id}/close/`, requestConfig)
            .then((response) => {
                navigate(`/admin/votes/archived/${response.data.vote_id}`, { replace: true })

                toast({
                    title: 'Vot ??ncheiat cu succes!',
                    status: 'success',
                    position: 'top',
                    duration: 4000,
                    isClosable: true,
                });
            })
            .catch((error) => {
                toast({
                    title: 'A ap??rut o eroare!',
                    status: 'error',
                    position: 'top',
                    duration: 4000,
                    isClosable: true,
                });
            })
    }

    let content;


    if (!isLoading) {
        if (vote.is_active) {
            content = <AdminVote data={{vote: vote, groups: groups, userSubmissions: userSubmissions, users: users, stopVoteHandler: stopVoteHandler}} />
        } else {
            content = <p>Votul este athivat.</p>
        }
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
            <Titlebar title='Detalii' buttonText="??napoi" button={() => {navigate('/admin/votes/')}}/>
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

export default AdminVoteDetails;