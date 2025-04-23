import { AiOutlineSearch } from 'react-icons/ai'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  fetchSubredditPosts,
  selectSubredditPostsSearchTerm,
  setSearchTerm,
} from '../subredditPostsSlice'
import CustomInput from '@/components/CustomInput/CustomInput'
import useDebounceCallback from '@/hooks/useDebounceCallback'

function SearchTermInput() {
  const dispatch = useAppDispatch()
  const searchTerm = useAppSelector(selectSubredditPostsSearchTerm)
  const [term, setTerm] = useState('')

  useEffect(() => {
    setTerm(searchTerm)
  }, [searchTerm])

  const debounceSearch = useDebounceCallback((term: string) => {
    dispatch(setSearchTerm(term))
    dispatch(fetchSubredditPosts())
  })

  function handleTermChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTerm(e.target.value)
    debounceSearch(e.target.value)
  }

  return (
    <CustomInput
      icon={<AiOutlineSearch size={24} />}
      type="text"
      placeholder="Search..."
      value={term}
      onChange={handleTermChange}
    />
  )
}

export default SearchTermInput
