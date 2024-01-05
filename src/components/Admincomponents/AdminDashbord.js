import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminContent from './AdminContent'
const AdminDashbord = () => {
  return (
    <div className='admin d-flex '>
        <AdminSidebar/>
        <AdminContent/>
    </div>
  )
}

export default AdminDashbord