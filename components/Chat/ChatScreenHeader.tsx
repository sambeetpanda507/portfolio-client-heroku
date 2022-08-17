import React from 'react'
import Image from 'next/image'
import { IconButton } from '@mui/material'
import { ArrowBackIosNewRounded } from '@mui/icons-material'

interface IProps {
  handleBackBtn: (username: string, avatar: string) => void
  avatar: string
  username: string
}

const ChatScreenHeader: React.FC<IProps> = (props) => {
  const { handleBackBtn, avatar, username } = props
  const handleClick = () => {
    handleBackBtn('', '')
  }
  return (
    <div className="px-2 py-4 flex items-center gap-2 mb-auto border-b-2 border-gray-300">
      <IconButton
        aria-label="back-btn"
        size="small"
        onClick={handleClick}
        className="md:hidden"
      >
        <ArrowBackIosNewRounded fontSize="small" />
      </IconButton>
      {avatar && (
        <Image
          src={avatar}
          alt={`profile_icon_${username}`}
          height={45}
          width={45}
          className="rounded-full object-cover"
        />
      )}
      <div className="capitalize">
        <p className="font-semibold">{username}</p>
        <p className="mt-1 text-sm relative left-3 before:content-[''] before:absolute before:h-2 before:w-2 before:rounded-full before:top-2/4 before:-left-3 before:-translate-y-2/4 before:bg-green-400">
          online
        </p>
      </div>
    </div>
  )
}

export default ChatScreenHeader
