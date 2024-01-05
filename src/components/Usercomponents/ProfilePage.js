import { Divider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import React, { useState } from 'react';
import { UseContextdata } from '../Context/Contaxtapi';
import axios from 'axios';
import Popups from '../Admincomponents/Popups';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { userDetail, data, getUserData, setPopUps } = UseContextdata();
  const [Error, seterror] = useState({ name: false, email: false, password: false })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    seterror({ ...Error, [name]: false });
    console.log(formData)
  };

  console.log(data)
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateClick = async(e) => {
    e.preventDefault()
    const id = data[0]._id
    console.log('Update button clicked!', id);

    const formdata = formData
    try{
      const res = await axios.patch(`http://localhost:3000/student/update/${id}`,formdata)
      const userData = JSON.parse(localStorage.getItem('userData'));
      getUserData(userData)
    setPopUps({ isOpen: true, text: 'Successfully Updated' });
      console.log(res)
      setIsEditing(false)
    }catch(error){
      console.log(error)
    }
    
    // setIsEditing(false)


  };

  const handleAvatarHover = (hovered) => {
    setIsHovered(hovered);
  };

  return (
    <div style={{ width: '60%', margin: 'auto', paddingTop: '40px' }}>
      <div style={{ backgroundColor: isHovered ? 'black' : '#f0f0f0', borderRadius: '10px', position: 'relative' }} className='border shadow bg-white d-flex p-4'>
        {isEditing && (
          <div style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={handleEditClick}>
            <span style={{ color: 'blue' }}>Cancel</span>
          </div>
        )}
        {!isEditing && (
          <div style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={handleEditClick}>
            <span style={{ color: 'green' }}>Edit</span>
          </div>
        )}

        <div style={{ marginRight: '20px', position: 'relative' }}>
          <Avatar
            alt="User Avatar"
            src="/placeholder-avatar-face.jpg" // Replace with the actual path or URL to your beautiful avatar face image
            sx={{ width: 120, height: 120, cursor: 'pointer' }}
            onMouseEnter={() => handleAvatarHover(true)}
            onMouseLeave={() => handleAvatarHover(false)}
          />
          {isHovered && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '5px',
                padding: '4px',
                cursor: 'pointer',
              }}
            >
              Upload Image
            </div>
          )}
        </div>
        <div className='ui divider'></div>
        <form>
          <div>
            <h1 style={{ marginBottom: '8px', fontSize: '24px', color: '#333' }}>
              {!isEditing ? (
                <h4>{data.length === 1 ? data[0].name : ''}</h4>
              ) : (
                <input
                  type="text"
                  placeholder={data.length === 1 ? data[0].name : ''}
                  name='name'
                  error={Error.name}
                  value={formData.name}
                  onChange={handlechange}
                  style={{
                    width: '100%',
                    fontSize: '24px',
                    padding: '8px',
                    borderRadius: '5px',
                    border: '1px solid #ccc'
                  }} />
              )}
            </h1>
            <div style={{ marginBottom: '16px' }}>
              <h6 style={{ color: '#555', marginBottom: '4px' }}>Email:</h6>
              {!isEditing ? (
                <p style={{ margin: '0', fontSize: '16px' }}>{data.length === 1 ? data[0].email : ''}</p>
              ) : (
                <input
                  type="text"
                  // defaultValue={data.length === 1 ? data[0].email : ''}
                  placeholder={data.length === 1 ? data[0].email : ''}
                  name='email'
                  error={Error.email}
                  value={formData.email}
                  onChange={handlechange}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '5px',
                    border: '1px solid #ccc'
                  }}
                  />
              )}
            </div>
            <div style={{ marginBottom: '16px' }}>
              <h6 style={{ color: '#555', marginBottom: '4px' }}>Password:</h6>
              {!isEditing ? (
                <p style={{ margin: '0', fontSize: '16px' }}>********</p>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input 
                  type="password"
                   defaultValue="********" 
                   name='password'
                   error={Error.password}
                   value={formData.password}
                   onChange={handlechange}
                   style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
              )}
              {isEditing && (
                <button onClick={handleUpdateClick} type='Submit' style={{ padding: '8px 16px', borderRadius: '5px', backgroundColor: '#4caf50', color: 'white', border: 'none', cursor: 'pointer', marginTop: '10px' }}>
                  Update
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
      <Popups/>
    </div>
  );
};

export default ProfilePage;
