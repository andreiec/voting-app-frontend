import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text } from '@chakra-ui/react'


function AdminVoteInactiveQuestionTable(props) {

    const question = props.data.question;
    const userVotes = props.data.userVotes;
    const userLength = props.data.userLength;

    return (
        <TableContainer minW='340px'>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Opțiune</Th>
                        <Th isNumeric>Voturi</Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {question.options.map((option, index) => {
                        let vote_count = 0;
                        let moreThanHalf = false;

                        if (userVotes.has(option.id)) {
                            vote_count = userVotes.get(option.id);
                        }

                        if (vote_count > userLength / 2) {
                            moreThanHalf = true;
                        }

                        return (
                            <Tr key={index}>
                                <Td><Text fontWeight={moreThanHalf? '600' : '500'}>{option.value}</Text></Td>
                                <Td isNumeric><Text fontWeight={moreThanHalf? '600' : '500'}>{vote_count}</Text></Td>
                            </Tr>
                        )
                    })}

                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default AdminVoteInactiveQuestionTable;