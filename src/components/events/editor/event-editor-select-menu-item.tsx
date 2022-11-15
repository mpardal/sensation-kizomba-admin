import { MenuItem, MenuItemProps } from '@chakra-ui/react'
import { Editor } from '@tiptap/react'
import { PropsWithChildren } from 'react'

export function EventEditorSelectMenuItem({
  editor,
  children,
  type,
  attributes = {},
  bg,
  onClick,
  disabled = false,
  ...props
}: PropsWithChildren<
  {
    editor: Editor | null
    type: string
    attributes?: Record<string, number>
    disabled?: boolean
  } & Omit<MenuItemProps, 'color' | 'bgColor' | 'type'>
>) {
  const isActive = editor?.isActive(type, attributes)

  return (
    <MenuItem
      bg={bg ?? (isActive ? 'orange.300' : undefined)}
      color={isActive ? 'gray.800' : undefined}
      onClick={(evt) => {
        if (onClick) {
          onClick(evt)
        } else {
          editor?.chain().focus().setNode(type, attributes).run()
        }
      }}
      pointerEvents={disabled ? 'none' : undefined}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </MenuItem>
  )
}
