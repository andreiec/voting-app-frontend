import { Flex, Center, Text, Button } from "@chakra-ui/react";
import AdminVoteInactiveQuestionTable from "./AdminVoteInactiveQuestionTable";
import AdminVoteTitle from "./AdminVoteTitle";
import apiClient from "../../../http-common";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function AdminVoteInactive(props) {
    
    const vote = props.data.vote;

    const navigate = useNavigate();

    let requestConfig = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
        },
    };

    const deleteElectionHandler = () => {
        apiClient
            .delete(`elections/${vote.election}/`, requestConfig)
            .then(() => {
                navigate('/admin/votes/archived')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Flex flexDir='column' gap='60px'>
            <AdminVoteTitle data={vote.data}/>

            <Center gap='100px' flexDir='column'>
                {vote.data.questions.map((question, index) => {
                    return (
                        <Flex flexDir='column' alignItems='center' gap='40px' key={index}>
                            <Text fontSize='md' fontWeight='600' w='fit-content'>{question.title}</Text>
                            <AdminVoteInactiveQuestionTable key={index} data={{question: question, submittedVotesCount: 3}}/>
                        </Flex>
                    )
                })}
            </Center>

            <Button onClick={deleteElectionHandler} alignSelf={{base: 'center', md: 'flex-end'}} colorScheme='red' w={{base: '100%', md:'100px'}}>
                <Text mb='3px'>Șterge</Text>
            </Button>
        </Flex>
    )
}

export default AdminVoteInactive;