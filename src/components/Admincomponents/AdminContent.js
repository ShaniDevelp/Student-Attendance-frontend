import React, { useEffect } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Admindashboardcontent from './Admindashboardcontent';
import Studentsdatatable from './Studentsdatatable';
import { UseContextdata } from '../Context/Contaxtapi';
import Leaveapproval from './Leaveapproval'

// import ProfilePage from './ProfilePage';
import ProfilePage from '../Usercomponents/ProfilePage';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';

const AdminContent = () => {
    const { selectedItem, formData, data, getadmindata, allStudents , handleSidebarItemClick } = UseContextdata();
    const activeComponentTitle = () => {
        if (selectedItem === 'dashboard') {
            return 'Dashboard';
        } else if (selectedItem === 'students') {
            return 'Students';
        } else if (selectedItem === 'leaveApproval') {
            return 'Leave Approval';
        } else if (selectedItem === 'Profile') {
            return 'Profile';
        } else {
            return ''; // You can handle other cases here
        }
    };

    useEffect(() => {
        const admindata = JSON.parse(localStorage.getItem('admindata'))
        console.log(admindata)
        getadmindata(admindata)
    }, [])

    console.log(data)

    return (
        <div className='adminarea'>
            <div className='adminbox   w-100  '>
                <div className='adminheader   m-auto ' style={{ backgroundColor: '#fff',display:'flex', alignItems:'center'  }}>
                    <div className='active-button ' style={{ marginLeft: '10px' }}>
                        <h5 className='text-secondary'>{activeComponentTitle()}</h5>
                    </div>
                    <Menu menuButton={ <AccountCircleIcon sx={{fontSize:'50px'}} />} transition className='admin_name' style={{ cursor: 'pointer' }}>

                        <MenuItem onClick={() => { handleSidebarItemClick('Profile') }} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <AccountCircleIcon /> Profile</MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <Logout  />
                            </ListItemIcon>
                            Logout
                        </MenuItem>

                    </Menu>
                </div>

                {selectedItem === 'dashboard' && <div><Admindashboardcontent /><Studentsdatatable /></div>}
                {selectedItem === 'students' && <div className='mt-5'><Studentsdatatable /></div>}
                {selectedItem === 'leaveApproval' && <Leaveapproval />}
                {selectedItem === 'Profile' && <div className='mt-5'><ProfilePage /></div>}

            </div>
        </div>
    )
}

export default AdminContent


