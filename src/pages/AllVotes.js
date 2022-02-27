import VotesList from '../components/Votes/VotesList'
import React, { useState, useEffect, useCallback } from 'react'
import apiClient from '../http-common'


function AllVotes() {
    const [votes, setVotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchVotes = useCallback(() => {
        setIsLoading(true);

        apiClient.get('elections/').then((response) => {
            setVotes(response.data)
            setIsLoading(false)
            setError(null)
        }).catch(error => {
            setIsLoading(false)
            setError(error)
        });
    }, []);

    useEffect(() => {
        fetchVotes();
    }, []);

    // Display if no votes exist
    let content = <p>Nu există voturi!</p>;

    // Display votes if any
    if (votes.length > 0){
        content = <VotesList votes={votes}></VotesList>
    }

    // Display if error
    if (error) {
        content = <p>{error.message}</p>;
    }

    // Display while loading request
    if (isLoading) {
        content = <p>Se încarcă..</p>
    }

    return (
        <React.Fragment> {content} </React.Fragment>
    );
}


export default AllVotes;