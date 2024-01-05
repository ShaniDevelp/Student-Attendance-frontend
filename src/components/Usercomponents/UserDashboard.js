import React from 'react'
import UserSidebar from './UserSidebar'
import UserContent from './UserContent'

const UserDashboard = () => {
  return (
    <div className='admin d-flex '>
        <UserSidebar/>
        <UserContent/>
    </div>
  )
}

export default UserDashboard