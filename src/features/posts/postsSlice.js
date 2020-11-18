//The standard async middleware is called redux-thunk, which is included in Redux Toolkit
import { createSlice, createAsyncThunk,createSelector,createEntityAdapter } from '@reduxjs/toolkit'  
import {client} from '../../api/client'       //? ../../

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null
})
/*//
const initialState = {
  posts: [],
  status: 'idle',
  error: null
}
*/

// createAsyncThunk accepts two arguments: string, "payload creator" callback function
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')         //?
  return response.posts
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  // The payload creator receives the partial `{title, content, user}` object
  async (initialPost) => {
    // We send the initial data to the fake API server
    const response = await client.post('/fakeApi/posts', { post: initialPost })
    // The response includes the complete post object, including unique ID
    return response.post
  }
)

//createSlice function to make a reducer function
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.entities[postId]
     // const existingPost = state.posts.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    

    postUpdated(state, action) {
      const {id,title, content} = action.payload
      const existingPost = state.entities[id]
      //const existingPost = state.posts.find(post=> post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    }    
  },
  
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      //state.posts = state.posts.concat(action.payload)
      
      postsAdapter.upsertMany(state, action.payload)  // Use the `upsertMany` reducer as a mutating update utility
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    /*
    [addNewPost.fulfilled]: (state, action) => {
      // We can directly add the new post object to our posts array
      state.posts.push(action.payload)
    },
    */
    // Use the `addOne` reducer for the fulfilled case
    [addNewPost.fulfilled]: postsAdapter.addOne
  }

})

export const {postAdded,postUpdated,reactionAdded} = postsSlice.actions

export default postsSlice.reducer

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(state => state.posts)
/*
//change any uses of state as an array to be state.posts instead,
export const selectAllPosts = state => state.posts.posts  //少写了一个posts,所以不显示

export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId)    ////少写了一个posts,所以不显示SinglePostPage
*/
//createSelector function that generates memoized selectors that will only recalculate results when the inputs change. 
//生成记忆选择器， 该选择器仅在输入更改时重新计算结果。 
export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.user === userId)
  )  