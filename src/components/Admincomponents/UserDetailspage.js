import React, { useEffect, useState } from 'react'
import { UseContextdata } from '../Context/Contaxtapi'
// import { Button } from 'react-bootstrap'
import Modal from 'react-modal';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import zIndex from '@mui/material/styles/zIndex';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CreateUserreport from './CreateUserreport'
import Tooltip from '@mui/material/Tooltip';
import { MDBTooltip } from 'mdb-react-ui-kit';
import axios from 'axios';
// import Attendance from '../../../../Student-Attendance-backend/models/attendanceSchema';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const UserDetailspage = () => {

    const d = new Date()
    const { getUserRecord, setUserAttendance, attandanceData, userAttendance, userDetail, getUserData, getUserDetail, userRecord } = UseContextdata();
    const { isLoading, visible, todayLeave, handleremovepopup, handlereportpopup, displayBtn, setDisplayBtn } = UseContextdata();
    const [addAttendance, setAddAttendace] = useState(false)

    

    useEffect(() => {
        getUserDetail(userDetail)
        console.log(isLoading)
    }, [])

    // console.log(userDetail)

    const handleemovepopup = () => {
        handleremovepopup()
    }

    const markPresent = async (id, e) => {
        // console.log(id)
        console.log(e, id)
        const date = d.toISOString()
        const values = {
            status: e,
            date: date,
            student: id
        }
        console.log(values)
        const res = await axios.post(`http://localhost:3000/admin/attendance`, values)
        console.log(res)
        setUserAttendance(res.data)
        setDisplayBtn(true);


    }

    const markAbsent = async (id,e) => {
        console.log(id)
        console.log(e, id)
        const date = d.toISOString()
        const values = {
            status: e,
            date: date,
            student: id
        }
        console.log(values)
        const res = await axios.post(`http://localhost:3000/admin/attendance`, values)
        console.log(res)
        setUserAttendance(res.data)
        setDisplayBtn(true);
    }

    const userPresent = async (id) => {
        console.log(id)
        try {
            const status = 'Present'
            const res = await axios.put(`http://localhost:3000/admin/attendance/${id}/update`, { status })
            console.log(res.data)
            setUserAttendance(res.data)
            setDisplayBtn(true);



        } catch (error) {
            console.log(error)
        }

    }

    const userAbsent = async (id) => {
        console.log(id)

        try {
            const status = 'Absent'
            const res = await axios.put(`http://localhost:3000/admin/attendance/${id}/update`, { status })
            console.log(res.data)
            setUserAttendance(res.data)
            setDisplayBtn(true);


        } catch (error) {
            console.log(error)
        }


    }

    const handleDeleteUserAttendance = (id) => {
        setDisplayBtn(false)

    }

    console.log(userAttendance.status)
    return (
        <>
            <Modal

                isOpen={visible}
                onRequestClose={() => handleemovepopup()}
                appElement={document.body}
                style={{
                    content: {
                        width: '50%',
                        margin: 'auto',
                        height: '550px',
                        backgroundColor: '#F4F5F6'
                    }
                }}
            >
                <div className='card' style={{ border: 'none', backgroundColor: '#F4F5F6' }}>
                    <div className='card-body '>
                        <div className='text-center'>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                                class="rounded-circle img-fluid border p-1" style={{ width: '150px', backgroundColor: '#fff' }} />
                            <h5 class="my-3">{userDetail.length === 1 ? userDetail[0].name : '...'}</h5>
                        </div>
                        <div>
                            <div className='  '>
                                <div className='w-100 d-flex justify-content-between'>
                                    <div className='d-flex'>
                                        <h4>Attendance   </h4>
                                        <h6 className='text-success align-self-center' style={{ marginLeft: '5px' }}> {isLoading === 1 ? <p>loading...</p>: <>{userAttendance.length === 0 && todayLeave.length === 0 ? <p style={{ color: 'red' }} >Not Marked</p> : ' Marked'}</>}</h6>
                                    </div>
                                    <div>
                                        <Button onClick={handlereportpopup} variant='secondary' startIcon={<AssessmentIcon />}>Create Report</Button>
                                    </div>
                                </div>
                                {isLoading === 1 ? <p>loading...</p> : <>
                                {userAttendance.length === 0 && todayLeave.length === 0 ?
                                    <div className=' mt-3 mb-3 m-auto  d-flex justify-content-between ' style={{ width: '80%' }}>

                                        <div className=' d-flex justify-content-between ' style={{ marginTop: '10px' }}>
                                            <button class="ui inverted green button" value="Present" onClick={() => markPresent(userDetail[0]._id, 'Present')}>Present</button>
                                            <button class="ui inverted red button" value="Absent" onClick={() => markAbsent(userDetail[0]._id, 'Absent')}>Absent</button>
                                        </div>
                                        <div className='  d-flex justify-content-center ' style={{ marginTop: '10px' }} >
                                            {/* <button className='ui blue  button' ><EditIcon /></button> */}
                                            <h4>Mark {userDetail.length === 1 ? userDetail[0].name : '...'}'s attendance</h4>
                                            {/* <button className='ui red  button' style={{ marginLeft: '5px' }} ><DeleteIcon /></button> */}
                                        </div>

                                    </div> 
                                    // <h3>loading...</h3>
                                    : <>
                                        {
                                            displayBtn === false ?
                                                <div className=' mt-3 mb-3 m-auto  d-flex justify-content-between ' style={{ width: '80%' }}>

                                                    <div className=' d-flex justify-content-between ' style={{ marginTop: '10px' }}>
                                                        <button class="ui inverted green button" onClick={() => userPresent(userAttendance._id)}>Present</button>
                                                        <button class="ui inverted red button" onClick={() => userAbsent(userAttendance._id)}>Absent</button>
                                                    </div>
                                                    <div className='  d-flex justify-content-center   ' style={{ marginTop: '10px' }} >
                                                        {/* <button className='ui blue  button' ><EditIcon /></button> */}
                                                        {/* <button className='ui red  button' style={{ marginLeft: '5px' }} ><DeleteIcon /></button> */}
                                                        
                                                    </div>

                                                </div> :
                                                <>{
                                                    userAttendance.length === 0 ?
                                                        <div className=' mt-3 mb-3 m-auto  d-flex justify-content-between ' style={{ width: '80%' }}>

                                                            <div className=' d-flex justify-content-between ' style={{ marginTop: '10px' }}>
                                                                <button class=" btn btn-primary ">{userDetail.length === 1 ? userDetail[0].name : '...'} send a Leave Request </button>
    
                                                            </div>
                                                            

                                                        </div> :
                                                        <div className=' mt-3  m-auto  d-flex justify-content-between p-2 rounded ' style=
                                                            {{
                                                                width: '90%',
                                                                backgroundColor: '#fff',
                                                                boxShadow: `0px 2px 10px 2px rgba(0,0,0,0.1)`
                                                            }}>

                                                            <div className=' d-flex justify-content-between align-items-center ' style={{}}>
                                                                <h4>Status   </h4>
                                                                {userAttendance.status === 'Present' ?
                                                                    <h4 className='text-success align-self-center' style={{ marginLeft: '5px', marginBottom: '6px' }}>({userAttendance.status})</h4> :
                                                                    <h4 className='text-danger align-self-center' style={{ marginLeft: '5px', marginBottom: '6px' }}>({userAttendance.status})</h4>

                                                                }
                                                            </div>
                                                            <div className='  d-flex justify-content-center   ' style={{}} >
                                                                {/* <Tooltip title="CLick Edit to Update Student Attendance"placement="top-start"> */}
                                                                <MDBTooltip tag='a' wrapperProps={{ href: '#' }} title="CLick Edit to Update Student Attendance" placement='left'>
                                                                    <button className='ui blue  button' onClick={handleDeleteUserAttendance} ><EditIcon /></button>
                                                                    {/* </Tooltip> */}
                                                                </MDBTooltip>
                                                            </div>

                                                        </div>
                                                }</>
                                        }</>
                                }
                                </>}
                                

                            </div>

                            <div className=' mt-4 '>
                                <div className=' d-flex '>
                                    <h4>Past Attendance Record  </h4>

                                </div>
                                <div className='d-flex mt-3 mb-3 justify-content-between'>

                                    {userRecord.length === 0 ? <h3>Loading...</h3> :
                                        <Box sx={{ flexGrow: 1, width: '95%', margin: ' auto' }}>
                                            <Grid container spacing={2} >
                                                {/* <Grid xs={12} sm={6} md={3} sx={{ margin: 'auto' }}>
                            <Item sx={{ boxShadow: `0px 2px 10px 2px rgba(0,0,0,0.1)`, backgroundColor: '#fff', borderRadius: '15px' }}>
                                <h6 style={{ backgroundColor: '#fff' }}>Total Students</h6>
                                <h2 style={{ backgroundColor: '#fff' }}>20</h2>
                            </Item>
                        </Grid> */}
                                                <Grid xs={12} sm={6} md={3} sx={{ margin: 'auto' }}>
                                                    <Item sx={{ boxShadow: `0px 2px 10px 2px rgba(0,0,0,0.1)`, backgroundColor: '#fff', borderRadius: '15px' }}>
                                                        <h6 style={{ backgroundColor: '#fff' }}> Presents</h6>
                                                        <h2 style={{ backgroundColor: '#fff' }}>{userRecord[0][2]}</h2>
                                                    </Item>
                                                </Grid>
                                                <Grid xs={12} sm={6} md={3} sx={{ margin: 'auto' }}>
                                                    <Item sx={{ boxShadow: `0px 2px 10px 2px rgba(0,0,0,0.1)`, backgroundColor: '#fff', borderRadius: '15px' }}>
                                                        <h6 style={{ backgroundColor: '#fff' }}>Absents</h6>
                                                        <h2 style={{ backgroundColor: '#fff' }}>{userRecord[0][1]}</h2>
                                                    </Item>
                                                </Grid>
                                                <Grid xs={12} sm={6} md={3} sx={{ margin: 'auto' }}>
                                                    <Item sx={{ boxShadow: `0px 2px 10px 2px rgba(0,0,0,0.1)`, backgroundColor: '#fff', borderRadius: '15px' }}>
                                                        <h6 style={{ backgroundColor: '#fff' }}>Leaves</h6>
                                                        <h2 style={{ backgroundColor: '#fff' }}>{userRecord[0][0]}</h2>
                                                    </Item>
                                                </Grid>
                                                {/* <Grid xs={6} md={4}>
        <Item sx={{padding:'60px 0px', boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.37)`}}>
        <h2>Today Leaves</h2>
            <h2>5</h2>
        </Item>
    </Grid> */}
                                            </Grid>
                                        </Box>
                                    }


                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <CreateUserreport />

            </Modal>
        </>

    )
}

export default UserDetailspage