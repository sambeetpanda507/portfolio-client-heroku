import { FC, useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'
import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { Search } from '@mui/icons-material'
import { MovieData } from '../../types'
import SearchResult from './SearchResult'

const MobileNavbar: FC = () => {
  const [open, setOpen] = useState<boolean>(false)
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
    <nav className="bg-gray-900 text-white p-4 sticky top-0 left-0 w-full block md:hidden z-10">
      <div className="flex justify-between items-center">
        <p className="font-semibold">
          <Link href="/movies">
            <a>
              Movies<span className="text-yellow-400">की</span>Dunia
            </a>
          </Link>
        </p>
        <IconButton
          aria-label="hamburgerMenu"
          className="text-white"
          onClick={() => setOpen((prev) => !prev)}
        >
          <MenuIcon />
        </IconButton>
      </div>
      <div
        className={`text-center transition-all ease-in-out delay-150 ${
          open ? 'h-auto' : 'h-0'
        }`}
      >
        <ul>
          {/* nav links */}
          <li className={`my-2 capitalize ${open ? 'block' : 'hidden'}`}>
            <Link href="/movies">
              <a>top rated movies</a>
            </Link>
          </li>
          <li className={`my-2 capitalize ${open ? 'block' : 'hidden'}`}>
            <Link href="/movies/popular-movies">
              <a>popular movies</a>
            </Link>
          </li>
          <li className={`my-2 capitalize ${open ? 'block' : 'hidden'}`}>
            <Link href="/movies/upcoming-movies">
              <a>upcoming movies</a>
            </Link>
          </li>
        </ul>
        {/* input search field */}
        <div className={`relative ${open ? 'block' : 'hidden'}`}>
          <TextField
            variant="outlined"
            name="search"
            placeholder="search"
            color="primary"
            className="bg-white rounded-md"
            size="small"
            fullWidth
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
                    className="bg-gray-900 hover:bg-teal-900 lowercase"
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
  )
}

export default MobileNavbar
