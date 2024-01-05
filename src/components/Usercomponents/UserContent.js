import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { UseContextdata } from '../Context/Contaxtapi';
import Usermarkattendance from './Usermarkattendance';
import UserRecord from './UserRecord'
import axios from 'axios'


import ProfilePage from './ProfilePage';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';


const UserContent = () => {
    const { selectedItem, getUserData, data } = UseContextdata();
    const { handleSidebarItemClick, handleStudentLogout } = UseContextdata();
 

    const activeComponentTitle = () => {
        if (selectedItem === 'dashboard') {
            return 'Dashboard';
        } else if (selectedItem === 'Attendance Record') {
            return 'Attendance Record';
        } else if (selectedItem === 'Profile') {
            return 'Profile';
        } else if (selectedItem === 'leaveApproval') {
            return 'Leave Approval';
        } else {
            return ''; // You can handle other cases here
        }
    };

    useEffect(() => {
        // Retrieve user data from localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));
        getUserData(userData)


    }, []);

    return (
        <div className='adminarea '>
            <div className='adminbox   w-100  '>
                <div className='adminheader   m-auto ' style={{ backgroundColor: '#fff',display:'flex', alignItems:'center'  }}>
                    <div className='active-button ' style={{ marginLeft: '10px' }}>
                        <h5 className='text-secondary'>{activeComponentTitle()}</h5>
                    </div>
                    <Menu menuButton={<MenuButton className='ui pink button'>{data.length === 1 ? data[0].email : ''} <AccountCircleIcon /></MenuButton>} transition className='admin_name' style={{ cursor: 'pointer' }}>

                        <MenuItem onClick={()=>{handleSidebarItemClick('Profile')}} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <AccountCircleIcon /> Profile</MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>

                    </Menu>
                </div>

                {selectedItem === 'dashboard' && <div><Usermarkattendance /></div>}
                {selectedItem === 'Attendance Record' && <div className='mt-5'><UserRecord /></div>}
                {selectedItem === 'Profile' && <div className='mt-5'><ProfilePage /></div>}

            </div>
        </div>
    )
}

export default UserContent
