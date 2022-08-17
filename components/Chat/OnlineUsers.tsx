import React from 'react'
import Image from 'next/image'

interface IProps {
  name: string
  selectedUser: { username: string; avatar: string; email: string }
  avatar: string
  email: string
  handleUserClick: (username: string, avatar: string, email: string) => void
  getUnseenMsgs: (receiver: string) => number
}

const OnlineUsers: React.FC<IProps> = (props) => {
  const { name, selectedUser, avatar, email, handleUserClick, getUnseenMsgs } =
    props
  return (
    <li
      key={name}
      className="py-3 px-2 rounded-sm flex flex-wrap gap-2 items-center capitalize cursor-pointer hover:bg-gray-200 hover:text-black transition-all duration-500"
      onClick={() => handleUserClick(name, avatar, email)}
      style={{
        backgroundColor: selectedUser.username === name ? '#e5e7eb' : '',
        color: selectedUser.username === name ? 'black' : '',
      }}
    >
      <Image
        height={56}
        width={56}
        src={avatar}
        alt={name + '-profile'}
        className="rounded-full object-cover"
      />

      <div className="overflow-hidden grow">
        <p>{name}</p>
        <p className="text-sm relative left-3 before:content-[''] before:absolute before:h-2 before:w-2 before:rounded-full before:top-2/4 before:-left-3 before:-translate-y-2/4 before:bg-green-400">
          online
        </p>
      </div>
      <p className="text-white">
        {getUnseenMsgs(email) !== 0 && (
          <span className="bg-red-500 py-1 px-2 rounded-full text-xs">
            {getUnseenMsgs(email)}
          </span>
        )}
      </p>
    </li>
  )
}

export default OnlineUsers
