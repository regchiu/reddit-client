import Layout from './components/Layout/Layout'
import SubredditList from '@/features/subreddits/SubredditList/SubredditList'
import SearchTermInput from '@/features/subredditPosts/SearchTermInput/SearchTermInput'
import PostPage from './features/subredditPosts/PostPage/PostPage'

function App() {
  return (
    <Layout
      headerEnd={<SearchTermInput />}
      sidebarTitle="Subreddits"
      sidebarList={<SubredditList />}
    >
      <PostPage />
    </Layout>
  )
}

export default App
