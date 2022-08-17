import React from 'react'
import dynamic from 'next/dynamic'
import { IconButton } from '@mui/material'
import { IEmojiData } from 'emoji-picker-react'
import {
  SendRounded,
  EmojiEmotionsRounded,
  AttachFileRounded,
} from '@mui/icons-material'

const Picker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
})

interface IProps {
  showEmojiPicker: boolean
  handleEmojiClick: (
    e: React.MouseEvent<Element, MouseEvent>,
    o: IEmojiData
  ) => void
  textAreaRef: React.RefObject<HTMLTextAreaElement>
  fileRef: React.RefObject<HTMLInputElement>
  outMsg: string
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleShowEmoji: () => void
  handleFileRef: () => void
  handleSend: () => void
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const MsgArea: React.FC<IProps> = (props) => {
  const {
    outMsg,
    showEmojiPicker,
    handleEmojiClick,
    textAreaRef,
    handleChange,
    handleShowEmoji,
    fileRef,
    handleFileRef,
    handleSend,
    handleFileChange,
  } = props

  return (
    <form className="relative mt-auto mb-1 mx-3 border-2 border-gray-300 rounded-md gap-1">
      <div className="absolute bottom-24 z-10 left-2">
        {showEmojiPicker && (
          <Picker
            onEmojiClick={handleEmojiClick}
            groupVisibility={{ flags: false, symbols: false }}
          />
        )}
      </div>

      {/*--- text area ---*/}
      <div className="flex items-center gap-1 bg-white rounded-tl-md rounded-tr-md">
        <textarea
          ref={textAreaRef}
          rows={2}
          cols={3}
          name="outMsg"
          id="outMsg"
          placeholder="send message..."
          className="p-2 grow outline-none resize-none rounded-tl-md"
          value={outMsg}
          onChange={handleChange}
        />
        <IconButton aria-label="send icon" size="small" onClick={handleSend}>
          <SendRounded fontSize="small" />
        </IconButton>
      </div>

      <div className="px-2 flex items-center gap-1 bg-gray-400 py-1 rounded-bl-md rounded-br-md">
        {/*--- emoji ---*/}
        <IconButton
          size="small"
          aria-label="emoji icon"
          onClick={handleShowEmoji}
        >
          <EmojiEmotionsRounded
            fontSize="small"
            className={`${showEmojiPicker ? 'text-yellow-600' : ''}`}
          />
        </IconButton>

        {/*--- attachment---*/}
        <input
          ref={fileRef}
          type="file"
          id="file"
          name="file"
          hidden={true}
          onChange={handleFileChange}
        />
        <IconButton
          aria-label="attachement icon"
          size="small"
          onClick={handleFileRef}
        >
          <AttachFileRounded fontSize="small" />
        </IconButton>
      </div>
    </form>
  )
}

export default MsgArea
