import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import apiClient from "../../http-common";
import { Flex } from "@chakra-ui/react";
import AdminVote from "../../components/Admin/Votes/AdminVote";

function AdminVoteDetails() {
    const params = useParams();

    // State for vote, groups, users, and all votes
    const [vote, setVote] = useState({});
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);
    const [userVotes, setUserVotes] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
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

                apiClient
                    .get(`elections/${params.id}/submissions/`, requestConfig)
                    .then((submissions_response) => {
                        setUserVotes(submissions_response.data);
                    })
                
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                setError(error);
            });
    };

    useEffect(() => {
        fetchVote();
    }, []);


    // Initial content, if no error display it
    let content = vote.id ? 
    <Flex
        bg="brand.white"
        borderRadius={{ base: "0", md: "15px" }}
        py={{ base:"20px", md:"40px" }}
        px={{ base:"50px", md:"60px" }}
        boxShadow={{ base: "", md: "sm" }}
        minH={{base:"82vh", md:"31rem"}}
        flexDir="column"
    >
        <AdminVote data={{vote: vote, groups: groups, userVotes: userVotes, users: users}} />
    </Flex> : null;


    if (error) {
        if (error.response.status === 404 || error.response.status === 400) {
            navigate("/not-found", { replace: false });
        }

        content = <p>{error.message}</p>;
    }


    // Display while loading request
    if (isLoading) {
        content = <p>Se încarcă..</p>;
    }

    return <Fragment>{content}</Fragment>;
}

export default AdminVoteDetails;