import { Editor } from '@tiptap/react'
import { MdCode, MdFormatListNumbered, MdList, MdRedo, MdUndo } from 'react-icons/all'
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
        icon={<MdUndo />}
      />
      <EventEditorActionIconButton
        disabled={!editor?.can().chain().focus().redo().run()}
        onClick={() => {
          editor?.chain().focus().redo().run()
        }}
        aria-label="rétablir les modifications"
        icon={<MdRedo />}
      />
    </>
  )
}

export default EventEditorUndoRedoActions
