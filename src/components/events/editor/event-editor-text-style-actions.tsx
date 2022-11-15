import { Editor } from '@tiptap/react'
import { useRef } from 'react'
import { MdFormatColorReset, MdFormatColorText } from 'react-icons/all'
import { isLightColorHex } from '../../../utils/color'
import EventEditorActionIconButton from './event-editor-action-icon-button'

function EventEditorTextStyleActions({ editor }: { editor: Editor | null }) {
  const inputColorRef = useRef<HTMLInputElement>(null)
  const currentColor = editor?.getAttributes('textStyle')?.color || '#ffffff'
  const isLightColor = isLightColorHex(currentColor)

  return (
    <>
      <span className="relative">
        <input
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          ref={inputColorRef}
          type="color"
          onInput={(evt) => {
            editor?.chain().focus().setColor(evt.currentTarget.value).run()
          }}
          value={currentColor}
          tabIndex={-1}
          aria-hidden="true"
        />
        <EventEditorActionIconButton
          onClick={() => {
            inputColorRef.current?.click()
          }}
          aria-label="sélection de couleur"
          icon={<MdFormatColorText />}
          style={{
            backgroundColor: currentColor,
            color: isLightColor ? '#000000' : '#ffffff',
          }}
        />
      </span>
      <EventEditorActionIconButton
        onClick={() => {
          editor?.chain().focus().unsetColor().run()
        }}
        aria-label="réinitialiser la couleur"
        icon={<MdFormatColorReset />}
      />
    </>
  )
}

export default EventEditorTextStyleActions
