import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { Flex, useToast } from "@chakra-ui/react";

import apiClient from "../http-common";
import Cookies from "js-cookie";
import Vote from "../components/Votes/Vote";
import VoteConfirmed from "../components/Votes/VoteConfirmed";
import VoteClosed from "../components/Votes/VoteClosed";


function SingleVote() {
    const params = useParams();
    const userSelector = useSelector(selector => selector.user);
    const [vote, setVote] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [alreadyVoted, setAlreadyVoted] = useState(false);

    const toast = useToast();
    const navigate = useNavigate();

    let requestConfig = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
        },
    };

    const fetchVote = () => {
        setIsLoading(true);

        // First call get list of all submissions for an election and check if user id is inside the list
        // If user is not in the list, get the vote data and display the form
        apiClient
            .get(`elections/${params.id}/submissions/`, requestConfig)
            .then((response) => {

                // Get all submissions, if user in list then return and navigate
                const submissions = response.data;

                submissions.forEach(submission => {
                    if (submission.user === userSelector.id) {
                        setAlreadyVoted(true);
                        setIsLoading(false);
                        return;
                    } 
                });

                // Get election
                apiClient
                    .get(`elections/${params.id}/`, requestConfig)
                    .then((response) => {
                        setVote(response.data);
                        setIsLoading(false);
                        setError(null);
                    })
                    .catch((error) => {
                        setIsLoading(false);
                        setError(error);
                    });
                
            })
            .catch((error) => {
                console.log(error);
            })
    };

    useEffect(() => {
        fetchVote();
    }, []);



    const submitHandler = (values, submitProps) => {
        const submission_data = {
            user_id: userSelector.id,
            election_id: params.id,
            sent_on: new Date(),
            votes: {
                ...values
            }
        }

        // TODO pass props for vote confirmed (vote hash, submitted votes, etc..)
        apiClient
            .post(`elections/${params.id}/submit/`, submission_data, requestConfig)
            .then((response) => {
                navigate('/vote-confirmed', { replace: true });
            })
            .catch((error) => {
                toast({
                    title: 'A aparut o eroare.',
                    status: 'error',
                    position: 'top',
                    duration: 4000,
                    isClosable: true,
                })
            });
    };
    
    let content = null;

    if (vote?.id && !vote.is_active) {
        content = <VoteClosed />
    } else if (alreadyVoted) {
        content = <VoteConfirmed />
    } else {
        // Initial content, if no error display it
        content = vote.id ? 
            <Flex
                bg="brand.white"
                borderRadius={{ base: "0", md: "15px" }}
                py={{ base:"20px", md:"40px" }}
                px={{ base:"50px", md:"60px" }}
                boxShadow={{ base: "", md: "sm" }}
                minH={{base:"82vh", md:"31rem"}}
                flexDir="column"
            >
                <Vote data={vote} submitHandler={submitHandler} /> 
            </Flex> : null;
    }

    if (error) {
        if (error.response.status === 404 || error.response.status === 400) {
            navigate("/not-found", { replace: true });
        }

        content = <p>{error.message}</p>;
    }

    
    // Display while loading request
    if (isLoading) {
        content = <p>Se încarcă..</p>;
    }

    return <Fragment>{content}</Fragment>;
}

export default SingleVote;
