import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks'
import Layout from './components/Layout/Layout'
import SubredditPostCard from '@/features/subredditPosts/SubredditPostCard/SubredditPostCard'
import SubredditsList from '@/features/subreddits/SubredditsList/SubredditsList'
import SubredditPostCardSkeleton from '@/features/subredditPosts/SubredditPostCard/SubRedditPostCardSkeleton'
import SearchTermInput from '@/features/subredditPosts/SearchTermInput/SearchTermInput'
import {
  fetchSubredditPosts,
  selectPostsBySearchTerm,
  selectSubredditPostsSelectedSubredditUrl,
  selectedSubredditPostsStatus,
  selectedSubredditPostsError,
  selectSubredditPostsSearchTerm,
  fetchSubredditComments,
} from '@/features/subredditPosts/subredditPostsSlice'

function App() {
  const dispatch = useAppDispatch()
  const selectedSubredditUrl = useAppSelector(selectSubredditPostsSelectedSubredditUrl)
  const subRedditStatus = useAppSelector(selectedSubredditPostsStatus)
  const subRedditError = useAppSelector(selectedSubredditPostsError)
  const subRedditPosts = useAppSelector(selectPostsBySearchTerm)
  const searchTerm = useAppSelector(selectSubredditPostsSearchTerm)

  useEffect(() => {
    dispatch(fetchSubredditPosts(selectedSubredditUrl))
  }, [dispatch, selectedSubredditUrl])

  function handleToggleComments(index: number) {
    return function (permalink: string) {
      dispatch(fetchSubredditComments({ index, permalink }))
    }
  }

  let content: React.ReactNode

  if (subRedditStatus === 'loading') {
    content = (
      <>
        {Array.from({ length: 10 }).map((_, i) => (
          <SubredditPostCardSkeleton key={i} />
        ))}
      </>
    )
  } else if (subRedditStatus === 'succeeded') {
    if (subRedditPosts.length > 0) {
      content = (
        <>
          {subRedditPosts.map((post, index) => (
            <SubredditPostCard
              key={post.id}
              post={post}
              onToggleComments={handleToggleComments(index)}
            />
          ))}
        </>
      )
    } else {
      content = <h2>No posts matching "{searchTerm}"</h2>
    }
  } else if (subRedditStatus === 'failed') {
    content = <div>{subRedditError}</div>
  }

  return (
    <Layout
      headerEnd={<SearchTermInput />}
      sidebarTitle="Subreddits"
      sidebarList={<SubredditsList />}
    >
      {content}
    </Layout>
  )
}

export default App
