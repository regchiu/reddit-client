import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks'
import Layout from './components/Layout/Layout'
import PostCard from '@/features/subredditPosts/PostCard/PostCard'
import PostCardSkeleton from '@/features/subredditPosts/PostCard/PostCardSkeleton'
import SubredditList from '@/features/subreddits/SubredditList/SubredditList'
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

  function renderPostCard() {
    if (subRedditStatus === 'loading') {
      return (
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </>
      )
    }

    if (subRedditStatus === 'succeeded') {
      if (subRedditPosts.length > 0) {
        return (
          <>
            {subRedditPosts.map((post, index) => (
              <PostCard key={post.id} post={post} onToggleComments={handleToggleComments(index)} />
            ))}
          </>
        )
      }
      return <h2>No posts matching "{searchTerm}"</h2>
    }

    if (subRedditStatus === 'failed') {
      return <div>{subRedditError}</div>
    }

    return null
  }

  return (
    <Layout
      headerEnd={<SearchTermInput />}
      sidebarTitle="Subreddits"
      sidebarList={<SubredditList />}
    >
      {renderPostCard()}
    </Layout>
  )
}

export default App
