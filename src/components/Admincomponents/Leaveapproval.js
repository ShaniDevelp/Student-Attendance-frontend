import React, { useEffect, useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from 'react-bootstrap';
import { UseContextdata } from '../Context/Contaxtapi';
import axios from 'axios';
import { fabClasses } from '@mui/material';
import Popups from './Popups';

const Leaveapproval = () => {

  const { getallleavedata, leaveData, markAttandance, setPopUps, popUps } = UseContextdata();

  let isLoading = false

  const acceptLeave = async (id) => {
    console.log(`Accepting leave with ID: ${id}`);
    const popup_text = 'accept'
    isLoading = true
    try {
      const res = await axios.put(`http://localhost:3000/admin/leaveapprove/${id}`)
      if (res) {
        getallleavedata()
        isLoading = false
        setPopUps({ isOpen: true, text: 'Accepted' });

      }
      console.log(res)

    } catch (error) {
      console.log(error)
    }


  };

  const rejectLeave = async (id, studentId) => {

    console.log(`Rejecting leave with ID: ${id}`);
    console.log(`student Id: ${studentId}`);
    isLoading = true
    getallleavedata()
    try {
      isLoading = true
      const res = await axios.put(`http://localhost:3000/admin/leaverejected/${id}`)
      if (res) {
        getallleavedata()
        isLoading = false
        attandanceMarked(studentId)
        setPopUps({ isOpen: true, text: 'Rejected' });

      }
      console.log(res)

    } catch (error) {

    };
  }

  const attandanceMarked = (user_Id) => {
    const Value = 'Absent'
    const d = new Date()
    const date = d.toISOString()
    const userId = user_Id
    const attandance = {
      student: userId,
      date: date,
      status: Value
    }
    console.log(attandance)
    markAttandance(attandance)

  }

  useEffect(() => {
    getallleavedata()
  }, [])


  return (
    <div style={{ width: '93.5%' }} className='m-auto'>
      {/* <div className='mt-3'>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DemoContainer components={['DatePicker', 'DatePicker']}   >
            <DatePicker label={'Select date '} sx={{ backgroundColor: '#fff' }} />
          </DemoContainer>
        </LocalizationProvider>
      </div> */}
      <div className='row'>
        {leaveData.length > 0 ? leaveData.map((item, outerIndex) => {
          console.log(item)
          return (

            <div className='row' key={outerIndex}>
              {item.map((leave, innerIndex) => {
                return (
                  <div key={innerIndex} class="col-lg-2 shadow card mt-4 rounded m-3">
                    <div class="card-body text-center">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                        class="rounded-circle img-fluid" style={{ width: '200px' }} />
                      <h5 class="my-3">{leave.studentName}</h5>
                      <div class="d-flex justify-content-center mb-2">
                        {isLoading ? <p>loaing...</p> : <>
                          {leave.Rejected ? <button className='btn btn-danger'>Rejected</button> : <>
                            {leave.isApproved ?
                              <button class="btn btn-success">Accepted</button> :
                              <>
                                <button type="button" class="btn btn-success" onClick={() => acceptLeave(leave._id, 'Leave Accepted')}>Accept</button>
                                <button type="button" class="btn btn-danger ms-1" onClick={() => rejectLeave(leave._id, leave.student, 'Leave Rejected')} >Reject</button>
                              </>

                            }
                          </>
                          }
                        </>
                        }


                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        }) : <h2>Today anyone not to request for Leave</h2>}
        <Popups />


      </div>
    </div>
  )
}

export default Leaveapproval