import { ReactNode } from 'react'
import styles from './Layout.module.scss'
import { AiFillRedditCircle } from 'react-icons/ai'

interface LayoutProps {
  children?: ReactNode
  headerEnd?: ReactNode
  sidebarTitle?: string
  sidebarList?: ReactNode
}

function Layout({ children, sidebarTitle, sidebarList, headerEnd }: LayoutProps) {
  return (
    <div className={styles['layout']}>
      <header className={styles['layout__header']}>
        <div className={styles['layout__icon']}>
          <AiFillRedditCircle size={32} />
          <span>RedditMinimal</span>
        </div>
        {headerEnd}
      </header>

      <div className={styles['layout__main']}>
        <aside className={styles['layout__sidebar']}>
          <h2>{sidebarTitle ?? 'Sidebar title'}</h2>
          {sidebarList}
        </aside>

        <section className={styles['layout__content']}>{children}</section>
      </div>
    </div>
  )
}

export default Layout
