import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {client} from '../../api/client'       //? ../../

const initialState = {
  posts: [],
  status: 'idle',
  error: null
}

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
      const existingPost = state.posts.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    

    postUpdated(state, action) {
      const {id,title, content} = action.payload
      const existingPost = state.posts.find(post=> post.id === id)
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
      state.posts = state.posts.concat(action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewPost.fulfilled]: (state, action) => {
      // We can directly add the new post object to our posts array
      state.posts.push(action.payload)
    },
  }

})

export const {postAdded,postUpdated,reactionAdded} = postsSlice.actions

export default postsSlice.reducer

//change any uses of state as an array to be state.posts instead,
export const selectAllPosts = state => state.posts.posts  //少写了一个posts,所以不显示

export const selectPostById = (state, postId) =>
  state.posts.find(post => post.id === postId)