
import React, { useState } from 'react'
import { postAdded } from './postsSlice'

import {useDispatch,useSelector} from 'react-redux'


export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [date,setDate] =useState(new Date() )    //现在不能工作，不知道为什么？

  const dispatch = useDispatch()

  const users = useSelector(state => state.users)

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onAuthorChaned = e => setUserId(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded( title, content,userId,date))      //date现在不能工作，不知道为什么？
            
      setTitle('')            //SAVE后清空
      setContent('')
    }
  }

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
  //option key={user.id} value={user.id}   ?
  const usersOptions =users.map(user => (
    <option key={user.id} value={user.id}  >    
      {user.name}
    </option>
  ) )

  return (
    <section>
      <h2>Add a New Post</h2>
      <div className="row">
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor" >Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChaned}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
      </form>
      </div>
    </section>
  )
}