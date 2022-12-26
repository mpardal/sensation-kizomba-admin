import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import { useRef } from 'react'

function DeleteEventAlertDialog({
  title,
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: {
  title: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading: boolean
}) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={() => !isLoading && onClose()}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>Suppression de {title}</AlertDialogHeader>
          <AlertDialogBody>Vous allez supprimer cet événement</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} colorScheme="gray" disabled={isLoading}>
              Annuler
            </Button>
            <Button
              colorScheme="red"
              onClick={async () => {
                await onConfirm()
              }}
              ml={3}
              isLoading={isLoading}
            >
              Supprimer
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default DeleteEventAlertDialog
