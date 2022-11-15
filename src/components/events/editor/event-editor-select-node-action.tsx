import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Button, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { Editor } from '@tiptap/react'
import { EventEditorSelectMenuItem } from './event-editor-select-menu-item'

function getNodePerType(editor: Editor | null): string {
  if (!editor) return 'Paragraphe'

  if (editor.isActive('paragraph')) return 'Paragraphe'
  if (editor.isActive('heading', { level: 1 })) return 'Titre (h1)'
  if (editor.isActive('heading', { level: 2 })) return 'Titre (h2)'
  if (editor.isActive('heading', { level: 3 })) return 'Titre (h3)'
  if (editor.isActive('heading', { level: 4 })) return 'Titre (h4)'
  if (editor.isActive('heading', { level: 5 })) return 'Titre (h5)'
  if (editor.isActive('heading', { level: 6 })) return 'Titre (h6)'

  return 'Paragraphe'
}

function EventEditorSelectNodeAction({ editor }: { editor: Editor | null }) {
  const activeNode = getNodePerType(editor)

  return (
    <Box>
      <Menu isLazy>
        <MenuButton as={Button} size="sm" rightIcon={<ChevronDownIcon />}>
          {activeNode}
        </MenuButton>
        <MenuList>
          <EventEditorSelectMenuItem
            editor={editor}
            type="paragraph"
            disabled={activeNode === 'Paragraphe'}
          >
            Paragraphe (p)
          </EventEditorSelectMenuItem>
          <EventEditorSelectMenuItem
            editor={editor}
            type="heading"
            attributes={{ level: 6 }}
            fontSize="2xl"
            disabled={activeNode === 'Titre (h6)'}
          >
            Titre (h6)
          </EventEditorSelectMenuItem>
          <EventEditorSelectMenuItem
            editor={editor}
            type="heading"
            attributes={{ level: 5 }}
            fontSize="3xl"
            disabled={activeNode === 'Titre (h5)'}
          >
            Titre (h5)
          </EventEditorSelectMenuItem>
          <EventEditorSelectMenuItem
            editor={editor}
            type="heading"
            attributes={{ level: 4 }}
            fontSize="4xl"
            disabled={activeNode === 'Titre (h4)'}
          >
            Titre (h4)
          </EventEditorSelectMenuItem>
          <EventEditorSelectMenuItem
            editor={editor}
            type="heading"
            attributes={{ level: 3 }}
            fontSize="5xl"
            disabled={activeNode === 'Titre (h3)'}
          >
            Titre (h3)
          </EventEditorSelectMenuItem>
          <EventEditorSelectMenuItem
            editor={editor}
            type="heading"
            attributes={{ level: 2 }}
            fontSize="6xl"
            disabled={activeNode === 'Titre (h2)'}
          >
            Titre (h2)
          </EventEditorSelectMenuItem>
          <EventEditorSelectMenuItem
            editor={editor}
            type="heading"
            attributes={{ level: 1 }}
            fontSize="7xl"
            disabled={activeNode === 'Titre (h1)'}
          >
            Titre (h1)
          </EventEditorSelectMenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default EventEditorSelectNodeAction
