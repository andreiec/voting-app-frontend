import { Center, Table, TableContainer, Tbody, Text, Th, Thead, Tr, Td } from "@chakra-ui/react";


function GroupUsersTable(props) {

    const users = props.data.users;

    return (
        <Center mb='50px'>
            <TableContainer minW='340px'>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Nume</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {users.map((user, index) => {
                            return (
                                <Tr key={index}>
                                    <Td><Text fontSize='sm'>{user.last_name} {user.first_name}</Text></Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Center>
    )
}

export default GroupUsersTable;