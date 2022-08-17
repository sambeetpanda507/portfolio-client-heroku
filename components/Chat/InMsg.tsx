import React, { useEffect, useState } from 'react'
import Image from 'next/image'

type mediaType = {
  fileName: string
  mimeType: string
  content: File
}

interface IProps {
  avatar: string
  msg: string
  time: string
  media?: mediaType
}

//image component
const ImgMsg: React.FC<mediaType> = ({ fileName, mimeType, content }) => {
  const [imgSrc, setImgSrc] = useState<any>('')

  useEffect(() => {
    let willUnmount: boolean = false

    if (willUnmount === false) {
      const blob: Blob = new Blob([content], { type: mimeType })
      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onloadend = function () {
        setImgSrc(reader.result)
      }
    }

    return () => {
      willUnmount = true
    }
  }, [mimeType, content])

  return (
    <>
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={fileName}
          width={150}
          height={150}
          className="aspect-square"
        />
      )}
    </>
  )
}

const InMsg: React.FC<IProps> = (props) => {
  const { avatar, time, msg, media } = props

  return (
    <div id="outgoingMsg" className="p-4">
      <div className="flex flex-row-reverse justify-end items-center gap-2">
        <p>{time}</p>
        {avatar && (
          <Image
            src={avatar}
            alt="profile_icon_chat"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        )}
      </div>
      <div className="mt-3 bg-white p-2 max-w-md min-w-[2.5rem] w-fit mr-auto tracking-wider leading-6 rounded-lg shadow-md relative before:content-[''] before:absolute before:h-4 before:w-4 before:bg-white gray-200 before:rotate-45 before:-top-1 before:left-4 before:-z:10">
        {media ? (
          <ImgMsg
            fileName={media.fileName}
            mimeType={media.mimeType}
            content={media.content}
          />
        ) : (
          <p>{msg}</p>
        )}
      </div>
    </div>
  )
}

export default InMsg
