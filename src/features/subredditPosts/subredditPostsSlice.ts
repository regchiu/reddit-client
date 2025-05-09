import { createSlice } from '@reduxjs/toolkit'
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
  url: string
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
  async (_, { getState }) => {
    const { subredditPosts } = getState()
    const { selectedSubredditUrl, searchTerm } = subredditPosts
    const posts = await getSubredditPosts(selectedSubredditUrl, searchTerm)

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
      url: post.url,
    }))
  }
)

export const fetchSubredditComments = createAppAsyncThunk(
  'subredditPosts/fetchSubredditComments',
  async ({ index, permalink }: { index: number; permalink: string }, { dispatch, getState }) => {
    // If we're hiding comment, don't fetch the comments.
    dispatch(toggleShowingComments(index))
    const { subredditPosts } = getState()
    if (!subredditPosts.posts[index].showingComments) {
      return {
        index,
        comments: subredditPosts.posts[index].comments,
      }
    }

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
    toggleShowingComments(state, action) {
      state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments
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
        const index = action.meta.arg.index
        state.posts[index].commentsStatus = 'loading'
        state.posts[index].commentsError = null
      })
      .addCase(fetchSubredditComments.fulfilled, (state, action) => {
        const index = action.meta.arg.index
        state.posts[index].commentsStatus = 'succeeded'
        state.posts[index].comments = action.payload.comments
      })
      .addCase(fetchSubredditComments.rejected, (state, action) => {
        const index = action.meta.arg.index
        state.posts[index].commentsStatus = 'failed'
        state.posts[index].commentsError = action.error.message ?? 'error'
      })
  },
})

export const { setSelectedSubreddit, setSearchTerm, toggleShowingComments } =
  subredditPostsSlice.actions

export default subredditPostsSlice.reducer

export const selectAllSubredditPosts = (state: RootState) => state.subredditPosts.posts
export const selectedSubredditPostsStatus = (state: RootState) => state.subredditPosts.status
export const selectedSubredditPostsError = (state: RootState) => state.subredditPosts.error
export const selectSubredditPostsSelectedSubredditUrl = (state: RootState) =>
  state.subredditPosts.selectedSubredditUrl
export const selectSubredditPostsSearchTerm = (state: RootState) => state.subredditPosts.searchTerm
