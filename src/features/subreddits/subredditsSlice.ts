import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import { createAppAsyncThunk } from '@/app/withTypes'
import { getSubreddits } from '@/api/reddit'

interface Subreddit {
  id: string
  url: string
  displayName: string
}

interface SubredditsState {
  subreddits: Subreddit[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: SubredditsState = {
  subreddits: [],
  status: 'idle',
  error: null,
}

export const fetchSubreddits = createAppAsyncThunk('subReddits/fetchSubreddits', async () => {
  const subreddits = await getSubreddits()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return subreddits.map((subreddit: any) => ({
    id: subreddit.id,
    url: subreddit.url,
    displayName: subreddit.display_name,
  }))
})

const subredditSlice = createSlice({
  name: 'subreddits',
  initialState,
  reducers: {},
  extraReducers: (bulider) => {
    bulider
      .addCase(fetchSubreddits.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.subreddits = action.payload
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'error'
      })
  },
})

export default subredditSlice.reducer

export const selectAllSubreddits = (state: RootState) => state.subreddits.subreddits
export const selectSubredditsStatus = (state: RootState) => state.subreddits.status
export const selectSubredditsError = (state: RootState) => state.subreddits.error
