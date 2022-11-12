import { IconButton, IconButtonProps } from '@chakra-ui/react'

function EventEditorActionButton({
  isActive = false,
  children,
  ...props
}: IconButtonProps & { isActive?: boolean }) {
  return (
    <IconButton
      size="sm"
      border={isActive ? '1px solid transparent' : undefined}
      colorScheme={isActive ? undefined : 'gray'}
      variant={isActive ? undefined : 'outline'}
      {...props}
    />
  )
}

export default EventEditorActionButton
