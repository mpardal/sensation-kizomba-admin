import { Editor } from '@tiptap/react'
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatStrikethrough,
  MdFormatUnderlined,
} from 'react-icons/all'
import EventEditorActionIconButton from './event-editor-action-icon-button'

function EventEditorTextDecorationActions({ editor }: { editor: Editor | null }) {
  return (
    <>
      <EventEditorActionIconButton
        isActive={editor?.isActive('bold')}
        onClick={() => {
          editor?.chain().focus().toggleBold().run()
        }}
        aria-label="gras"
        icon={<MdFormatBold />}
      />
      <EventEditorActionIconButton
        isActive={editor?.isActive('italic')}
        onClick={() => {
          editor?.chain().focus().toggleItalic().run()
        }}
        aria-label="italique"
        icon={<MdFormatItalic />}
      />
      <EventEditorActionIconButton
        isActive={editor?.isActive('strike')}
        onClick={() => {
          editor?.chain().focus().toggleStrike().run()
        }}
        aria-label="barré"
        icon={<MdFormatStrikethrough />}
      />
      <EventEditorActionIconButton
        isActive={editor?.isActive('underline')}
        onClick={() => {
          editor?.chain().focus().toggleUnderline().run()
        }}
        aria-label="souligné"
        icon={<MdFormatUnderlined />}
      />
    </>
  )
}

export default EventEditorTextDecorationActions
