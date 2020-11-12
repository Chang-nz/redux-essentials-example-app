import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!',user: '0', 
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  { id: '2', title: 'Second Post', content: 'More text',user: '1', 
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  }
]

//createSlice function to make a reducer function
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },

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
            date: new Date().toISOString(),   //前面忘了在toISOString写()，所以date不工作。
            title,
            content,
            user:userId,      //很重要 PostAuthor的参数是userId
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        }
      },
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

export const {postAdded,postUpdated,reactionAdded} = postsSlice.actions

export default postsSlice.reducer