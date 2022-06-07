
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Box, Text, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

function ActiveVotesTable(props) {
    
    const votes = props.data.votes;
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
                        {/* If no votes, display text */}                    
                        {!votes.length && !props.data.isLoading && <Text mb='30px' fontWeight='600'>Nu există voturi {props.isArchivePage? "arhivate":"active"}!</Text>}
                    </TableCaption>

                    <Thead>
                        <Tr>
                            <Th>Titlu</Th>
                            {/*<Th>Închidere manuală</Th>*/}
                            <Th isNumeric>Acțiuni</Th>
                        </Tr>
                    </Thead>
                    
                    
                    {/* Display active votes */}
                    {votes.map((vote, index) => (
                        <Tbody key={index}>
                            <Tr>
                                <Td maxW='300px'><Text maxW='700px' isTruncated>{props.isArchivePage? vote.data.title: vote.title}</Text></Td>
                                {/*<Td>{vote.manual_closing? "DA" : "NU"}</Td>*/}
                                <Td isNumeric>
                                    <Button
                                        colorScheme='gray'
                                        float={{base: "none", md:'right'}}
                                        mr={{base: '0px', md:'10px'}}
                                        px='30px'
                                        onClick={() => navigate(props.isArchivePage? `/admin/votes/archived/${vote.id}` : `/admin/votes/${vote.id}`)}
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

export default ActiveVotesTable;