import { AiOutlineSearch } from 'react-icons/ai'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectSubredditPostsSearchTerm, setSearchTerm } from '../subredditPostsSlice'
import { debounce } from '@/utils/debounce'
import CustomInput from '@/components/CustomInput/CustomInput'

function SearchTermInput() {
  const [term, setTerm] = useState('')
  const dispatch = useAppDispatch()
  const searchTerm = useAppSelector(selectSubredditPostsSearchTerm)

  useEffect(() => {
    setTerm(searchTerm)
  }, [searchTerm])

  function handleTermChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTerm(e.target.value)
    debounce(() => {
      dispatch(setSearchTerm(e.target.value))
    })()
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
