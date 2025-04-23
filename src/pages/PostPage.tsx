import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  fetchSubredditPosts,
  selectedSubredditPostsStatus,
  selectedSubredditPostsError,
  selectSubredditPostsSearchTerm,
  fetchSubredditComments,
  selectAllSubredditPosts,
} from '@/features/subredditPosts/subredditPostsSlice'
import PostCard from '@/features/subredditPosts/PostCard/PostCard'
import PostCardSkeleton from '@/features/subredditPosts/PostCard/PostCardSkeleton'

function PostPage() {
  const dispatch = useAppDispatch()
  const subRedditStatus = useAppSelector(selectedSubredditPostsStatus)
  const subRedditError = useAppSelector(selectedSubredditPostsError)
  const subRedditPosts = useAppSelector(selectAllSubredditPosts)
  const searchTerm = useAppSelector(selectSubredditPostsSearchTerm)

  useEffect(() => {
    if (subRedditStatus === 'idle') {
      dispatch(fetchSubredditPosts())
    }
  }, [dispatch, subRedditStatus])

  function handleToggleComments(index: number) {
    return function (permalink: string) {
      dispatch(fetchSubredditComments({ index, permalink }))
    }
  }

  function renderPostPage() {
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

  return renderPostPage()
}

export default PostPage
