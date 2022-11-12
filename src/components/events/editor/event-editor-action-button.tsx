import { Button, ButtonProps } from '@chakra-ui/react'

function EventEditorActionButton({
  isActive = false,
  children,
  ...props
}: ButtonProps & { isActive?: boolean }) {
  return (
    <Button
      size="sm"
      border={isActive ? '1px solid transparent' : undefined}
      colorScheme={isActive ? undefined : 'gray'}
      variant={isActive ? undefined : 'outline'}
      {...props}
    >
      {children}
    </Button>
  )
}

export default EventEditorActionButton
