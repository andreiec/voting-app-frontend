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
                color='brand.white'
                bg='brand.green'
                boxShadow='base'
                _hover={ { bg: 'brand.green_light'} }
                //borderRadius='15px'
                onClick={props.adminButton}
            >
                <Text mb='3px' fontWeight='600' px='10px'>{props.adminButtonText}</Text>
            </Button>
            }

            {props.buttonText && <Button
                colorScheme='blue'
                boxShadow='base'
                //borderRadius='15px'
                onClick={props.button}
            >
                <Text mb='3px' fontWeight='600' px='10px'>{props.buttonText}</Text>
            </Button>
            }

        </Flex>
    )
}

export default Titlebar;
