import Card from '@/components/Card/Card'
import styles from './SubredditPostCommentCard.module.scss'
import Skeleton from '@/components/Skeleton/Skeleton'

function SubredditPostCommentCardSkeleton() {
  return (
    <Card className={styles['subreddit-post-comment-card']} isLoading={true}>
      <div className={styles['subreddit-post-comment-card__metadata']}>
        <Skeleton style={{ width: '10%', height: 16, marginBottom: 6 }} />
        <Skeleton style={{ width: '10%', height: 16, marginBottom: 6 }} />
      </div>
      <Skeleton style={{ width: '100%', height: 100, marginBottom: 6 }} />
    </Card>
  )
}

export default SubredditPostCommentCardSkeleton
