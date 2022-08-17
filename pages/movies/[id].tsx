import { ReactElement } from 'react'
import type { GetServerSideProps } from 'next'
import MovieHeader from '../../components/Movies/MovieHeader'
import type { NextPageWithLayout } from '../../types'
import Image from 'next/image'
import Cast from '../../components/Movies/Cast'
import Crew from '../../components/Movies/Crew'

type MovieDetailsType = {
  adult: boolean
  id: number
  title: string
  overview: string
  poster_path: string
  release_date: string
  genres: {
    id: number
    name: string
  }[]
  credits: {
    cast: {
      cast_id: number
      character: string
      name: string
      profile_path: string
    }[]
    crew: {
      id: number
      job: string
      profile_path: string
      name: string
    }[]
  }
  videos: {
    results: {
      id: string
      key: string
      name: string
    }[]
  }
  status: string
  popularity: number
  imdb_id: string
  runtime: number
  vote_average: number
  vote_count: number
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id
  const url = new URL(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env
      .NEXT_PUBLIC_TMDB_API_KEY!}&append_to_response=videos,credits,reviews`
  )
  const res = await fetch(url.toString())
  const data: MovieDetailsType = await res.json()
  return {
    props: {
      ...data,
    },
  }
}

const MovieDetails: NextPageWithLayout<MovieDetailsType> = (
  props: MovieDetailsType
) => {
  return (
    <section className="p-4">
      <div className="grid gap-4 md:grid-cols-12">
        {/* image */}
        <div className="h-[30rem] w-full md:col-span-3 relative">
          <Image
            src={`https://image.tmdb.org/t/p/w500${props.poster_path}`}
            alt={props.title}
            layout="fill"
            className="absolute rounded-md object-cover"
          />
        </div>
        {/* video */}
        <div className="h-[30rem] md:col-span-9 w-full">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${props?.videos?.results[0]?.key}?autoplay=1&mute=1&autohide=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </div>

      <div className="grid grid-cols-12 mt-4">
        <div className="col-span-12 md:col-span-8">
          {/* movie overview */}
          <h2 className="heading-line">Overview</h2>
          <p className="text-gray-600 tracking-wide">{props.overview}</p>

          {/* movie details points mobile */}
          <div className="col-start-10 col-end-13 leading-8 block md:hidden">
            <h2 className="heading-line">Details</h2>
            <div className="py-1 font-semibold tracking-widest">
              <div className="max-w-sm w-full">
                <p>Title: {props.title}</p>
                <p>Release Date: {props.release_date}</p>
                <p>
                  Genres:{' '}
                  {props.genres.map((genre) => {
                    return (
                      <span
                        key={genre.id}
                        className="border border-gray-600 p-2 inline-block m-1 rounded-md"
                      >
                        {genre.name}
                      </span>
                    )
                  })}
                </p>
                <p>status: {props.status}</p>
              </div>
              <div className="w-full">
                <p>IMDB ID: {props.imdb_id}</p>
                <p>popularity: {props.popularity}</p>
                <p>runtime: {props.runtime}min</p>
                <p>Average: {props.vote_average}</p>
                <p>Votes: {props.vote_count}</p>
              </div>
            </div>
          </div>

          {/* cast and crews */}
          <h2 className="heading-line mt-6">Cast</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 text-center text-sm">
            {props.credits.cast.map((castData) => {
              return (
                <Cast
                  key={castData.cast_id + Math.random()}
                  profile_path={castData.profile_path}
                  name={castData.name}
                  character={castData.character}
                />
              )
            })}
          </div>
          <h2 className="heading-line mt-6">Crew</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 text-center text-sm">
            {props.credits.crew.map((crewData) => {
              return (
                <Crew
                  key={crewData.id + Math.random()}
                  name={crewData.name}
                  job={crewData.job}
                  profile_path={crewData.profile_path}
                />
              )
            })}
          </div>
        </div>

        {/* ---movie details points desktop--- */}
        <div className="col-start-10 col-end-13 leading-8 hidden md:block">
          <h2 className="heading-line">Details</h2>
          <div className="py-4 font-semibold tracking-widest">
            <div className="max-w-sm w-full">
              <p>Title: {props.title}</p>
              <p>Release Date: {props.release_date}</p>
              <p>
                Genres:{' '}
                {props.genres.map((genre) => {
                  return (
                    <span
                      key={genre.id}
                      className="border border-gray-600 p-2 inline-block m-1 rounded-md"
                    >
                      {genre.name}
                    </span>
                  )
                })}
              </p>
              <p>status: {props.status}</p>
            </div>
            <div className="w-full">
              <p>IMDB ID: {props.imdb_id}</p>
              <p>popularity: {props.popularity}</p>
              <p>runtime: {props.runtime}min</p>
              <p>Average: {props.vote_average}</p>
              <p>Votes: {props.vote_count}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

MovieDetails.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MovieHeader title={'movie details'}>{page}</MovieHeader>
    </>
  )
}

export default MovieDetails
