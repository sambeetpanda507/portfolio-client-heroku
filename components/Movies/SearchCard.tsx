import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type SearchCardPropType = {
  id?: number
  poster_path: string
  title: string
  popularity: number
}

const SearchCard: FC<SearchCardPropType> = ({
  id,
  poster_path,
  title,
  popularity,
}) => {
  return (
    <Link href={`/movies/${id}`}>
      <a>
        <div className="text-gray-800 flex gap-2 text-sm border-2 border-gray-100 shadow-md rounded-md my-2 overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt="moviePoster"
            height={90}
            width={80}
            className="basis-1/4"
          />

          <div className="basis-3/4">
            <p className="leading-5">{title}</p>
            <p className="leading-8">popularity: {popularity}</p>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default SearchCard
