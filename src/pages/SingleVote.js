import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useCallback, Fragment } from 'react'
import apiClient from '../http-common'
import NotFound from './NotFound';
import Layout from '../layout/Layout';

function SingleVote() {
    const params = useParams();

    const [vote, setVote] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchVote = useCallback(() => {
        setIsLoading(true);

        apiClient.get('elections/' + params.id + '/').then((response) => {
            setVote(response.data)
            setIsLoading(false)
            setError(null)
        }).catch(error => {
            setIsLoading(false)
            setError(error)
        });
    }, []);

    useEffect(() => {
        fetchVote();
    }, []);

    let content = <p>{JSON.stringify(vote)}</p>;

    if (error) {

        // If 404 put not found
        if (error.response.status === 404 || error.response.status === 400) {
            return(<NotFound />)
        }

        content = <p>{error.message}</p>;
    }

    // Display while loading request
    if (isLoading) {
        content = <p>Se încarcă..</p>
    }

    return (
        <Fragment>
            {content}
        </Fragment>
    )
};

export default SingleVote;