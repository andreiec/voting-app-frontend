import { SimpleGrid } from '@chakra-ui/react'
import GroupCard from './GroupCard';

function GroupsList(props) {
    return (
        <SimpleGrid minChildWidth={{ base: '17rem', md: '16rem' }} spacing='30px'> {
            props.groups.map((group) => (
                <GroupCard key={group.id} id={group.id} name={group.name} desc={group.description} color={group.color} />
            )) }
        </SimpleGrid>
    )
}

export default GroupsList;