import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import subredditsReducer from '@/features/subreddits/subredditsSlice'
import subredditPostsReducer from '@/features/subredditPosts/subredditPostsSlice'

export const store = configureStore({
  reducer: {
    subreddits: subredditsReducer,
    subredditPosts: subredditPostsReducer,
  },
})

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>
// Export a reusable type for handwritten thunks
export type AppThunk = ThunkAction<void, RootState, unknown, Action>
