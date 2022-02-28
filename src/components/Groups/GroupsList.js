import { Flex } from '@chakra-ui/react'
import GroupCard from './GroupCard';

function GroupsList(props) {
    return (
        <Flex columnGap={{base:'260px', md:'30px'}} rowGap='30px' flexWrap='wrap' justifyContent={{base:'center', md:'flex-start'}}> {
            props.groups.map((group) => (
                <GroupCard key={group.id} id={group.id} name={group.name} desc={group.description} color={group.color} />
            )) }
        </Flex>
    )
}

export default GroupsList;