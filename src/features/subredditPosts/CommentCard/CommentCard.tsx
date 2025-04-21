import Card from '@/components/Card/Card'
import type { Comment } from '../subredditPostsSlice'
import styles from './CommentCard.module.scss'
import dayjs from '@/utils/dayjs'
import ReactMarkdown from 'react-markdown'

interface CommentCardProps {
  comment: Comment
}

function CommentCard({ comment }: CommentCardProps) {
  return (
    <Card className={styles['comment-card']}>
      <div className={styles['comment-card__metadata']}>
        <p className={styles['comment-card__author']}>{comment.author}</p>
        <p className={styles['comment-card__time']}>{dayjs.unix(comment.createdUtc).fromNow()}</p>
      </div>
      <ReactMarkdown>{comment.body}</ReactMarkdown>
    </Card>
  )
}

export default CommentCard
