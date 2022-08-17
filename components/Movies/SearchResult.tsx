import React, { FC } from 'react'
import { MovieData } from '../../types'
import SearchCard from './SearchCard'

type SearchResultPropType = {
  resultRef: React.RefObject<HTMLDivElement>
  loading: boolean
  searchResults: MovieData[]
}

const SearchResult: FC<SearchResultPropType> = ({
  resultRef,
  loading,
  searchResults,
}) => {
  return (
    <div
      ref={resultRef}
      className="absolute top-full left-0 w-full h-72 bg-white p-2 overflow-x-hidden overflow-y-auto shadow-md rounded-b-md  text-left"
    >
      {loading && <p className="text-black">loading...</p>}
      {!loading && (
        <>
          {searchResults.map((result) => {
            return (
              <SearchCard
                key={result.id}
                id={result.id}
                popularity={result.popularity}
                title={result.title}
                poster_path={result.poster_path}
              />
            )
          })}
        </>
      )}
    </div>
  )
}

export default SearchResult
