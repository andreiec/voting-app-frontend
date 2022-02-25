import { SimpleGrid } from '@chakra-ui/react'
import VoteCard from './VoteCard';

function VotesList(props) {
    return (
        <SimpleGrid minChildWidth={{ base: '23rem', md: '21.6rem' }} spacing='30px'> {
            props.votes.map((vote) => (
                <VoteCard key={vote.id} id={vote.id} title={vote.title} date={new Date(vote.created)} desc={vote.description} />
            )) }
        </SimpleGrid>
    )
}

export default VotesList;