import React, { useEffect, useMemo, useContext, useState, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import OutMsg from './OutMsg'
import InMsg from './InMsg'
import ChatScreenHeader from './ChatScreenHeader'
import { IEmojiData } from 'emoji-picker-react'
import { CommentRounded } from '@mui/icons-material'
import MsgArea from './MsgArea'
import { IMsgs, IOnlineUsers } from '../../interfaces'
import keyGen from '../../utils/keyGen'

type selectedUserType = {
  username: string
  avatar: string
  email: string
}

interface IProps {
  handleUserClick: (username: string, avatar: string, email: string) => void
  selectedUser: { username: string; avatar: string; email: string }
  msgs: IMsgs
  handleSendMsg: (msg: string) => void
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onlineUsers: IOnlineUsers[]
  setSelectedUser: React.Dispatch<React.SetStateAction<selectedUserType>>
}

//no chat component
const NoChat: React.FC = () => (
  <div className="md:col-start-4 md:col-end-13 flex flex-col justify-center items-center chat-bg">
    <CommentRounded
      fontSize="large"
      color="disabled"
      sx={{ height: 60, width: 60 }}
    />
    <p className="text-gray-400 text-lg text-center">
      Click on a user <br />
      to start conversation...
    </p>
  </div>
)

//main components
const ChatScreen: React.FC<IProps> = (props) => {
  const {
    handleUserClick,
    selectedUser,
    setSelectedUser,
    msgs,
    handleSendMsg,
    handleFileChange,
    onlineUsers,
  } = props
  const { user: self } = useContext(AuthContext)
  const [choosenEmoji, setChoosenEmoji] = useState<string>('')
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)
  const [outMsg, setOutMsg] = useState<string>('')
  const [chatKey, setChatKey] = useState<string>('')
  const fileRef = useRef<HTMLInputElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const chatScreenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let willUnmount: boolean = false

    const foundIndex: number = onlineUsers.findIndex(
      (user) => user.name === selectedUser.username
    )

    if (!willUnmount && foundIndex === -1 && selectedUser.username.length) {
      setSelectedUser({
        avatar: '',
        email: '',
        username: '',
      })
    }

    return () => {
      willUnmount = true
    }
  }, [onlineUsers, selectedUser.username, setSelectedUser])

  useEffect(() => {
    if (showEmojiPicker === false) textAreaRef?.current?.focus()
  }, [showEmojiPicker])

  useEffect(() => {
    let willUnmount = false

    if (willUnmount === false && choosenEmoji.length > 0) {
      setOutMsg((prev) => prev.concat(choosenEmoji))
    }

    return () => {
      willUnmount = true
    }
  }, [choosenEmoji])

  useEffect(() => {
    let willUnmount = false

    if (self !== null && willUnmount === false) {
      const key = keyGen(self.email, selectedUser.email)
      setChatKey(key)
    }

    return () => {
      willUnmount = true
    }
  }, [msgs, selectedUser, self])

  //side effect for chat screen reference
  useEffect(() => {
    const htmlDivElem = chatScreenRef.current
    if (htmlDivElem !== null)
      htmlDivElem.scrollTo({
        top: htmlDivElem.scrollHeight,
        behavior: 'smooth',
      })
  }, [msgs])

  //back button handler function
  const handleBackBtn = () => {
    handleUserClick('', '', '')
  }

  //emoji click handler fn
  const handleEmojiClick = (
    _: React.MouseEvent<Element, MouseEvent>,
    o: IEmojiData
  ) => {
    setChoosenEmoji(o.emoji)
  }

  //emoji click handler
  const handleShowEmoji = () => {
    setShowEmojiPicker((prev) => !prev)
  }

  //handle file ref
  const handleFileRef = () => {
    if (fileRef && fileRef.current) {
      fileRef.current.click()
      textAreaRef.current?.focus()
    }
  }

  //handle message
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOutMsg(e.target.value)
  }

  //handle fn for send btn
  const handleSend = () => {
    if (outMsg.trim().length > 0) {
      handleSendMsg(outMsg)
      setOutMsg('')
      textAreaRef.current?.focus()
    }
  }

  if (selectedUser.username.length === 0) {
    return <NoChat />
  } else {
    return (
      <div className="h-screen overflow-hidden flex flex-col gap-2 md:col-start-4 md:col-end-13 chat-bg">
        {/* --- header --- */}
        <ChatScreenHeader
          avatar={selectedUser.avatar}
          handleBackBtn={handleBackBtn}
          username={selectedUser.username}
        />

        {/* --- chat area --- */}
        <div
          ref={chatScreenRef}
          className="overflow-x-hidden overflow-y-auto grow"
        >
          {chatKey in msgs &&
            msgs[chatKey].map((m) => {
              if (m.type === 'IN') {
                return (
                  <div key={m.id}>
                    <InMsg
                      avatar={m.avatar}
                      time={m.time}
                      msg={m.msg}
                      media={m.media}
                    />
                  </div>
                )
              } else {
                return (
                  <div key={m.id}>
                    {self?.avatar && (
                      <OutMsg
                        avatar={self.avatar}
                        msg={m.msg}
                        time={m.time}
                        media={m.media}
                      />
                    )}
                  </div>
                )
              }
            })}
        </div>

        {/* --- chat text area --- */}
        <MsgArea
          showEmojiPicker={showEmojiPicker}
          handleEmojiClick={handleEmojiClick}
          textAreaRef={textAreaRef}
          fileRef={fileRef}
          outMsg={outMsg}
          handleChange={handleChange}
          handleShowEmoji={handleShowEmoji}
          handleFileRef={handleFileRef}
          handleSend={handleSend}
          handleFileChange={handleFileChange}
        />
      </div>
    )
  }
}

export default ChatScreen
