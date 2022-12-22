import { HStack, Stack, Wrap, WrapItem } from '@chakra-ui/react'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { Underline } from '@tiptap/extension-underline'
import { TextAlign } from '@tiptap/extension-text-align'
import { Image } from '@tiptap/extension-image'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import EventEditorBlockActions from './event-editor-block-actions'
import EventEditorImageAction from './event-editor-image-action'
import EventEditorLineActions from './event-editor-line-actions'
import EventEditorSelectNodeAction from './event-editor-select-node-action'
import EventEditorTextAlignActions from './event-editor-text-align-actions'
import EventEditorTextDecorationActions from './event-editor-text-decoration-actions'
import EventEditorTextStyleActions from './event-editor-text-style-actions'
import EventEditorUndoRedoActions from './event-editor-undo-redo-actions'

function EventEditor({
  id,
  name,
  defaultValue,
  onChange,
}: {
  id: string
  name: string
  defaultValue: string
  onChange: (value: string) => void
}) {
  // TODO: gérer la taille d'images, gérer les liens
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
      }),
      Image.configure({
        inline: true,
      }),
    ],
    content: defaultValue,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  return (
    <Stack direction="column" mb={12}>
      <Wrap spacing={4} p={2}>
        <WrapItem>
          <HStack>
            <EventEditorUndoRedoActions editor={editor} />
          </HStack>
        </WrapItem>
        <WrapItem>
          <HStack>
            <EventEditorSelectNodeAction editor={editor} />
            <EventEditorTextStyleActions editor={editor} />
            <EventEditorImageAction editor={editor} />
          </HStack>
        </WrapItem>
        <WrapItem>
          <HStack>
            <EventEditorTextDecorationActions editor={editor} />
          </HStack>
        </WrapItem>
        <WrapItem>
          <HStack>
            <EventEditorTextAlignActions editor={editor} />
          </HStack>
        </WrapItem>
        <WrapItem>
          <HStack>
            <EventEditorBlockActions editor={editor} />
            <EventEditorLineActions editor={editor} />
          </HStack>
        </WrapItem>
      </Wrap>
      <EditorContent editor={editor} />
    </Stack>
  )
}

export default EventEditor
