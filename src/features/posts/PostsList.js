import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import { TimeAgo } from './TimeAgo'

import { selectAllPosts } from './postsSlice'


export const PostsList = () => {
  const posts = useSelector(selectAllPosts)
  //const posts = useSelector(state => state.posts)   //---useSelector() 从redux的store对象中提取数据(state)。
   
  const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))

  //substring(int beginIndex, int endIndex) 下面只能100字符0--100
  //<article> 标签定义外部的内容。外部内容可以是来自一个外部的新闻提供者的一篇新的文章，
  //或者来自 blog 的文本，或者是来自论坛的文本。亦或是来自其他外部源内容。
  const renderedPosts = orderedPosts.map(post => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <PostAuthor userId={post.user}/>
      <TimeAgo timestamp={post.date}/>
      <p>{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
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
