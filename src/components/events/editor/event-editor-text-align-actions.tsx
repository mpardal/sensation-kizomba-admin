import { Editor } from '@tiptap/react'
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatStrikethrough,
  MdFormatUnderlined,
  MdOutlineFormatAlignCenter,
  MdOutlineFormatAlignJustify,
  MdOutlineFormatAlignLeft,
  MdOutlineFormatAlignRight,
} from 'react-icons/all'
import EventEditorActionIconButton from './event-editor-action-icon-button'

function EventEditorTextAlignActions({ editor }: { editor: Editor | null }) {
  return (
    <>
      <EventEditorActionIconButton
        isActive={editor?.isActive({ textAlign: 'left' })}
        onClick={() => {
          editor?.chain().focus().setTextAlign('left').run()
        }}
        aria-label="aligné à gauche"
        icon={<MdOutlineFormatAlignLeft />}
      />
      <EventEditorActionIconButton
        isActive={editor?.isActive({ textAlign: 'center' })}
        onClick={() => {
          editor?.chain().focus().setTextAlign('center').run()
        }}
        aria-label="aligné au centre"
        icon={<MdOutlineFormatAlignCenter />}
      />
      <EventEditorActionIconButton
        isActive={editor?.isActive({ textAlign: 'right' })}
        onClick={() => {
          editor?.chain().focus().setTextAlign('right').run()
        }}
        aria-label="aligné à droite"
        icon={<MdOutlineFormatAlignRight />}
      />
      <EventEditorActionIconButton
        isActive={editor?.isActive({ textAlign: 'justify' })}
        onClick={() => {
          editor?.chain().focus().setTextAlign('justify').run()
        }}
        aria-label="justifié"
        icon={<MdOutlineFormatAlignJustify />}
      />
    </>
  )
}

export default EventEditorTextAlignActions
