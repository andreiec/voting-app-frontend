import { Flex } from "@chakra-ui/react";
import VoteCard from "./VoteCard";

function VotesList(props) {
    const allVotesList = props.votes;
    let moreThanTwoVotes = false;

    if (allVotesList.length > 10) {
        moreThanTwoVotes = true;
    }

    // minChildWidth={{ base: '23rem', md: '21.6rem' }}

    return (
        <Flex
            columnGap={{ base: "80px", md: "30px" }}
            rowGap="30px"
            flexWrap="wrap"
            justifyContent={{ base: "center", md: "flex-start" }}
            alignContent='start'
            minW="21.5rem"
            maxW={ props.mainMenu && {base: '', md:'calc(100% - 23.4rem)'}}
        >
            {allVotesList.map((vote) => (
                <VoteCard
                    key={vote.id}
                    id={vote.id}
                    title={vote.title}
                    date={new Date(vote.created)}
                    desc={vote.description}
                />
            ))}
        </Flex>
    );
}

export default VotesList;
