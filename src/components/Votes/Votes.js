import VotingCard from '../VotingCard/VotingCard';
import { useState } from 'react'
import { SimpleGrid } from '@chakra-ui/react'

function Votes(props) {
    
    const [votes, setVotes] = useState(props.votes);

    let votesContent = <p>Nu exista vreun vot!</p>
    
    if (props.votes.length > 0) {
        votesContent = votes.map((vote) => (
            <VotingCard key={vote.id} title={vote.title} date={new Date(vote.created)} desc={vote.description} />
        ));
    }
    //minChildWidth=345
    return (
        <SimpleGrid columns={[1, 2, 3]}  p='10' backgroundColor='#f4f6fd' spacing='50px'>
            {votesContent}
        </SimpleGrid>
    );
}

export default Votes;