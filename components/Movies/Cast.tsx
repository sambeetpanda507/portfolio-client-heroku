import { FC } from 'react'
import Image from 'next/image'

type CastProp = {
  cast_id?: number
  character: string
  name: string
  profile_path: string
}

const Cast: FC<CastProp> = ({ profile_path, name, character }) => {
  return (
    <>
      {profile_path && (
        <div className="flex items-center gap-2 w-full justify-between">
          <div className="basis-1/3 text-left">
            <Image
              src={`https://image.tmdb.org/t/p/w500${profile_path}`}
              alt={name}
              width="80rem"
              height="80rem"
              className="rounded-full object-cover"
            />
          </div>
          <div className="text-left basis-2/3">
            <p className="font-bold">{character}</p>
            <p>{name}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Cast
