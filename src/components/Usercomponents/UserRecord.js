import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { UseContextdata } from '../Context/Contaxtapi'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { attendance_data } from '../../../../Student-Attendance-backend/controllers/studentController';




const Studentsdatatable = () => {
    const {
        attandanceData,
        getleavedata,
        getAttendanceData,
        leaveData,
        data,
        storedata,
        userAttendance
    } = UseContextdata();
    console.log(userAttendance.length)


    const [isPopupVisible, setPopupVisible] = useState(true);
    const tableheading = ['Date', 'Status']

    const [selectedMonth, setSelectedMonth] = useState(null);



    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const userId = userData.student._id
        console.log(userId)
        getleavedata(userId)
        getAttendanceData(userId)
    }, [])

    if (attandanceData.length === 1) {
        console.log(attandanceData)
    }
    if (leaveData.length === 1) {
        console.log(leaveData)
    }



    const handleMonthChange = (date) => {
        // Extract and set the selected month
        setSelectedMonth(date?.toLocaleString('en-US', { month: 'long' }));
    };
    return (
        <div style={{ width: '95%', margin: 'auto' }} >

            {/* <div className=' mb-4'>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DemoContainer components={['DatePicker', 'DatePicker']}  >
                        <DatePicker
                            //  label={'Select date'}
                            label={'Select month'}
                            openTo="month"
                            views={['month']}
                            sx={{ backgroundColor: '#fff' }} />
                    </DemoContainer>
                </LocalizationProvider>
            </div> */}

            <div className='w-100 d-flex justify-content-around ' >
                <div style={{width: '40%'}}>
                <h1 className='text-center shadow bg-white' style={{borderRadius: '10px'}}>Attendance Record</h1>
                    <div style={{  borderRadius: '10px', boxShadow: ` 0px 10px 15px -3px rgba(0,0,0,0.1),-1px -2px 6px 0px rgba(0,0,0,0.1)` }} className='  p-3 bg-white'  >

                        <div _>
                            <table className='w-100' _>

                                <div className='d-flex' _>
                                    {/* <thead style={{ width: '5%', display: 'flex', justifyContent: 'center' }} >
            <th _>S-No</th>
        </thead> */}
                                    <thead style={{ width: '97%', backgroundColor: '#fff' }}>

                                        <tr className='row d-flex justify-content-around   '>
                                            {tableheading.map((heading, index) => (
                                                <div className='col ' style={{ display: 'flex', backgroundColor: '#fff', justifyContent: 'center' }}><th _ key={index}>{heading}</th></div>
                                            ))}
                                        </tr>
                                    </thead>
                                </div>
                                <div className='ui divider rounded' style={{ border: '2px solid #C0C0C0' }}></div>
                                <div>
                                    <table className='w-100'>
                                        <div className='d-flex'>

                                            <tbody style={{ width: '97%' }}>
                                                {attandanceData.map((item, outerindex) => {
                                                    return (
                                                        <tr key={outerindex} className='row d-flex justify-content-around' >
                                                            {/* {console.log(item)}; */}
                                                            {item.map((itemdata, innerindex) => {

                                                                return (

                                                                    <div>
                                                                        <div key={innerindex} className='row d-flex justify-content-around' >
                                                                            <div className='col' style={{ display: 'flex', justifyContent: 'center' }}>

                                                                                <td>{itemdata.date.slice(0, 10)}</td>
                                                                            </div>

                                                                            <div className='col' style={{ display: 'flex', justifyContent: 'center' }}>

                                                                                <td>
                                                                                    {itemdata.status === "Present" ? <button className='ui green button '>Present</button> : <button className='ui red button '>Absent</button>}
                                                                                </td>
                                                                            </div>
                                                                        </div>
                                                                        <div className='ui divider'></div>
                                                                    </div>
                                                                )


                                                            })}
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </div>







                                    </table>
                                </div>
                            </table>

                        </div>



                    </div>
                </div>



                <div style={{width:'40%'}}>
                <h1 className='text-center shadow bg-white' style={{borderRadius: '10px'}}>Leave Record</h1>

                <div style={{ borderRadius: '10px', boxShadow: ` 0px 10px 15px -3px rgba(0,0,0,0.1),-1px -2px 6px 0px rgba(0,0,0,0.1)` }} className='  p-3 bg-white'  >

                    <div _>
                        <table className='w-100' _>

                            <div className='d-flex' _>
                                {/* <thead style={{ width: '5%', display: 'flex', justifyContent: 'center' }} >
                                <th _>S-No</th>
                            </thead> */}
                                <thead style={{ width: '97%', backgroundColor: '#fff' }}>

                                    <tr className='row d-flex justify-content-around   '>
                                        {tableheading.map((heading, index) => (
                                            <div className='col ' style={{ display: 'flex', backgroundColor: '#fff', justifyContent: 'center' }}><th _ key={index}>{heading}</th></div>
                                        ))}
                                    </tr>
                                </thead>
                            </div>
                            <div className='ui divider rounded' style={{ border: '2px solid #C0C0C0' }}></div>
                            <div>
                                <table className='w-100'>
                                    <div className='d-flex'>
                                        {/* <tbody style={{ width: '5%', display: 'flex', justifyContent: 'center' }}>
                                        <td >1</td>
                                    </tbody> */}
                                        <tbody style={{ width: '97%' }}>
                                            {leaveData.map((item, outerindex) => {
                                                return (
                                                    <tr key={outerindex} className='row d-flex justify-content-around' >

                                                        {item.map((itemdata, innerindex) => {

                                                            return (

                                                                <div>
                                                                    <div key={innerindex} className='row d-flex justify-content-around' >
                                                                        <div className='col' style={{ display: 'flex', justifyContent: 'center' }}>

                                                                            <td>{itemdata.startDate.slice(0, 10)}</td>
                                                                        </div>

                                                                        <div className='col' style={{ display: 'flex', justifyContent: 'center' }}>

                                                                            <td>
                                                                                {itemdata.isApproved === true ? <button className='ui blue button'>Leave</button> : <button className='ui red button'>pending</button>}
                                                                            </td>
                                                                        </div>
                                                                    </div>
                                                                    <div className='ui divider'></div>
                                                                </div>
                                                            )


                                                        })}
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </div>







                                </table>
                            </div>
                        </table>

                    </div>



                </div>
                </div>
            </div>
        </div>

    )
}

export default Studentsdatatable