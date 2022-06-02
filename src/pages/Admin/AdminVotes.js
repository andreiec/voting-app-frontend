import Titlebar from "../../layout/Titlebar";
import React, { useState, useEffect } from "react";
import apiClient from "../../http-common";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ActiveVotesTable from "../../components/Admin/Votes/ActiveVotesTable";
import { Button, Flex, Text } from "@chakra-ui/react";

function AdminVotes() {
    const [activeVotes, setActiveVotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [firstTouch, setFirstTouch] = useState(true);
    const [error, setError] = useState(null);
    const userSelector = useSelector(selector => selector.user);
    const navigate = useNavigate();

    const fetchVotes = () => {
        setIsLoading(true);

        let requestConfig = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        };
        
        apiClient
            .get(`elections/active/`, requestConfig)
            .then((response) => {
                setActiveVotes(response.data);
                setIsLoading(false);
                setError(null);
            })
            .catch((error) => {
                setIsLoading(false);
                setError(error);
            });
    };

    useEffect(() => {
        if (userSelector.id){
            setFirstTouch(false);
            fetchVotes();
        }
    }, [userSelector]);

    return (
        <>
            <Titlebar title='Voturi active' buttonText="Înapoi" button={() => {navigate('/admin')}}/>
            <ActiveVotesTable isArchivePage={false} data={{votes: activeVotes, isLoading: isLoading}}/>
            
            <Flex 
                mx={{base: '30px', md: '0px'}}
                flexDir={{base: 'column', md: 'row'}}
                gap='15px' mt='20px'
                justifyContent='space-between'>

                {/* Add a new vote button */}
                <Button
                    colorScheme='green'
                    boxShadow='base'
                    onClick={() => navigate('/create-vote')}
                >
                    <Text
                        mb='3px'
                        fontWeight='600'
                        px='10px'
                    >
                        Adaugă un vot
                    </Text>
                </Button>

                <Button
                    colorScheme='blue'
                    float={{base: "none", md:'right'}}
                    w={{base: "100%", md: '120px'}}
                    onClick={() => navigate('/admin/votes/archived')}
                >
                    <Text mb='3px'>
                        Arhivă
                    </Text>
                </Button>
            </Flex>
        </>
    )
}

export default AdminVotes;