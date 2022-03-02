import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect, Fragment } from "react";
import apiClient from "../http-common";
import Cookies from "js-cookie";


function SingleVote() {
    const params = useParams();
    const navigator = useNavigate();

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

    let content = <p>{JSON.stringify(vote)}</p>;

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
