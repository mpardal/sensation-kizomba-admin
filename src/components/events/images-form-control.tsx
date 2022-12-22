import { Box, Button, Flex, FormControl, Image } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useRef, useState } from 'react'
import { useGetDownloadUrls } from '../../hooks/use-get-download-urls'
import { EventFormZodValues } from '../../utils/form/event-form-zod'

type UseFormikResult = ReturnType<
  typeof useFormik<
    Omit<EventFormZodValues, 'dateFrom' | 'dateTo'> & { dateFrom: string; dateTo: string }
  >
>

function ImagesFormControl({
  values,
  setFieldValue,
}: {
  values: UseFormikResult['values']
  setFieldValue: (field: string, value: unknown) => void
}) {
  const [counter, setCount] = useState(0)
  const [urls, setUrls] = useState<{ id: number | string; data: string }[]>([])
  const imagesInputRef = useRef<HTMLInputElement>(null)
  const [gotUrls, setGotUrls] = useState(false)

  const downloadUrls = useGetDownloadUrls(
    (values.images?.filter((i) => typeof i === 'string') as string[]) ?? [],
    {
      enabled: !gotUrls,
      onSuccess: (urls) => {
        setUrls(
          urls.map((url) => {
            return {
              id: url,
              data: url,
            }
          })
        )
      },
      onSettled: () => {
        setGotUrls(true)
      },
    }
  )

  return (
    <>
      <FormControl>
        <input
          disabled={downloadUrls.isLoading}
          type="file"
          accept="image/*"
          multiple
          id="images"
          name="images"
          onChange={async (evt) => {
            const fileList = evt.target.files as FileList

            const files = Array.from(fileList)
            setFieldValue('images', [...(values.images ?? []), ...files])

            const dataURLs = (
              await Promise.allSettled(
                files.map((file) => {
                  const fileReader = new FileReader()

                  return new Promise<string>((resolve, reject) => {
                    fileReader.onload = (evt) => {
                      resolve(evt.target?.result as string)
                    }
                    fileReader.onerror = (evt) => {
                      reject(evt)
                    }
                    fileReader.readAsDataURL(file)
                  })
                })
              )
            )
              .filter((result) => result.status === 'fulfilled')
              .map((result) => {
                return (result as PromiseFulfilledResult<string>).value
              })

            const count = counter

            setCount((count) => count + dataURLs.length)
            setUrls((data) => [
              ...data,
              ...dataURLs.map((dataURL, index) => ({ id: count + index, data: dataURL })),
            ])

            // @ts-expect-error - resetting the value of the input make uploadable the same file twice. This expect-error is here to avoid TS-ERROR on readonly field.
            imagesInputRef.current.value = ''
          }}
          ref={imagesInputRef}
          hidden
        />
        <Button
          size="sm"
          isLoading={downloadUrls.isLoading}
          disabled={downloadUrls.isLoading}
          onClick={() => {
            imagesInputRef.current?.click()
          }}
        >
          Ajouter des images
        </Button>
      </FormControl>
      <Flex
        as="section"
        flexWrap="wrap"
        gap={4}
        role="tablist"
        aria-label="liste des images ajoutées"
      >
        {urls.map((dataURLImage, i) => (
          <Box
            as="article"
            key={dataURLImage.id}
            pos="relative"
            sx={{
              '&:hover > button': {
                opacity: 1,
              },
            }}
            role="tab"
          >
            <Button
              opacity={0}
              size="sm"
              pos="absolute"
              left="50%"
              sx={{
                '&:focus-visible': {
                  opacity: 1,
                },
              }}
              top="50%"
              transform="translate(-50%, -50%)"
              colorScheme="red"
              h="full"
              w="full"
              onClick={() => {
                setUrls(urls.filter((_, j) => j !== i))
                setFieldValue(
                  'images',
                  values.images?.filter((_, j) => j !== i)
                )
              }}
              tabIndex={0}
            >
              Supprimer
            </Button>
            <Image
              src={dataURLImage.data}
              boxSize="100px"
              objectFit="cover"
              alt={`image ajoutée ${i}`}
              borderRadius="md"
            />
          </Box>
        ))}
      </Flex>
    </>
  )
}

export default ImagesFormControl
