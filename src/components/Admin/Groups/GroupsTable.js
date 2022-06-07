
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Box, Text, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

function GroupsTable(props) {
    
    const groups = props.data.groups;
    const navigate = useNavigate();

    return (
        <Box
            p='20px'
            bg="white"
            borderRadius={{ base: "0", md: "15px" }}
            py={{ base:"20px", md:"30px" }}
            px={{ base:"30px", md:"40px" }}
            boxShadow={{ base: "", md: "sm" }}
        >
            <TableContainer>
                <Table variant='simple'>
            
                    <TableCaption>
                        {/* If no groups, display text */}                    
                        {!groups.length && !props.data.isLoading && <Text mb='30px' fontWeight='600'>Nu există grupuri!</Text>}
                    </TableCaption>

                    <Thead>
                        <Tr>
                            <Th>Nume</Th>
                            <Th isNumeric>Acțiuni</Th>
                        </Tr>
                    </Thead>
                    
                    {/* Display groups */}
                    {groups.map((group, index) => (
                        <Tbody key={index}>
                            <Tr>
                                <Td maxW='300px'><Text maxW='700px' isTruncated>{group.name}</Text></Td>
                                <Td isNumeric>
                                    <Button
                                        colorScheme='gray'
                                        float={{base: "none", md:'right'}}
                                        mr={{base: '0px', md:'10px'}}
                                        px='30px'
                                        onClick={() => navigate(`/admin/groups/${group.id}`)}
                                    >
                                        Detalii
                                    </Button>
                                </Td>
                            </Tr>
                        </Tbody>
                    ))}

                </Table>
            </TableContainer>
        </Box>
    )
}

export default GroupsTable;