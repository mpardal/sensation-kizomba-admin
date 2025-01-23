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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  CircularProgress,
  SimpleGrid,
  AspectRatio,
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { Editor } from '@tiptap/react'
import { getDownloadURL } from 'firebase/storage'
import { Reducer, useEffect, useReducer, useRef, useState } from 'react'
import { MdImage } from 'react-icons/md'
import { useGetStorageImages } from '../../../hooks/use-get-storage-images'
import { useUploadImage } from '../../../hooks/use-upload-image'
import EventEditorActionIconButton from './event-editor-action-icon-button'

type ImageReducerState = {
  loadedFile?: File
  image: string
  loading: boolean
  progress: number
  tooLarge: boolean
}

type ImageReducerAction =
  | { type: 'load'; payload: File }
  | { type: 'image'; payload: string }
  | { type: 'reset' }
  | { type: 'progress'; payload: number }

const imageReducer: Reducer<ImageReducerState, ImageReducerAction> = (state, action) => {
  switch (action.type) {
    case 'load':
      if (action.payload.size < 5 * 1024 * 1024) {
        return {
          ...state,
          loadedFile: action.payload,
          tooLarge: false,
        }
      }

      return { ...state, image: '', tooLarge: true }
    case 'image':
      return {
        ...state,
        image: action.payload,
        loading: false,
        progress: 0,
        tooLarge: false,
      }
    case 'reset':
      return {
        ...state,
        loadedFile: undefined,
        image: '',
        loading: false,
        progress: 0,
        tooLarge: false,
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
  const [currentAccordionIndex, setCurrentAccordionIndex] = useState(1)
  const [isChoosingImage, setChoosingImage] = useState(false)
  const [{ loadedFile, image, loading: loadingImage, progress, tooLarge }, dispatch] = useReducer(
    imageReducer,
    {
      image: '',
      loading: false,
      loadedFile: undefined,
      progress: 0,
      tooLarge: false,
    }
  )
  const queryClient = useQueryClient()
  const eventsImages = useGetStorageImages({
    enabled: currentAccordionIndex === 1 && isChoosingImage,
  })
  const uploadImage = useUploadImage({
    onSuccess: async (data) => {
      onClose()
      // get real url
      editor
        ?.chain()
        .focus()
        .setImage({ src: await getDownloadURL(data.ref) })
        .run()
      editor?.chain().focus().setHardBreak().run()
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
      queryClient.invalidateQueries(['images'])
      setChoosingImage(false)
      dispatch({ type: 'reset' })
    }
  }

  const handleChangeAccordion = (index: number) => {
    if (index === 1) {
      void eventsImages.refetch()
    }

    setCurrentAccordionIndex(index)
  }

  return (
    <>
      <EventEditorActionIconButton
        onClick={() => {
          setChoosingImage(true)
        }}
        aria-label="ajouter une image"
        title="Ajouter une image"
        icon={<MdImage />}
      />
      <Modal isOpen={isChoosingImage} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Image</ModalHeader>
          <ModalCloseButton disabled={isUploading} />

          <ModalBody>
            <Accordion defaultIndex={1} onChange={handleChangeAccordion}>
              <AccordionItem>
                <h3>
                  <AccordionButton px={0} py={4}>
                    <Text flex={1} textAlign="left">
                      Nouvelle image
                    </Text>
                    <AccordionIcon />
                  </AccordionButton>
                </h3>
                <AccordionPanel px={0}>
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
                            type: 'load',
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
                    <FormHelperText>
                      Vous pouvez ajouter une image depuis votre ordinateur
                    </FormHelperText>
                  </FormControl>

                  {loadingImage && <Progress value={progress} size="xs" />}
                  {tooLarge && <Text color="red.500">L'image ne doit pas dépasser 5 Mo</Text>}
                  {image && <Image src={image} alt="image" w="full" mt={4} />}
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h3>
                  <AccordionButton px={0} py={4}>
                    <Text flex={1} textAlign="left">
                      Image existante
                    </Text>
                    <AccordionIcon />
                  </AccordionButton>
                </h3>
                <AccordionPanel px={0}>
                  {eventsImages.isLoading && <CircularProgress isIndeterminate />}
                  {eventsImages.isSuccess && eventsImages.data.items.length > 0 && (
                    <SimpleGrid columns={4} spacing={4}>
                      {eventsImages.data.items.map((image) => {
                        return (
                          <AspectRatio ratio={16 / 9} key={image.item.fullPath}>
                            <Image
                              src={image.url}
                              alt="image"
                              w="full"
                              h="full"
                              objectFit="cover"
                              cursor="pointer"
                              onClick={() => {
                                editor?.chain().focus().setImage({ src: image.url }).run()
                                editor?.chain().focus().joinForward().setParagraph().run()
                                onClose()
                              }}
                            />
                          </AspectRatio>
                        )
                      })}
                    </SimpleGrid>
                  )}
                  {eventsImages.isSuccess && eventsImages.data.items.length === 0 && (
                    <Text color="red.300">Aucune image n'a été trouvée</Text>
                  )}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </ModalBody>

          <ModalFooter as={HStack} spacing={4}>
            <Button variant="ghost" disabled={isUploading} colorScheme="gray" onClick={onClose}>
              Fermer
            </Button>
            <Button
              disabled={isUploading || tooLarge || !loadedFile}
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
