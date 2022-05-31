import { Center, Icon, Table, TableContainer, Tbody, Text, Th, Thead, Tr, Td } from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'


function AdminVoteSubmittedVotes(props) {

    const users = props.data.users;
    const userSubmissions = props.data.userSubmissions;

    return (
        <Center mb='50px'>
            <TableContainer minW='340px'>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Nume</Th>
                            <Th isNumeric>Votat</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {users.map((user, index) => {
                            const hasVoted = userSubmissions.some((element) => {return element.user === user.id});

                            return (
                                <Tr key={index}>
                                    <Td><Text fontSize='sm'>{user.last_name} {user.first_name}</Text></Td>
                                    <Td isNumeric><Icon as={hasVoted? FaCheckCircle : FaTimesCircle} color={hasVoted ? 'green' : 'red'} w='0.8rem'></Icon></Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Center>
    )
}

export default AdminVoteSubmittedVotes;