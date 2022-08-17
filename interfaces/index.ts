export interface IKeyValStr {
  [key: string]: IOnlineUsers
}

export interface IOnlineUsers {
  id: string
  name: string
  avatar: string
  email: string
}

export interface IMsgs {
  [key: string]: {
    id: string
    type: 'OUT' | 'IN'
    avatar: string
    sender: string
    receiver: string
    time: string
    msg: string
    view: boolean
    media?: {
      fileName: string
      mimeType: string
      content: File
    }
  }[]
}
