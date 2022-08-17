import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'

export const useSocket = (url: string) => {
  const [socket, setSocket] = useState<Socket<any> | null>(null)

  useEffect(() => {
    let willUnmount: boolean = false
    const socketIO = io(url, { transports: ['websocket'] })

    if (willUnmount === false) setSocket(socketIO)

    socketIO.on('connection', (data) => {
      console.log('[socket server] : ', data.message)
    })

    return () => {
      socketIO.disconnect()
      willUnmount = true
    }
  }, [url])

  return socket
}
