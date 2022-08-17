import Head from 'next/head'
import moment from 'moment'
import { FC, useContext, useEffect, useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { UserType } from '../../types'
import { parseCookies } from 'nookies'
import { AuthContext } from '../../context/AuthContext'
import { errorLog } from '../../utils/logger'
import OnlineScreen from '../../components/Chat/OnlineScreen'
import ChatScreen from '../../components/Chat/ChatScreen'
import { v4 as uuidV4 } from 'uuid'
import { useSocket } from '../../hooks/SocketHook'
import { IKeyValStr, IMsgs } from '../../interfaces/index'
import { IOnlineUsers } from '../../interfaces'
import keyGen from '../../utils/keyGen'
import { AlertContext } from '../../context/AlertContext'
import axios from 'axios'

interface ITalkProp {
  auth: boolean
  user: UserType
}

type mediaType = {
  fileName: string
  mimeType: string
  content: File
}

interface INewMsg {
  msg: string
  sender: string
  receiver: string
  time: string
  avatar: string
  type: 'OUT' | 'IN'
  media?: mediaType
  view: boolean
}

const socketURI: string = process.env.NEXT_PUBLIC_SOCKET_URI!

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  //parse cookies
  const parsedCookie = parseCookies(context)

  //get refresh token
  const refreshToken = parsedCookie['refreshToken']

  //if not refresh token
  if (!refreshToken) {
    return {
      redirect: {
        destination: '/chat',
        permanent: false,
      },
    }
  }

  try {
    //check valid refresh_token
    const res = await axios.get(`${process.env.BASE_URI}/api/getAccessToken`, {
      headers: {
        Cookie: `refreshToken=${refreshToken};`,
      },
    })

    if (res.status !== 200) {
      return {
        redirect: {
          destination: '/chat',
          permanent: false,
        },
      }
    }

    return {
      props: {
        auth: res.data.auth,
        user: res.data.userData,
      },
    }
  } catch (e: any) {
    errorLog(e?.message, 'talk page')
    return {
      redirect: {
        destination: '/chat',
        permanent: false,
      },
    }
  }
}

type displayType = 'ONLINE_USERS' | 'CHAT_SCREEN'
type selectedUserType = {
  username: string
  avatar: string
  email: string
}

