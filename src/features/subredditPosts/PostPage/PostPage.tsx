import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  fetchSubredditPosts,
  selectPostsBySearchTerm,
  selectSubredditPostsSelectedSubredditUrl,
  selectedSubredditPostsStatus,
  selectedSubredditPostsError,
  selectSubredditPostsSearchTerm,
  fetchSubredditComments,
} from '@/features/subredditPosts/subredditPostsSlice'
import PostCard from '@/features/subredditPosts/PostCard/PostCard'
import PostCardSkeleton from '@/features/subredditPosts/PostCard/PostCardSkeleton'

function PostPage() {
  const dispatch = useAppDispatch()
  const selectedSubredditUrl = useAppSelector(selectSubredditPostsSelectedSubredditUrl)
  const subRedditStatus = useAppSelector(selectedSubredditPostsStatus)
  const subRedditError = useAppSelector(selectedSubredditPostsError)
  const subRedditPosts = useAppSelector(selectPostsBySearchTerm)
  const searchTerm = useAppSelector(selectSubredditPostsSearchTerm)

  useEffect(() => {
    if (subRedditStatus === 'idle') {
      dispatch(fetchSubredditPosts(selectedSubredditUrl))
    }
  }, [dispatch, selectedSubredditUrl, subRedditStatus])

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
