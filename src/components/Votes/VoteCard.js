import { chakra, LinkBox, Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
// props.title, props.desc, props.date

function VoteCard(props) {
    const cardDate = props.date
        .toLocaleString("en-UK", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        })
        .split("/")
        .join(".");

    return (
        <LinkBox
            as={Link}
            to={"/votes/" + props.id}
            h="13.75rem"
            w="21.2rem"
            borderRadius="15px"
            overflow="hidden"
            boxShadow="base"
            backgroundColor="white"
            placeSelf="center"
        >
            <Box mx="28px" my="22px">
                <Text
                    fontSize="lg"
                    fontWeight="600"
                    fontFamily="inter"
                    color="brand.text_title"
                >
                    {props.title}
                </Text>

                <Text
                    fontSize="xs"
                    mt="-2px"
                    fontFamily="inter"
                    color="brand.text_body"
                >
                    {cardDate}
                </Text>

                <Text
                    mt="10px"
                    fontSize="sm"
                    fontFamily="inter"
                    color="brand.text_body"
                >
                    {props.desc}
                </Text>
            </Box>
        </LinkBox>
    );
}

export default VoteCard;
