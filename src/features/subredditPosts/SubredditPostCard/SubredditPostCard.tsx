import { AiOutlineCaretUp, AiOutlineCaretDown, AiOutlineComment } from 'react-icons/ai'
import type { Post } from '@/features/subredditPosts/subredditPostsSlice'
import Card from '@/components/Card/Card'
import styles from './SubredditPostCard.module.scss'
import cn from 'classnames'
import dayjs from '@/utils/dayjs'
import SubredditPostCommentCard from '../SubredditPostCommentCard/SubredditPostCommentCard'
import React from 'react'
import SubredditPostCommentCardSkeleton from '../SubredditPostCommentCard/SubredditPostCommentCardSkeleton'

interface SubredditPostCardProps {
  post: Post
  onToggleComments: (permalink: string) => void
}

function SubredditPostCard({ post, onToggleComments }: SubredditPostCardProps) {
  function renderComments() {
    let comments: React.ReactNode
    if (post.commentsStatus === 'loading') {
      comments = <SubredditPostCommentCardSkeleton />
    } else if (post.commentsStatus === 'succeeded') {
      if (post.showingComments && post.comments.length > 0) {
        comments = (
          <>
            {post.comments.map((comment) => (
              <SubredditPostCommentCard key={comment.id} comment={comment} />
            ))}
          </>
        )
      } else {
        comments = null
      }
    } else if (post.commentsStatus === 'failed') {
      comments = <h3>{post.commentsError}</h3>
    }

    return comments
  }
  return (
    <Card className={styles['subreddit-post-card']}>
      <div className={styles['subreddit-post-card__vote']}>
        <div
          className={cn(
            styles['subreddit-post-card__vote-btn'],
            styles['subreddit-post-card__vote-btn--up']
          )}
        >
          <AiOutlineCaretUp />
        </div>
        <div className={styles['subreddit-post-card__vote-count']}>{post.ups}</div>
        <div
          className={cn(
            styles['subreddit-post-card__vote-btn'],
            styles['subreddit-post-card__vote-btn--down']
          )}
        >
          <AiOutlineCaretDown />
        </div>
      </div>
      <div className={styles['subreddit-post-card__content']}>
        <h2 className={styles['subreddit-post-card__title']}>{post.title}</h2>
        <p className={styles['subreddit-post-card__body']}>{post.selftext}</p>
        <hr className={styles['divider']} />
        <div className={styles['subreddit-post-card__meta']}>
          <span className={styles['subreddit-post-card__author']}>{post.author}</span>
          <span className={styles['subreddit-post-card__time']}>
            {dayjs.unix(post.createdUtc).fromNow()}
          </span>
          <span className={styles['subreddit-post-card__comments']}>
            <button
              className={cn(
                styles['subreddit-post-card__comments-btn'],
                post.showingComments && styles['subreddit-post-card__comments-btn--active']
              )}
              onClick={() => onToggleComments(post.permalink)}
            >
              <AiOutlineComment size={16} />
            </button>
            <span>{post.numComments}</span>
          </span>
        </div>
        {renderComments()}
      </div>
    </Card>
  )
}

export default SubredditPostCard
