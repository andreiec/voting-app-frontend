import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react'

import { useRef } from 'react'

function CustomAlertDialog(props) {
    const cancelRef = useRef();

    return (
        <AlertDialog
        isOpen={props.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={props.onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    {props.data.title}
                </AlertDialogHeader>

                <AlertDialogBody>
                    {props.data.body}
                </AlertDialogBody>

                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={props.onClose}>
                        {props.data.leftButtonText}
                    </Button>
                    <Button colorScheme={props.data.rightButtonColorScheme} onClick={() => {props.onClose(); props.handleAlertConfirm();}} ml={3}>
                        {props.data.rightButtonText}
                    </Button>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default CustomAlertDialog;