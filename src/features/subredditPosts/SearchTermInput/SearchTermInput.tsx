import { AiOutlineSearch } from 'react-icons/ai'
import React from 'react'
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

  const debounceSearch = useDebounceCallback(() => {
    dispatch(fetchSubredditPosts())
  })

  function handleTermChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setSearchTerm(e.target.value))
    debounceSearch(e.target.value)
  }

  return (
    <CustomInput
      icon={<AiOutlineSearch size={24} />}
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleTermChange}
    />
  )
}

export default SearchTermInput
