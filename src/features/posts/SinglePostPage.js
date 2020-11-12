import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import { TimeAgo } from './TimeAgo'


export const SinglePostPage = ({ match }) => {
  const { postId } = match.params       //match object as a prop that contains the URL information

  const post = useSelector(state =>
    state.posts.find(post => post.id === postId)
  )     //Array.find() function to loop through the array

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <PostAuthor userId={post.user}/>
        <TimeAgo timestamp={post.date} />
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />      
        <Link to = {`/editPost/${post.id}`} className="button">
            Edit Post
        </Link>
      </article>
    </section>
  )
}