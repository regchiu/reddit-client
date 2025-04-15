import React from 'react'
import styles from './Card.module.scss'
import cn from 'classnames'

interface CardProps {
  isLoading?: boolean
  className?: string
  children?: React.ReactNode
}

function Card({ isLoading, className, children }: CardProps) {
  return (
    <div className={cn(styles['card'], isLoading && styles['card--loading'], className)}>
      {children}
    </div>
  )
}

export default Card
