import { Editor } from '@tiptap/react'
import { MdCode, MdFormatListNumbered, MdFormatQuote, MdList } from 'react-icons/md'
import EventEditorActionIconButton from './event-editor-action-icon-button'

function EventEditorBlockActions({ editor }: { editor: Editor | null }) {
  return (
    <>
      <EventEditorActionIconButton
        isActive={editor?.isActive('bulletList')}
        onClick={() => {
          editor?.chain().focus().toggleBulletList().run()
        }}
        aria-label="liste à puces"
        title="Liste à puces"
        icon={<MdList />}
      />
      <EventEditorActionIconButton
        isActive={editor?.isActive('orderedList')}
        onClick={() => {
          editor?.chain().focus().toggleOrderedList().run()
        }}
        aria-label="liste numérotée"
        title="Liste numérotée"
        icon={<MdFormatListNumbered />}
      />
      <EventEditorActionIconButton
        isActive={editor?.isActive('codeBlock')}
        onClick={() => {
          editor?.chain().focus().toggleCodeBlock().run()
        }}
        aria-label="bloc de code"
        title="Bloc de code"
        icon={<MdCode />}
      />
      <EventEditorActionIconButton
        isActive={editor?.isActive('blockquote')}
        onClick={() => {
          editor?.chain().focus().toggleBlockquote().run()
        }}
        aria-label="citation"
        title="Citation"
        icon={<MdFormatQuote />}
      />
    </>
  )
}

export default EventEditorBlockActions
