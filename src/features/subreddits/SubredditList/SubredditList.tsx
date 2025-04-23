import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  fetchSubreddits,
  selectAllSubreddits,
  selectSubredditsError,
  selectSubredditsStatus,
} from '@/features/subreddits/subredditsSlice'
import {
  fetchSubredditPosts,
  selectSubredditPostsSelectedSubredditUrl,
  setSelectedSubreddit,
} from '@/features/subredditPosts/subredditPostsSlice'
import cn from 'classnames'
import styles from './SubredditList.module.scss'
import Skeleton from '@/components/Skeleton/Skeleton'

function SubredditList() {
  const dispatch = useAppDispatch()
  const subreddits = useAppSelector(selectAllSubreddits)
  const subredditsStatus = useAppSelector(selectSubredditsStatus)
  const subredditsError = useAppSelector(selectSubredditsError)
  const selectedSubreddit = useAppSelector(selectSubredditPostsSelectedSubredditUrl)

  useEffect(() => {
    if (subredditsStatus === 'idle') {
      dispatch(fetchSubreddits())
    }
  }, [subredditsStatus, dispatch])

  function renderList() {
    if (subredditsStatus === 'loading') {
      return (
        <>
          {Array.from({ length: 30 }).map((_, i) => (
            <Skeleton key={i} style={{ width: '100%', height: 16, marginBottom: 6 }} />
          ))}
        </>
      )
    }

    if (subredditsStatus === 'succeeded') {
      return subreddits.map((subreddit) => (
        <li key={subreddit.id}>
          <button
            className={cn(
              styles['link-btn'],
              selectedSubreddit === subreddit.url && styles['link-btn--active']
            )}
            onClick={() => {
              dispatch(setSelectedSubreddit(subreddit.url))
              dispatch(fetchSubredditPosts())
            }}
          >
            {subreddit.displayName}
          </button>
        </li>
      ))
    }

    if (subredditsStatus === 'failed') {
      return <li>{subredditsError}</li>
    }

    return null
  }

  return <ul className={styles['subreddits-list']}>{renderList()}</ul>
}

export default SubredditList
