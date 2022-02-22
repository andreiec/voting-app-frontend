import { SimpleGrid } from '@chakra-ui/react'
import VotingCard from './VotingCard';

function VotesList(props) {
    return (
        <SimpleGrid minChildWidth='21.6rem' backgroundColor='#f4f6fd' spacing='30px'> {
            props.votes.map((vote) => (
                <VotingCard key={vote.id} title={vote.title} date={new Date(vote.created)} desc={vote.description} />
            )) }
        </SimpleGrid>
    )
}

export default VotesList;