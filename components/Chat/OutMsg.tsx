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

const OutMsg: React.FC<IProps> = (props) => {
  const { avatar, msg, time, media } = props
  return (
    <div id="outgoingMsg" className="text-right p-4">
      <div className="flex items-center gap-2 justify-end">
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
      <div className="mt-3 bg-green-300 p-2 shadow-md max-w-md min-w-[2.5rem] w-fit ml-auto tracking-wider leading-6 rounded-lg relative before:content-[''] before:absolute before:h-4 before:w-4 before:bg-green-300 before:rotate-45 before:-top-1 before:right-4 before:-z:10">
        {media ? (
          <ImgMsg
            fileName={media.fileName}
            mimeType={media.mimeType}
            content={media.content}
          />
        ) : (
          <p className="break-all">{msg}</p>
        )}
      </div>
    </div>
  )
}

export default OutMsg
