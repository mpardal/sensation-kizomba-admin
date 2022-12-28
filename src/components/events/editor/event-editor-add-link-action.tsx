import { Editor } from '@tiptap/react'
import { MdLink, MdLinkOff } from 'react-icons/md'
import EventEditorActionIconButton from './event-editor-action-icon-button'

function EventEditorUndoRedoActions({ editor }: { editor: Editor | null }) {
  const isLinkActive = editor?.isActive('link') ?? true

  return (
    <>
      <EventEditorActionIconButton
        onClick={() => {
          if (!editor) return

          if (isLinkActive) {
            editor.chain().focus().unsetLink().run()

            return
          }

          const previousUrl = editor.getAttributes('link').href
          const url = window.prompt('URL', previousUrl)

          // cancelled
          if (url === null) {
            return
          }

          // empty
          if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()

            return
          }

          // update link
          editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
        }}
        aria-label="rétablir les modifications"
        title="Rétablir les modifications"
        icon={editor?.isActive('link') ?? true ? <MdLinkOff /> : <MdLink />}
      />
    </>
  )
}

export default EventEditorUndoRedoActions
