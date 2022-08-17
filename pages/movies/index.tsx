import MovieHeader from '../../components/Movies/MovieHeader'
import { MoviesProp, NextPageWithLayout } from '../../types'
import { ReactElement } from 'react'
import { GetStaticProps } from 'next'
import { MovieCard } from '../../components/Movies/MovieCard'

const Movies: NextPageWithLayout<MoviesProp> = ({ movieData }) => {
  return (
    <section className="min-h-screen flex flex-row gap-4 my-4 flex-wrap justify-center">
      {/* home page movies card */}
      {movieData?.results?.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            adult={movie.adult}
            poster_path={movie.poster_path}
            overview={movie.overview}
            popularity={movie.popularity}
            title={movie.title}
            id={movie.id}
          />
        )
      })}
    </section>
  )
}

Movies.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MovieHeader title={'movies'}>{page}</MovieHeader>
    </>
  )
}

//get static props
export const getStaticProps: GetStaticProps = async () => {
  const url = new URL('https://api.themoviedb.org/3/movie/top_rated')
  const params = {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY!,
    language: 'en-US',
    page: '1',
  }

  console.log('params: ', params)
  url.search = new URLSearchParams(params).toString()
  const res = await fetch(url.toString())
  const movieData: MoviesProp = await res.json()
  console.log('movie data: ', movieData)
  return {
    props: {
      movieData,
    },
    revalidate: 60 * 60,
  }
}

export default Movies
