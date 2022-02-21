import { chakra } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react'

// props.title, props.desc, props.date

function VotingCard(props) {
    const cardDate = props.date.toLocaleString('en-UK', {year: 'numeric', month: 'short', day: '2-digit'}).split('/').join('.');

    return (
        <chakra.a href='#' px='28px' py='22px' h='13.75rem' w='21.5rem' borderRadius='15px' overflow='hidden' boxShadow='base' backgroundColor='white' placeSelf='center'>
            <Box h='100%'>
                <chakra.h2 fontSize='lg' fontWeight='600' fontFamily='inter'>
                    {props.title}
                </chakra.h2>

                <chakra.h4 fontSize='xs' mt='-2px' fontFamily='inter' color="#767676">
                    {cardDate}
                </chakra.h4>

                <chakra.p mt='10px' fontSize='sm' fontFamily='inter' color="#767676">
                    {props.desc}
                </chakra.p>
            </Box>
        </chakra.a>
    );
}

export default VotingCard;