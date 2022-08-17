import { ReactNode } from 'react'
import MovieHeader from '../../components/Movies/MovieHeader'
import { MoviesProp, NextPageWithLayout } from '../../types'
import { GetStaticProps } from 'next'
import { MovieCard } from '../../components/Movies/MovieCard'

const popularMovies: NextPageWithLayout<MoviesProp> = ({ movieData }) => {
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

popularMovies.getLayout = (page: ReactNode) => {
  return <MovieHeader title={'popular-movies'}>{page}</MovieHeader>
}

export const getStaticProps: GetStaticProps = async () => {
  const url = new URL('https://api.themoviedb.org/3/movie/popular')
  const params = {
    api_key: process.env?.NEXT_PUBLIC_TMDB_API_KEY!,
    language: 'en-US',
    page: '1',
  }
  url.search = new URLSearchParams(params).toString()
  const res = await fetch(url.toString())
  const movieData: MoviesProp = await res.json()
  return {
    props: {
      movieData,
    },
    revalidate: 60 * 60,
  }
}

export default popularMovies
