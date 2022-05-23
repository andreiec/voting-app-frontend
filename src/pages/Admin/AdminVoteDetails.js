import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import apiClient from "../../http-common";

function AdminVoteDetails() {
    const params = useParams();
    const [vote, setVote] = useState([]);
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

    return (
        <h1>{JSON.stringify(vote)}</h1>
    )
}

export default AdminVoteDetails;