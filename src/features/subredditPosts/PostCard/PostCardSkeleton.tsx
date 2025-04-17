import Card from '@/components/Card/Card'
import styles from './PostCard.module.scss'
import Skeleton from '@/components/Skeleton/Skeleton'

function PostCardSkeleton() {
  return (
    <Card className={styles['post-card']} isLoading={true}>
      <div className={styles['post-card__vote']}>
        <Skeleton style={{ height: 20, width: 20 }} />
        <Skeleton style={{ height: 20, width: 20 }} />
        <Skeleton style={{ height: 20, width: 20 }} />
      </div>

      <div className={styles['post-card__content']}>
        <Skeleton style={{ width: '70%', height: 24, marginBottom: 8 }} />
        <Skeleton style={{ width: '100%', height: 16, marginBottom: 6 }} />
        <Skeleton style={{ width: '90%', height: 16, marginBottom: 16 }} />
        <Skeleton style={{ width: '50%', height: 14 }} />
      </div>
    </Card>
  )
}

export default PostCardSkeleton
