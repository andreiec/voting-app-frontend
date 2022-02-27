import { Flex, SimpleGrid } from '@chakra-ui/react'
import { Fragment } from 'react';
import VoteCard from './VoteCard';

function VotesList(props) {
    const allVotesList = props.votes;
    let moreThanTwoVotes = false;

    if (allVotesList.length > 10) {
        moreThanTwoVotes = true;
    }

    // minChildWidth={{ base: '23rem', md: '21.6rem' }}

    return (
        <Flex columnGap={{base:'80px', md:'30px'}} rowGap='30px' flexWrap='wrap' justifyContent={{base:'center', md:'flex-start'}}> {
            allVotesList.map((vote) => (
                <VoteCard key={vote.id} id={vote.id} title={vote.title} date={new Date(vote.created)} desc={vote.description} />
            )) } 
        </Flex> 
    )
}

export default VotesList;