import './Votes.css'
import VotingCard from '../VotingCard/VotingCard';
import { useState } from 'react'

function Votes(props) {
    
    const [votes, setVotes] = useState(props.votes);

    let votesContent = <p>Nu exista vreun vot!</p>
    
    if (props.votes.length > 0) {
        votesContent = votes.map((vote) => (
            <VotingCard key={vote.id} title={vote.title} date={new Date(vote.created)} desc={vote.description} />
        ));
    }

    return (
        <div>
            {votesContent}
        </div>
    );
}

export default Votes;