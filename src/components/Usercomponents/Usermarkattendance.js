import React, { useEffect, useState } from 'react'
import Leaverequest from './Leaverequest'
import { UseContextdata } from '../Context/Contaxtapi';
// import { ToastContainer, toast } from 'react-toastify'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const Usermarkattendance = () => {
    const d = new Date()
    const {
        handleusedetailpopup, 
        attandance,setattandance, 
        markAttandance,
        getUserData,
        sendleaverequest,
        data,
        userAttendance,
        todayLeave,
        setUserAttendance,
        setTodayLeave
    } = UseContextdata(); 

    const showToastMessage = () => {
        toast.success("Attendance Marked !", {
          position: toast.POSITION.TOP_CENTER,
        });
      };
      
      const showLeaveToastMessage = () => {
        toast.info("Leave Submitted !", {
          position: toast.POSITION.TOP_CENTER,
        });
      };
     
  


    const handleclick = async(e)=>{
        const buttonValue = e.target.value
        const date = d.toISOString()
        console.log(date)
        const userData = JSON.parse(localStorage.getItem('userData'));
        console.log(userData.student._id)
        const userId = userData.student._id
        const attandance = {
            student: userId, 
            date : date, 
            status: buttonValue
          }
        // console.log(attandance)
        markAttandance(attandance)

        try{
       
        }catch(error){
            console.log(error)
        }
       

        showToastMessage()
        // handleusedetailpopup()

    }

    const handleleave=(e)=>{
        // const btnvalue= e.target.value
        const userData = JSON.parse(localStorage.getItem('userData'));
        console.log(userData)
        const userId = userData.student._id
        const userName = userData.student.name
        const startDate = d.toISOString()
        const endDate = new Date()
        endDate.setDate(endDate.getDate() + 1);
        const dateUdated = endDate.toISOString()
        const isApproved=false
        const sendleave = {
            student: userId, 
            studentName: userName, 
            startDate: startDate, 
            endDate: dateUdated, 
            isApproved: isApproved
        }
        showLeaveToastMessage()
        sendleaverequest(sendleave)

        

    }

    const getUserAttendance = async(id)=>{
        const resattendance = await axios.get(`http://localhost:3000/admin/todayAttendance/${id}`)
        console.log(resattendance.data)
        setUserAttendance(resattendance.data)

        const resLeave = await axios.get(`http://localhost:3000/admin/todayLeave/${id}`)
        setTodayLeave(resLeave.data)
    }

    useEffect(()=>{
        const userData = JSON.parse(localStorage.getItem('userData'));
        getUserData(userData)
        console.log(userData.student._id)
        const id = userData.student._id
        getUserAttendance(id)
   
    },[])



    return (
        <div className='text-secondary' style={{ width: '95%', margin: 'auto'}}>
       
            <div className='card col-lg-4  mt-5 shadow p-3'>
                <span>Today, {d.toLocaleDateString()}</span>
                <div className='text-center'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                        class="rounded-circle img-fluid border p-1" style={{ width: '150px', backgroundColor: '#fff' }} />
                    <h5 class="my-3">{data.length===1?data[0].name:''}</h5>
                </div>
                <div>
                    <div>
                        <h3 className='mt-4 mb-4' >Mark your Attendancce </h3>
                       
                        {userAttendance.length===0&&todayLeave.length===0?
                         <div className='mb-4 d-flex justify-content-around ' style={{  marginTop: '10px' }}>
                         <button class="ui  green button" value='Present' onClick={handleclick}   style={{width:'35%'}}>Present</button>
                         <button class="ui  blue button" value='leave' style={{width:'35%'}} onClick={handleleave} >Leave Request</button>
                     </div>:
                     <>{
                        userAttendance.length===0?
                        <button className='ui  blue button w-100'>Leave Request Submited</button>:
                        <button className='ui  green button w-100'>Attendancce Marked </button>
                     }
                     </>
                        }
                    </div>
                </div>
            </div>
            <ToastContainer />
            {/* <Leaverequest/> */}
        </div>
    )
}

export default Usermarkattendance