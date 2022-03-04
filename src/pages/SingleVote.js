import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect, Fragment } from "react";
import apiClient from "../http-common";
import Cookies from "js-cookie";
import Vote from "../components/Votes/Vote";
import { useSelector } from "react-redux";


function SingleVote() {
    const params = useParams();
    const navigator = useNavigate();
    const userSelector = useSelector(selector => selector.user);
    const [vote, setVote] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    let requestConfig = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
        },
    };

    const fetchVote = () => {
        setIsLoading(true);
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
    };

    useEffect(() => {
        fetchVote();
    }, []);
    
    
    const submitHandler = (values, submitProps) => {
        const submission_data = {
            id: userSelector.id,
            sent_on: new Date(),
            votes: {
                ...values
            }
        }
        console.log(submission_data);

        apiClient
            .post('elections/submit/', submission_data, requestConfig)
            .then((response) => {
                console.log("SUCCES");
                console.log(response.data);
            })
            .catch((error) => {
                console.log("ERROR");
                console.log(error);
            });
    };

    let content = vote.id ? <Vote data={vote} submitHandler={submitHandler} /> : null;

    if (error) {
        // If 404 put not found
        if (error.response.status === 404 || error.response.status === 400) {
            navigator("/not-found", { replace: true });
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
