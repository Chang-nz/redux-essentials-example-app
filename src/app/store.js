import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postsSlice'

export default configureStore({
  reducer: {
    posts: postsReducer         //state连到 postsReducer 再连 postsSlice
  }
})




/*
export default configureStore({
  reducer: () => ({}),
})
*/