import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'
import notificationsReducer from '../features/notifications/notificationsSlice'

//configureStore()在你的react项目里，只能出现一次，记住只能出现一次！！！
//如果出现了多次，就是违背了单一store原则。
export default configureStore({
  reducer: {
    posts: postsReducer,         //state连到 postsReducer 再连 postsSlice
    users: usersReducer,
    notifications: notificationsReducer,
  }
})

