
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Box, Text, Button } from '@chakra-ui/react'

function ActiveVotesTable(props) {
    
    const votes = props.data.votes;

    return (
        <Box
            p='20px'
            bg="brand.white"
            borderRadius={{ base: "0", md: "15px" }}
            py={{ base:"20px", md:"30px" }}
            px={{ base:"30px", md:"40px" }}
            boxShadow={{ base: "", md: "sm" }}
        >
            <TableContainer>
                <Table variant='simple'>
            
                    <TableCaption>
                        {/* If no votes, display text */}                    
                        {!votes.length && !props.data.firstTouched && <Text mb='30px' fontWeight='600'>Nu există voturi active!</Text>}
                    </TableCaption>

                    <Thead>
                        <Tr>
                            <Th>Titlu</Th>
                            <Th>Închidere manuală</Th>
                            <Th isNumeric>Acțiuni</Th>
                        </Tr>
                    </Thead>
                    
                    
                    {/* Display active votes */}
                    {votes.map((vote) => (
                        <Tbody>
                            <Tr>
                                <Td maxW='300px'><Text maxW='700px' isTruncated>{vote.title}</Text></Td>
                                <Td>{vote.manual_closing? "DA" : "NU"}</Td>
                                <Td isNumeric>
                                    <Button
                                        colorScheme='gray'
                                        float={{base: "none", md:'right'}}
                                        mr={{base: '10px', md:'0px'}}
                                        px='30px'
                                    >
                                        Stop vot
                                    </Button>

                                    <Button
                                        colorScheme='gray'
                                        float={{base: "none", md:'right'}}
                                        mr={{base: '0px', md:'10px'}}
                                        px='30px'
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