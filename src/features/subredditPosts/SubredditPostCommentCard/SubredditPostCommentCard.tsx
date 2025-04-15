import Card from '@/components/Card/Card'
import type { Comment } from '../subredditPostsSlice'
import styles from './SubredditPostCommentCard.module.scss'
import dayjs from '@/utils/dayjs'

interface SubredditPostCommentCardProps {
  comment: Comment
}

function SubredditPostCommentCard({ comment }: SubredditPostCommentCardProps) {
  return (
    <Card className={styles['subreddit-post-comment-card']}>
      <div className={styles['subreddit-post-comment-card__metadata']}>
        <p className={styles['subreddit-post-comment-card__author']}>{comment.author}</p>
        <p className={styles['subreddit-post-comment-card__time']}>
          {dayjs.unix(comment.createdUtc).fromNow()}
        </p>
      </div>
      <p className={styles['subreddit-post-comment-card__body']}>{comment.body}</p>
    </Card>
  )
}

export default SubredditPostCommentCard
