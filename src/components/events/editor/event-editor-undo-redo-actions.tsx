import { Editor } from '@tiptap/react'
import { MdRedo, MdUndo } from 'react-icons/md'
import EventEditorActionIconButton from './event-editor-action-icon-button'

function EventEditorUndoRedoActions({ editor }: { editor: Editor | null }) {
  return (
    <>
      <EventEditorActionIconButton
        disabled={!editor?.can().chain().focus().undo().run()}
        onClick={() => {
          editor?.chain().focus().undo().run()
        }}
        aria-label="annuler les modifications"
        title="Annuler les modifications"
        icon={<MdUndo />}
      />
      <EventEditorActionIconButton
        disabled={!editor?.can().chain().focus().redo().run()}
        onClick={() => {
          editor?.chain().focus().redo().run()
        }}
        aria-label="rétablir les modifications"
        title="Rétablir les modifications"
        icon={<MdRedo />}
      />
    </>
  )
}

export default EventEditorUndoRedoActions
