import {
  Button,
  FormControl,
  FormHelperText,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text,
} from '@chakra-ui/react'
import { Editor } from '@tiptap/react'
import { getDownloadURL } from 'firebase/storage'
import { Reducer, useEffect, useReducer, useRef, useState } from 'react'
import { MdImage } from 'react-icons/all'
import { useUploadImage } from '../../../hooks/use-upload-image'
import EventEditorActionIconButton from './event-editor-action-icon-button'

type ImageReducerState = {
  loadedFile?: File
  image: string
  loading: boolean
  progress: number
  toLarge: boolean
}

type ImageReducerAction =
  | { type: 'loadFile'; payload: File }
  | { type: 'image'; payload: string }
  | { type: 'reset' }
  | { type: 'progress'; payload: number }

const imageReducer: Reducer<ImageReducerState, ImageReducerAction> = (state, action) => {
  switch (action.type) {
    case 'loadFile':
      if (action.payload.size < 5 * 1024 * 1024) {
        return {
          ...state,
          loadedFile: action.payload,
          toLarge: false,
        }
      }

      return { ...state, image: '', toLarge: true }
    case 'image':
      return {
        ...state,
        image: action.payload,
        loading: false,
        progress: 0,
        toLarge: false,
      }
    case 'reset':
      return {
        ...state,
        loadedFile: undefined,
        image: '',
        loading: false,
        progress: 0,
        toLarge: false,
        isUploading: false,
      }
    case 'progress':
      return { ...state, progress: action.payload }
    default:
      return state
  }
}

function EventEditorImageAction({ editor }: { editor: Editor | null }) {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [isChoosingImage, setChoosingImage] = useState(false)
  const [{ loadedFile, image, loading: loadingImage, progress, toLarge }, dispatch] = useReducer(
    imageReducer,
    {
      image: '',
      loading: false,
      loadedFile: undefined,
      progress: 0,
      toLarge: false,
    }
  )
  const uploadImage = useUploadImage({
    onSuccess: async (data) => {
      console.log(data)
      onClose()
      // get real url
      editor
        ?.chain()
        .focus()
        .setImage({ src: await getDownloadURL(data.ref) })
        .run()
    },
    onProgress: (snapshot) => {
      dispatch({
        type: 'progress',
        payload: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
      })
    },
  })
  const isUploading = uploadImage.isLoading

  useEffect(() => {
    let reader: FileReader | null = null

    if (loadedFile) {
      reader = new FileReader()
      reader.readAsDataURL(loadedFile)
      reader.onprogress = (progress) => {
        dispatch({ type: 'progress', payload: progress.loaded / progress.total })
      }
      reader.onload = () => {
        dispatch({
          type: 'image',
          payload: reader?.result as string,
        })
      }
    }

    return () => {
      reader?.abort()
    }
  }, [loadedFile])

  const onClose = () => {
    if (!isUploading) {
      setChoosingImage(false)
      dispatch({ type: 'reset' })
    }
  }

  return (
    <>
      <EventEditorActionIconButton
        onClick={() => {
          setChoosingImage(true)
        }}
        aria-label="aligné à gauche"
        icon={<MdImage />}
      />
      <Modal isOpen={isChoosingImage} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Image</ModalHeader>
          <ModalCloseButton disabled={isUploading} />

          <ModalBody>
            <FormControl isRequired>
              <input
                ref={inputFileRef}
                id="event-image"
                name="url"
                type="file"
                hidden
                onChange={(evt) => {
                  const file = evt.currentTarget.files?.item(0)

                  if (file) {
                    dispatch({
                      type: 'loadFile',
                      payload: file,
                    })
                  } else {
                    dispatch({
                      type: 'reset',
                    })
                  }

                  evt.currentTarget.value = ''
                }}
                accept="image/*"
              />
              <Button
                onClick={() => {
                  inputFileRef.current?.click()
                }}
                w="full"
                py={8}
                colorScheme="gray"
                disabled={isUploading}
              >
                Ajouter une image
              </Button>
              <FormHelperText>Vous pouvez ajouter une image depuis votre ordinateur</FormHelperText>
            </FormControl>

            {loadingImage && <Progress value={progress} size="xs" />}
            {toLarge && <Text color="red.500">L'image ne doit pas dépasser 5 Mo</Text>}
            {image && <Image src={image} alt="image" w="full" mt={4} />}
          </ModalBody>

          <ModalFooter as={HStack} spacing={4}>
            <Button variant="ghost" disabled={isUploading} colorScheme="gray" onClick={onClose}>
              Fermer
            </Button>
            <Button
              disabled={isUploading || toLarge || !loadedFile}
              onClick={async () => {
                if (loadedFile) {
                  await uploadImage.mutateAsync(loadedFile)
                }
              }}
              isLoading={isUploading}
              loadingText={
                Math.floor(progress) === 100 ? 'Finalisation' : `${Math.floor(progress)}%`
              }
            >
              Ajouter
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EventEditorImageAction
