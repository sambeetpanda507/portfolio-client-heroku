import { FC, useState } from 'react'
import { MovieData } from '../../types'
import Image from 'next/image'
import Link from 'next/link'

export const MovieCard: FC<MovieData> = (props: MovieData) => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  return (
    <>
      {!props.adult && (
        <Link href={`/movies/${props.id}`}>
          <a
            className="basis-72"
            onMouseEnter={() => setShowOverlay(true)}
            onMouseLeave={() => setShowOverlay(false)}
          >
            <div className="rounded-md shadow-2xl overflow-hidden h-full relative">
              {/* card image */}
              <div className="h-96 w-full relative">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${props.poster_path}`}
                  layout="fill"
                  className="object-cover"
                  alt={props.title}
                />
              </div>
              {/* ---overlay--- */}
              <div
                className={`absolute top-0 left-0 right-0 bottom-0 bg-black/70 transition-all ${
                  showOverlay ? 'block' : 'hidden'
                }`}
              >
                <div className="h-full w-full opacity-0 flex justify-center items-center transition-all duration-500 ease-in-out p-4 hover:opacity-100">
                  <h1 className="text-white tracking-wider leading-7 text-center">
                    {props.overview.substring(0, 200)}...
                  </h1>
                </div>
              </div>
            </div>
          </a>
        </Link>
      )}
    </>
  )
}
