import { Flex } from "@chakra-ui/react";
import CreateVoteForm from "../components/Forms/CreateVoteForm";

function CreateVote() {
    return (
        <Flex
            bg="brand.white"
            borderRadius={{ base: "0", md: "15px" }}
            py={{ base:"20px", md:"60px" }}
            px={{ base:"30px", md:"80px" }}
            boxShadow={{ base: "", md: "sm" }}
            flexDir="column"
        >
            <CreateVoteForm />
        </Flex>
    )
}

export default CreateVote;