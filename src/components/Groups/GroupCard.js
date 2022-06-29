import { chakra, LinkBox, Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function VoteCard(props) {
    return (
        <LinkBox
            as={Link}
            to={"/groups/" + props.id}
            h="10rem"
            w="16rem"
            borderRadius="15px"
            overflow="hidden"
            boxShadow="base"
            backgroundColor="white"
            placeSelf="center"
        >
            <Box w="full" h="25px" bg={props.color}></Box>
            <Box mx="28px" mb="22px" mt="12px">
                <Text
                    fontSize="lg"
                    fontWeight="600"
                    color="gray.900"
                >
                    {props.name}
                </Text>

                <Text
                    mt="5px"
                    fontSize="sm"
                    color="gray.500"
                >
                    {props.desc}
                </Text>
            </Box>
        </LinkBox>
    );
}

export default VoteCard;
