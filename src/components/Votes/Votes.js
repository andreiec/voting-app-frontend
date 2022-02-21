import VotingCard from '../VotingCard/VotingCard';
import { useState, useEffect } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import apiClient from '../../http-common'

function Votes() {
    
    const [votes, setVotes] = useState([]);

    useEffect(() => {
        apiClient.get('elections/').then((response) => {
            setVotes(response.data)
        });
    }, []);

    let votesContent = <p>Nu exista vreun vot!</p>

    if (votes.length > 0) {
        votesContent = votes.map((vote) => (
            <VotingCard key={vote.id} title={vote.title} date={new Date(vote.created)} desc={vote.description} />
        ));
    }

    return (
        <SimpleGrid minChildWidth='21.6rem' backgroundColor='#f4f6fd' spacing='30px'>
            {votesContent}
        </SimpleGrid>
    );
}

export default Votes;