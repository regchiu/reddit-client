import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import { createAppAsyncThunk } from '@/app/withTypes'
import { getPostComments, getSubredditPosts } from '@/api/reddit'

export interface Comment {
  id: string
  author: string
  createdUtc: number
  body: string
}

export interface Post {
  id: string
  ups: number
  title: string
  selftext: string
  author: string
  createdUtc: number
  permalink: string
  showingComments: boolean
  numComments: number
  comments: Comment[]
  commentsStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  commentsError: string | null
}

interface SubredditPostsState {
  posts: Post[]
  searchTerm: string
  selectedSubredditUrl: string
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: SubredditPostsState = {
  posts: [],
  searchTerm: '',
  selectedSubredditUrl: '/r/Home/',
  status: 'idle',
  error: null,
}

export const fetchSubredditPosts = createAppAsyncThunk(
  'subredditPosts/fetchSubredditPosts',
  async (subredditUrl: string) => {
    const posts = await getSubredditPosts(subredditUrl)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return posts.map((post: any) => ({
      id: post.id,
      ups: post.ups,
      title: post.title,
      selftext: post.selftext,
      author: post.author,
      createdUtc: post.created_utc,
      permalink: post.permalink,
      showingComments: false,
      numComments: post.num_comments,
      commentsStatus: 'idle',
      commentsError: null,
    }))
  }
)

export const fetchSubredditComments = createAppAsyncThunk(
  'subredditPosts/fetchSubredditComments',
  async ({ index, permalink }: { index: number; permalink: string }) => {
    const comments = await getPostComments(permalink)

    return {
      index,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      comments: comments.map((comment: any) => ({
        id: comment.id,
        author: comment.author,
        createdUtc: comment.created_utc,
        body: comment.body,
      })),
    }
  }
)

const subredditPostsSlice = createSlice({
  name: 'subredditPosts',
  initialState,
  reducers: {
    setSelectedSubreddit(state, action) {
      state.selectedSubredditUrl = action.payload
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubredditPosts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchSubredditPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = action.payload
      })
      .addCase(fetchSubredditPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'error'
      })
      .addCase(fetchSubredditComments.pending, (state, action) => {
        state.posts[action.meta.arg.index].showingComments =
          !state.posts[action.meta.arg.index].showingComments
        if (!state.posts[action.meta.arg.index].showingComments) {
          return
        }
        state.posts[action.meta.arg.index].commentsStatus = 'loading'
        state.posts[action.meta.arg.index].commentsError = null
      })
      .addCase(fetchSubredditComments.fulfilled, (state, action) => {
        state.posts[action.meta.arg.index].commentsStatus = 'succeeded'
        state.posts[action.meta.arg.index].comments = action.payload.comments
      })
      .addCase(fetchSubredditComments.rejected, (state, action) => {
        state.posts[action.meta.arg.index].commentsStatus = 'failed'
        state.posts[action.meta.arg.index].commentsError = action.error.message ?? 'error'
      })
  },
})

export const { setSelectedSubreddit, setSearchTerm } = subredditPostsSlice.actions

export default subredditPostsSlice.reducer

export const selectAllSubredditPosts = (state: RootState) => state.subredditPosts.posts
export const selectedSubredditPostsStatus = (state: RootState) => state.subredditPosts.status
export const selectedSubredditPostsError = (state: RootState) => state.subredditPosts.error
export const selectSubredditPostsSelectedSubredditUrl = (state: RootState) =>
  state.subredditPosts.selectedSubredditUrl
export const selectSubredditPostsSearchTerm = (state: RootState) => state.subredditPosts.searchTerm

export const selectPostsBySearchTerm = createSelector(
  [selectAllSubredditPosts, selectSubredditPostsSearchTerm],
  (posts, searchTerm) => {
    if (searchTerm !== '') {
      return posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    return posts
  }
)
