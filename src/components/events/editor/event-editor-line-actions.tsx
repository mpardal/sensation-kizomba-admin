import { Editor } from '@tiptap/react'
import { MdHorizontalRule } from 'react-icons/md'
import { ImPageBreak } from 'react-icons/im'
import EventEditorActionIconButton from './event-editor-action-icon-button'

function EventEditorLineActions({ editor }: { editor: Editor | null }) {
  return (
    <>
      <EventEditorActionIconButton
        onClick={() => {
          editor?.chain().focus().setHorizontalRule().run()
        }}
        aria-label="séparateur"
        title="Séparateur"
        icon={<MdHorizontalRule />}
      />
      <EventEditorActionIconButton
        onClick={() => {
          editor?.chain().focus().setHardBreak().run()
        }}
        aria-label="saut de ligne"
        title="Saut de ligne"
        icon={<ImPageBreak />}
      />
    </>
  )
}

export default EventEditorLineActions