//main componenet
const Talk: FC<ITalkProp> = ({ auth, user }) => {
  const socket = useSocket(socketURI)
  const { setUser, setAuth } = useContext(AuthContext)
  const [selectedUser, setSelectedUser] = useState<selectedUserType>({
    username: '',
    avatar: '',
    email: '',
  })
  const [display, setDisplay] = useState<displayType>('ONLINE_USERS')
  const [onlineUsers, setOnlineUser] = useState<IOnlineUsers[]>([])
  const [msgs, setMsgs] = useState<IMsgs>({} as IMsgs)
  const { setShow, setSeverity, setMessage } = useContext(AlertContext)

  //side effect to store auth and user in context
  useEffect(() => {
    let willUnmount = false

    if (willUnmount === false) {
      setAuth(auth)
      setUser(user)
    }

    return () => {
      willUnmount = true
    }
  }, [auth, user, setAuth, setUser])

  //side effect to change the display for chat screen
  useEffect(() => {
    let willUnmount = false

    if (selectedUser.username.length > 0 && willUnmount === false) {
      setDisplay('CHAT_SCREEN')
    } else {
      setDisplay('ONLINE_USERS')
    }

    return () => {
      willUnmount = true
    }
  }, [selectedUser])

  //side effect from socket
  useEffect(() => {
    let willUnmount: boolean = false

    if (socket && user && willUnmount === false) {
      //new user socket
      socket.emit('NEW_USER', {
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      })

      socket.on('NEW_USER', (onlineUsers: IKeyValStr) => {
        let onlineUserArr: IOnlineUsers[] = []
        for (let u in onlineUsers) {
          if (user.email !== u)
            onlineUserArr.push({
              id: uuidV4(),
              name: onlineUsers[u].name,
              avatar: onlineUsers[u].avatar,
              email: u,
            })
        }
        setOnlineUser([...onlineUserArr])
        onlineUserArr = []
      })

      //receive new msg
      socket.on('NEW_MSG', (newMsg: INewMsg) => {
        setMsgs((prevMsgs) => {
          const msgs = { ...prevMsgs }
          const newKey: string = keyGen(newMsg.sender, newMsg.receiver)

          if (newKey in msgs) {
            msgs[newKey] = [
              ...msgs[newKey],
              { id: uuidV4(), ...newMsg, view: false },
            ]
          } else {
            msgs[newKey] = [{ id: uuidV4(), ...newMsg, view: false }]
          }

          return { ...msgs }
        })
      })
    }

    return () => {
      willUnmount = true
    }
  }, [socket, user])

  useEffect(() => {
    let willUnmount: boolean = false

    if (!willUnmount && user && selectedUser.email.length > 0) {
      setMsgs((prevMsgs) => {
        const msgs = { ...prevMsgs }
        const key = keyGen(user.email, selectedUser.email)

        if (key in msgs)
          msgs[key].forEach((msg) => {
            if (msg.view === false) msg.view = true
          })

        return { ...msgs }
      })
    }

    return () => {
      willUnmount = true
    }
    //CHECK
  }, [selectedUser, user])

  //online user click handler
  const handleUserClick = (username: string, avatar: string, email: string) => {
    setSelectedUser({ username, avatar, email })
  }

  //handle send message
  const handleSendMsg = (msg: string) => {
    if (user && socket) {
      const newMsg: INewMsg = {
        msg,
        sender: user.email,
        receiver: selectedUser.email,
        avatar: user.avatar,
        time: moment().format('LT'),
        type: 'OUT',
        view: false,
      }

      //send new msg to server
      socket.emit('NEW_MSG', newMsg)

      //store new msg in state
      const oldMsg: IMsgs = { ...msgs }
      const newKey: string = keyGen(user.email, selectedUser.email)

      //check if key present in oldMsg
      if (newKey in oldMsg) {
        oldMsg[newKey].push({ id: uuidV4(), ...newMsg, view: true })
      } else {
        oldMsg[newKey] = [
          {
            id: uuidV4(),
            ...newMsg,
            view: true,
          },
        ]
      }

      setMsgs(oldMsg)
    }
  }

  //send file handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files

    if (!files || !user || !socket) return

    const file: File = files[0]

    if (file === undefined) return

    const mimeList: string[] = ['image/gif', 'image/svg+xml', 'image/jpeg']
    const fileName: string = file.name
    const fileSize: number = file.size
    const mimeType: string = file.type
    const maxFileSize: number = Math.pow(10, 6)

    if (mimeList.includes(mimeType) === false) {
      setMessage('Invalid file type. Only upload images.')
      setSeverity('error')
      setShow(true)
      return
    }

    if (fileSize > maxFileSize) {
      setMessage('Max file size is 1MB')
      setSeverity('error')
      setShow(true)
      return
    }

    //create new message obj
    const newMsg: INewMsg = {
      msg: '',
      sender: user.email,
      receiver: selectedUser.email,
      avatar: user.avatar,
      time: moment().format('LT'),
      type: 'OUT',
      view: true,
      media: {
        fileName,
        mimeType,
        content: file,
      },
    }

    //send new message
    socket.emit('NEW_MSG', newMsg)

    //store new msg in state
    const oldMsg: IMsgs = { ...msgs }
    const newKey: string = keyGen(user.email, selectedUser.email)

    if (newKey in oldMsg) {
      oldMsg[newKey].push({ id: uuidV4(), ...newMsg })
    } else {
      oldMsg[newKey] = [{ id: uuidV4(), ...newMsg }]
    }

    setMsgs(oldMsg)
  }

  const getUnseenMsgs = (receiver: string): number => {
    let count: number = 0
    if (user) {
      const newKey = keyGen(user.email, receiver)
      if (newKey in msgs) {
        count = msgs[newKey].filter((m) => m.view === false).length
      }
    }
    return count
  }

  return (
    <section className="h-screen overflow-hidden">
      <Head>
        <title>Talk</title>
      </Head>
      <div className="block md:hidden">
        {/*--- online users ---*/}
        {display === 'ONLINE_USERS' && (
          <OnlineScreen
            selectedUser={selectedUser}
            handleUserClick={handleUserClick}
            onlineUsers={onlineUsers}
            getUnseenMsgs={getUnseenMsgs}
          />
        )}

        {/*--- chat screen ---*/}
        {display === 'CHAT_SCREEN' && (
          <ChatScreen
            handleUserClick={handleUserClick}
            selectedUser={selectedUser}
            msgs={msgs}
            handleSendMsg={handleSendMsg}
            handleFileChange={handleFileUpload}
          />
        )}
      </div>

      {/*---desktop view---*/}
      <div className="hidden md:grid md:grid-cols-12">
        <OnlineScreen
          selectedUser={selectedUser}
          handleUserClick={handleUserClick}
          onlineUsers={onlineUsers}
          getUnseenMsgs={getUnseenMsgs}
        />
        <ChatScreen
          handleUserClick={handleUserClick}
          selectedUser={selectedUser}
          msgs={msgs}
          handleFileChange={handleFileUpload}
          handleSendMsg={handleSendMsg}
        />
      </div>
    </section>
  )
}

export default Talk
