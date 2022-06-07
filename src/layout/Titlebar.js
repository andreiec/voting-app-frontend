import { Button, Flex, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux";

function Titlebar(props) {
    const userSelector = useSelector(selector => selector.user);

    return (
        <Flex
            flexDir={{base: 'column', md:'row'}}
            justifyContent={{base: 'center', md: 'space-between'}}
            px='2px'
            flexWrap='wrap'
            columnGap='30px'
            rowGap='15px'
            mb='25px'
            alignItems='center'
        >
            {props.title && <Text
                fontSize='2xl'
                fontWeight='600'
                flexGrow='1'
            >
                {props.title}
            </Text>
            }
            
            {userSelector.is_staff && props.adminButtonText && <Button
                colorScheme='green'
                boxShadow='base'
                //borderRadius='15px'
                onClick={props.adminButton}
            >
                <Text mb='3px' fontWeight='600' px='10px'>{props.adminButtonText}</Text>
            </Button>
            }

            {props.buttonText && <Button
                colorScheme='blue'
                boxShadow='base'
                w={{base: '150px', md: 'fit-content'}}//borderRadius='15px'
                onClick={props.button}
            >
                <Text mb='3px' fontWeight='600' px='10px'>{props.buttonText}</Text>
            </Button>
            }

        </Flex>
    )
}

export default Titlebar;
