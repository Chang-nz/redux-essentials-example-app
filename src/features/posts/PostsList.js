import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { PostAuthor } from './PostAuthor'


export const PostsList = () => {
  const posts = useSelector(state => state.posts)   //---useSelector() 从redux的store对象中提取数据(state)。

  //substring(int beginIndex, int endIndex) 下面只能100字符0--100
  const renderedPosts = posts.map(post => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>  
      <PostAuthor userId={post.user}/>
      <Link to= {`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ))

  return (
    <section>
      <h2>Posts</h2>
     
      {renderedPosts}
    </section>
  )
}
