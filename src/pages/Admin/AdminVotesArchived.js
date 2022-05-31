import Titlebar from "../../layout/Titlebar";
import React, { useState, useEffect } from "react";
import apiClient from "../../http-common";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ActiveVotesTable from "../../components/Admin/Votes/ActiveVotesTable";

function AdminVotesArchived() {
    const [archivedVoted, setArchivedVoted] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [firstTouch, setFirstTouch] = useState(true);
    const [error, setError] = useState(null);
    const userSelector = useSelector(selector => selector.user);
    const navigate = useNavigate();

    const fetchVotes = () => {
        setIsLoading(true);

        let requestConfig = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        };
        
        apiClient
            .get(`elections/inactive/`, requestConfig)
            .then((response) => {
                setArchivedVoted(response.data);
                setIsLoading(false);
                setError(null);
            })
            .catch((error) => {
                setIsLoading(false);
                setError(error);
            });
    };

    useEffect(() => {
        if (userSelector.id){
            setFirstTouch(false);
            fetchVotes();
        }
    }, [userSelector]);

    return (
        <>
            <Titlebar title='Arhivă' buttonText="Înapoi" button={() => {navigate('/admin/votes')}}/>
            <ActiveVotesTable data={{votes: archivedVoted, isLoading: isLoading}}/>
        </>
    )
}

export default AdminVotesArchived;