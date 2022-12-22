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
        title="Gras"
        icon={<MdFormatBold />}
      />
      <EventEditorActionIconButton
        isActive={editor?.isActive('italic')}
        onClick={() => {
          editor?.chain().focus().toggleItalic().run()
        }}
        aria-label="italique"
        title="Italique"
        icon={<MdFormatItalic />}
      />
      <EventEditorActionIconButton
        isActive={editor?.isActive('strike')}
        onClick={() => {
          editor?.chain().focus().toggleStrike().run()
        }}
        aria-label="barré"
        title="Barré"
        icon={<MdFormatStrikethrough />}
      />
      <EventEditorActionIconButton
        isActive={editor?.isActive('underline')}
        onClick={() => {
          editor?.chain().focus().toggleUnderline().run()
        }}
        aria-label="souligné"
        title="Souligné"
        icon={<MdFormatUnderlined />}
      />
    </>
  )
}

export default EventEditorTextDecorationActions
