import { createSlice, nanoid } from '@reduxjs/toolkit'


const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' }
]

//createSlice function to make a reducer function
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      //the "prepare callback" function can take multiple arguments, 
      //generate random values like unique IDs, 
      //and run to decide what values go into the action object. 
      prepare(title, content,userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user:userId,      //很重要
          }
        }
      }
    },
   

    postUpdated(state, action) {
      const {id,title, content} = action.payload
      const existingPost = state.find(post=> post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    }
  }
})

export const {postAdded,postUpdated} = postsSlice.actions

export default postsSlice.reducer