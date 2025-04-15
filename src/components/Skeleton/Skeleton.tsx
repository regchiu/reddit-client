import React from 'react'
import styles from './Skeleton.module.scss'

interface SkeletonProps {
  style?: React.CSSProperties
}

function Skeleton({ style }: SkeletonProps) {
  return <div className={styles['skeleton']} style={{ ...style }}></div>
}

export default Skeleton
