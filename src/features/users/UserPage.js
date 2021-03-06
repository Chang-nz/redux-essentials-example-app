import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
//import { selectAllPosts } from '../posts/postsSlice'
import { selectUserById } from './usersSlice'
import {selectPostsByUser} from '../posts/postsSlice'

export const UserPage = ({match}) => {
    const {userId} = match.params

    const user = useSelector((state) =>selectUserById(state,userId))  //之前userId写错了

    const postsForUser = useSelector((state) =>selectPostsByUser(state,userId))

    //Link to SinglePostPage
    const postTitles =postsForUser.map((post) =>(
        <li key={post.id}>
            <Link to ={`/posts/${post.id}`}>{post.title}</Link>
        </li>
    ) )

    return (
        <section>
            <h2>{user.name}</h2>
            <ul> {postTitles}  </ul>
        </section>
    )
}