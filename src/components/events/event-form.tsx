import { CheckIcon, WarningIcon } from '@chakra-ui/icons'
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Select,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { PropsWithChildren, useEffect } from 'react'
import { EventFormZodValues } from '../../utils/form/event-form-zod'
import EventEditor from './editor/event-editor'
import ImagesFormControl from './images-form-control'

type UseFormikResult = ReturnType<
  typeof useFormik<
    Omit<EventFormZodValues, 'dateFrom' | 'dateTo'> & { dateFrom: string; dateTo: string }
  >
>

function EventForm({
  handleBlur,
  handleChange,
  values,
  setFieldValue,
  errors,
  children,
}: PropsWithChildren<{
  handleChange: UseFormikResult['handleChange']
  handleBlur: UseFormikResult['handleBlur']
  values: UseFormikResult['values']
  setFieldValue: UseFormikResult['setFieldValue']
  errors: UseFormikResult['errors']
}>) {
  useEffect(() => {
    if (values.dateTo !== undefined) {
      setFieldValue('type', 'weekly')
    }
  }, [])

  useEffect(() => {
    if (values.dateFrom !== '') {
      if (values.dateTo === undefined) {
        return
      }

      const from = new Date(values.dateFrom)
      const to = new Date(values.dateTo)

      if (from > to) {
        setFieldValue('dateTo', '')
      }
    }
  }, [values.dateFrom, values.dateTo])

  return (
    <>
      <VStack py={4} alignItems="stretch">
        <FormControl>
          <InputGroup>
            <InputLeftElement>
              <Tooltip label={errors.title} isDisabled={!errors.title}>
                {errors.title ? <WarningIcon color="red.500" /> : <CheckIcon color="green.500" />}
              </Tooltip>
            </InputLeftElement>
            <Input
              type="text"
              id="title"
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              placeholder="Nom de l'événement"
            />
          </InputGroup>
        </FormControl>

        <HStack alignItems="stretch">
          <FormControl>
            <InputGroup>
              <InputLeftAddon pl={3}>
                <Tooltip label={errors.dateFrom} isDisabled={!errors.dateFrom}>
                  {errors.dateFrom ? (
                    <WarningIcon color="red.500" />
                  ) : (
                    <CheckIcon color="green.500" />
                  )}
                </Tooltip>
                <Box pl={3}>Début</Box>
              </InputLeftAddon>
              <Input
                type="datetime-local"
                id="dateFrom"
                name="dateFrom"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.dateFrom}
                placeholder="Date de début"
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <InputGroup>
              <InputLeftAddon pl={3}>
                <Tooltip label={errors.dateTo} isDisabled={!errors.dateTo}>
                  {errors.dateTo ? (
                    <WarningIcon color="red.500" />
                  ) : (
                    <CheckIcon color="green.500" />
                  )}
                </Tooltip>
                <Box pl={3}>Fin</Box>
              </InputLeftAddon>
              <Input
                type="datetime-local"
                id="dateTo"
                name="dateTo"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.dateTo}
                min={values.dateFrom}
                placeholder="Date de fin"
              />
            </InputGroup>
          </FormControl>
        </HStack>

        <FormControl>
          <InputGroup>
            <InputLeftElement>
              <Tooltip label={errors.address} isDisabled={!errors.address}>
                {errors.address ? <WarningIcon color="red.500" /> : <CheckIcon color="green.500" />}
              </Tooltip>
            </InputLeftElement>
            <Input
              type="text"
              id="address"
              name="address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
              placeholder="Adresse complète"
            />
          </InputGroup>
        </FormControl>

        <FormControl>
          <InputGroup>
            <InputLeftElement>
              <Tooltip label={errors.city} isDisabled={!errors.city}>
                {errors.city ? <WarningIcon color="red.500" /> : <CheckIcon color="green.500" />}
              </Tooltip>
            </InputLeftElement>
            <Select
              id="city"
              name="city"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.city}
              sx={{
                paddingLeft: 10,
              }}
              title="Localité"
            >
              <option value="nantes">Nantes</option>
              <option value="bordeaux">Bordeaux</option>
              <option value="le-mans">Le Mans</option>
              <option value="orleans">Orléans</option>
            </Select>
          </InputGroup>
        </FormControl>

        <FormControl>
          <InputGroup>
            <InputLeftElement>
              <Tooltip label={errors.type} isDisabled={!errors.type}>
                {errors.type ? <WarningIcon color="red.500" /> : <CheckIcon color="green.500" />}
              </Tooltip>
            </InputLeftElement>
            <Select
              id="type"
              name="type"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.type}
              sx={{
                paddingLeft: 10,
              }}
              title="récurrence de l'événement"
            >
              <option value="weekly">Hebdomadaire</option>
              <option value="monthly">Mensuel</option>
              <option value="quarterly">Trimestriel</option>
              <option value="yearly">Annuel</option>
            </Select>
          </InputGroup>
        </FormControl>

        <FormControl>
          <InputGroup>
            <InputLeftElement>
              <Tooltip label={errors.weezeventUrl} isDisabled={!errors.weezeventUrl}>
                {errors.weezeventUrl ? (
                  <WarningIcon color="red.500" />
                ) : (
                  <CheckIcon color="green.500" />
                )}
              </Tooltip>
            </InputLeftElement>
            <Input
              type="url"
              id="weezeventUrl"
              name="weezeventUrl"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.weezeventUrl}
              placeholder="URL du weezevent"
            />
          </InputGroup>
        </FormControl>

        <ImagesFormControl values={values} setFieldValue={setFieldValue} />

        <FormControl>
          <FormLabel
            htmlFor="description"
            aria-label="description visuel de l'événement"
            display="flex"
            gap={2}
            alignItems="center"
          >
            <span>Description</span>
            {errors.description && (
              <FormHelperText color="red.500" as="span" mt={0}>
                {errors.description}
              </FormHelperText>
            )}
          </FormLabel>
          <EventEditor
            id="description"
            name="description"
            onChange={(value) => setFieldValue('description', value)}
          />
        </FormControl>
      </VStack>

      {children}
    </>
  )
}

export default EventForm
