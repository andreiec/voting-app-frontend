import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import apiClient from "../../http-common";
import UsersTable from "../../components/Admin/Users/UsersTable";
import Titlebar from "../../layout/Titlebar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Flex, Text } from "@chakra-ui/react";

function AdminUsers() {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const userSelector = useSelector(selector => selector.user);

    const navigate = useNavigate();

    const fetchUsers = () => {
        setIsLoading(true);

        let requestConfig = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        };

        apiClient
            .get(`users/`, requestConfig)
            .then((response) => {
                setUsers(response.data);
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
            fetchUsers();
        }
    }, [userSelector]);

    return (
        <>
            <Titlebar title='Utilizatori' button={() => {navigate("/admin/")}} buttonText="Înapoi" />
            <UsersTable data={{users: users, isLoading: isLoading}} />

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
                    onClick={() => navigate('/create-user')}
                >
                    <Text
                        mb='3px'
                        fontWeight='600'
                        px='10px'
                    >
                        Adaugă un user
                    </Text>
                </Button>
            </Flex>
        </>
    )
}

export default AdminUsers;