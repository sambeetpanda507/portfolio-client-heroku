import React, { FC, ReactNode, useState, useRef, useEffect } from 'react'
import { Button, InputAdornment, TextField } from '@mui/material'
import { Search } from '@mui/icons-material'
import Link from 'next/link'
import Head from 'next/head'
import MobileNavbar from './MobileNavbar'
import { MovieData } from '../../types'
import SearchResult from './SearchResult'

interface MovieHeaderProps {
  title: string
  children: ReactNode
}

const MovieHeader: FC<MovieHeaderProps> = ({ title, children }) => {
  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<MovieData[]>([])
  const resultRef = useRef<HTMLDivElement>(null)
  const [showResult, setShowResult] = useState<boolean>(false)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        resultRef.current &&
        event.target instanceof HTMLElement &&
        !resultRef.current.contains(event.target)
      ) {
        setShowResult(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [resultRef])

  const handleSearch = async () => {
    try {
      if (search.length === 0) return
      setShowResult(true)
      setLoading(true)
      const apiKey: string = process.env.NEXT_PUBLIC_TMDB_API_KEY!
      const url: string = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`
      const jsonRes = await fetch(url, { method: 'GET' })
      const res = await jsonRes.json()
      setSearchResults(res.results)
      setLoading(false)
    } catch (error) {
      console.error('[Error] : ', error)
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <nav className="bg-gray-900 text-white p-4 sticky top-0 left-0 w-full hidden md:block z-10">
        {/* movie header links */}
        <div className="container flex justify-between items-center mx-auto">
          <ul className="flex space-x-5 capitalize">
            {/* brand name */}

            <li className="font-semibold text-lg">
              <Link href="/movies">
                <a>
                  Movies<span className="text-yellow-400">की</span>Dunia
                </a>
              </Link>
            </li>
            {/* nav links */}
            <li>
              <Link href="/movies">
                <a>top rated movies</a>
              </Link>
            </li>
            <li>
              <Link href="/movies/popular-movies">
                <a>popular movies</a>
              </Link>
            </li>
            <li>
              <Link href="/movies/upcoming-movies">
                <a>upcoming movies</a>
              </Link>
            </li>
          </ul>
          {/* input search field */}
          <div className="relative">
            <TextField
              variant="outlined"
              name="search"
              placeholder="search"
              color="primary"
              className="bg-white rounded-md"
              size="small"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<Search />}
                      size="small"
                      className="bg-gray-700 hover:bg-gray-900 lowercase"
                      onClick={handleSearch}
                    >
                      Search
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            {showResult && (
              <SearchResult
                loading={loading}
                resultRef={resultRef}
                searchResults={searchResults}
              />
            )}
          </div>
        </div>
      </nav>
      {/* mobile navbar */}
      <MobileNavbar />
      <div className="container mx-auto px-4 md:px-0 overflow-x-hidden">
        {children}
      </div>
    </>
  )
}

export default MovieHeader
