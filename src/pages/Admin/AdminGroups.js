import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import apiClient from "../../http-common";
import GroupsTable from "../../components/Admin/Groups/GroupsTable";
import Titlebar from "../../layout/Titlebar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Flex, Text } from "@chakra-ui/react";

function AdminGroups() {

    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const userSelector = useSelector(selector => selector.user);

    const navigate = useNavigate();

    const fetchGroups = () => {
        setIsLoading(true);

        let requestConfig = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        };

        apiClient
            .get(`groups/`, requestConfig)
            .then((response) => {
                setGroups(response.data);
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
            fetchGroups();
        }
    }, [userSelector]);

    return (
        <>
            <Titlebar title='Grupuri' button={() => {navigate("/admin/")}} buttonText="Înapoi" />
            <GroupsTable data={{groups: groups, isLoading: isLoading}} />

            {/* Add a new vote button */}
            <Flex 
                mx={{base: '30px', md: '0px'}}
                flexDir={{base: 'column', md: 'row'}}
                gap='15px' mt='20px'
                justifyContent='space-between'
            >
                <Button
                    colorScheme='green'
                    boxShadow='base'
                    onClick={() => navigate('/create-group')}
                >
                    <Text
                        mb='3px'
                        fontWeight='600'
                        px='10px'
                    >
                        Adaugă un grup
                    </Text>
                </Button>
            </Flex>
        </>
    )
}

export default AdminGroups;