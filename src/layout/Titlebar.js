import { Button, Flex, Text } from "@chakra-ui/react"

function Titlebar(props) {

    return (
        <Flex
            flexDir='row'
            justifyContent={{base: 'center', md: 'space-between'}}
            px='50px'
            flexWrap='wrap'
            columnGap='30px'
            rowGap='15px'
            mb='25px'
            alignItems='center'
        >
            {props.title && <Text
                fontSize='2xl'
                fontWeight='600'
                
            >
                {props.title}
            </Text>
            }

            {props.button && <Button
                color='brand.white'
                bg='brand.main_blue'
                boxShadow='base'
                _hover={ { bg: 'brand.blue_light'} }
                borderRadius='15px'
                onClick={props.button}
            >
                <Text mb='3px' fontWeight='600' px='10px'>{props.buttonText}</Text>
            </Button>
            }

        </Flex>
    )
}

export default Titlebar;
