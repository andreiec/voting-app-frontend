import { chakra, LinkBox, Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom';

function VoteCard(props) {
    return (
        <LinkBox as={Link} to={'/groups/' + props.id} h='10rem' w='16rem' borderRadius='15px' overflow='hidden' boxShadow='base' backgroundColor='white' placeSelf='center'>
            <Box mx='28px' my='22px'>
                <Text color={props.color}>COLOR</Text>
                <chakra.h2 fontSize='lg' fontWeight='600' fontFamily='inter'>
                    {props.name}
                </chakra.h2>

                <chakra.p mt='10px' fontSize='sm' fontFamily='inter' color="#767676">
                    {props.desc}
                </chakra.p>
            </Box>
        </LinkBox>
    );
}

export default VoteCard;