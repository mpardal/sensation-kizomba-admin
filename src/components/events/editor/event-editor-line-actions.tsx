import { Editor } from '@tiptap/react'
import {
  ImPageBreak,
  MdCode,
  MdFormatListNumbered,
  MdFormatQuote,
  MdHorizontalRule,
  MdList,
} from 'react-icons/all'
import EventEditorActionIconButton from './event-editor-action-icon-button'

function EventEditorLineActions({ editor }: { editor: Editor | null }) {
  return (
    <>
      <EventEditorActionIconButton
        onClick={() => {
          editor?.chain().focus().setHorizontalRule().run()
        }}
        aria-label="séparateur"
        icon={<MdHorizontalRule />}
      />
      <EventEditorActionIconButton
        onClick={() => {
          editor?.chain().focus().setHardBreak().run()
        }}
        aria-label="saut de ligne"
        icon={<ImPageBreak />}
      />
    </>
  )
}

export default EventEditorLineActions
