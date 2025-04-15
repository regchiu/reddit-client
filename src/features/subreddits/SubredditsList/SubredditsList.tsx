import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  fetchSubreddits,
  selectAllSubreddits,
  selectSubredditsError,
  selectSubredditsStatus,
} from '@/features/subreddits/subredditsSlice'
import {
  selectSubredditPostsSelectedSubredditUrl,
  setSelectedSubreddit,
} from '@/features/subredditPosts/subredditPostsSlice'
import cn from 'classnames'
import styles from './SubredditsList.module.scss'

function SubredditsList() {
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

  let content: React.ReactNode
  if (subredditsStatus === 'loading') {
    content = <div>Loading...</div>
  } else if (subredditsStatus === 'succeeded') {
    content = subreddits.map((subreddit) => (
      <li key={subreddit.id}>
        <button
          className={cn(
            styles['link-btn'],
            selectedSubreddit === subreddit.url && styles['link-btn--active']
          )}
          onClick={() => dispatch(setSelectedSubreddit(subreddit.url))}
        >
          {subreddit.displayName}
        </button>
      </li>
    ))
  } else if (subredditsStatus === 'failed') {
    content = <li>{subredditsError}</li>
  }

  return <ul className={styles['subreddits-list']}>{content}</ul>
}

export default SubredditsList
