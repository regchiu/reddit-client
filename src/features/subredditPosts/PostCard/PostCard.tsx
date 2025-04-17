import React from 'react'
import { AiOutlineCaretUp, AiOutlineCaretDown, AiOutlineComment } from 'react-icons/ai'
import type { Post } from '@/features/subredditPosts/subredditPostsSlice'
import styles from './PostCard.module.scss'
import cn from 'classnames'
import dayjs from '@/utils/dayjs'
import Card from '@/components/Card/Card'
import CommentCard from '../CommentCard/CommentCard'
import CommentCardSkeleton from '../CommentCard/CommentCardSkeleton'

interface PostCardProps {
  post: Post
  onToggleComments: (permalink: string) => void
}

function PostCard({ post, onToggleComments }: PostCardProps) {
  function renderComments() {
    let comments: React.ReactNode
    if (post.commentsStatus === 'loading') {
      comments = <CommentCardSkeleton />
    } else if (post.commentsStatus === 'succeeded') {
      if (post.showingComments && post.comments.length > 0) {
        comments = (
          <>
            {post.comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
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
    <Card className={styles['post-card']}>
      <div className={styles['post-card__vote']}>
        <div className={cn(styles['post-card__vote-btn'], styles['post-card__vote-btn--up'])}>
          <AiOutlineCaretUp />
        </div>
        <div className={styles['post-card__vote-count']}>{post.ups}</div>
        <div className={cn(styles['post-card__vote-btn'], styles['post-card__vote-btn--down'])}>
          <AiOutlineCaretDown />
        </div>
      </div>
      <div className={styles['post-card__content']}>
        <h2 className={styles['post-card__title']}>{post.title}</h2>
        <p className={styles['post-card__body']}>{post.selftext}</p>
        <hr className={styles['divider']} />
        <div className={styles['post-card__meta']}>
          <span className={styles['post-card__author']}>{post.author}</span>
          <span className={styles['post-card__time']}>{dayjs.unix(post.createdUtc).fromNow()}</span>
          <span className={styles['post-card__comments']}>
            <button
              className={cn(
                styles['post-card__comments-btn'],
                post.showingComments && styles['post-card__comments-btn--active']
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

export default PostCard
