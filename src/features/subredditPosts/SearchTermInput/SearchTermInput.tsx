import { AiOutlineSearch } from 'react-icons/ai'
import styles from './SearchTermInput.module.scss'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectSubredditPostsSearchTerm, setSearchTerm } from '../subredditPostsSlice'
import { debounce } from '@/utils/debounce'

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
    <div className={styles['search-term-input']}>
      <AiOutlineSearch size={24} />
      <input type="text" placeholder="Search..." value={term} onChange={handleTermChange} />
    </div>
  )
}

export default SearchTermInput
