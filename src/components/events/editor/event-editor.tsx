import { HStack, Stack, Wrap, WrapItem } from '@chakra-ui/react'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { Underline } from '@tiptap/extension-underline'
import { TextAlign } from '@tiptap/extension-text-align'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import EventEditorBlockActions from './event-editor-block-actions'
import EventEditorLineActions from './event-editor-line-actions'
import EventEditorSelectNodeAction from './event-editor-select-node-action'
import EventEditorTextAlignActions from './event-editor-text-align-actions'
import EventEditorTextDecorationActions from './event-editor-text-decoration-actions'
import EventEditorTextStyleActions from './event-editor-text-style-actions'
import EventEditorUndoRedoActions from './event-editor-undo-redo-actions'

function EventEditor({ id, name }: { id: string; name: string }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: '<h1>Hello World! 🌍</h1>',
  })

  return (
    <Stack direction="column">
      <Wrap spacing={4}>
        <WrapItem>
          <HStack>
            <EventEditorUndoRedoActions editor={editor} />
          </HStack>
        </WrapItem>
        <WrapItem>
          <HStack>
            <EventEditorSelectNodeAction editor={editor} />
            <EventEditorTextStyleActions editor={editor} />
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
