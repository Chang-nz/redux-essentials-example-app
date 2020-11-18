import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

import { fetchNotifications } from '../features/notifications/notificationsSlice'
import {selectAllNotifications } from '../features/notifications/notificationsSlice'

export const Navbar = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectAllNotifications)
  const numUnreadNotifications = notifications.filter(n => !n.read).length

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())      //忘写（）了，所以Notifications没有内容
  }

  let unreadNotificationsBadge    //show us the count of "Unread" notifications

  if (numUnreadNotifications > 0) {
    unreadNotificationsBadge = (
      <span className="badge">{numUnreadNotifications}</span>
    )
  }

  return (
    <nav>
      <section>
        <h1>Redux 基本例子</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/" >Posts </Link> 
            <Link to="/users" >Users </Link>
            <Link to ="/notifications">Notifications {unreadNotificationsBadge} </Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
