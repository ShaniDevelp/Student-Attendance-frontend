import React from 'react'
import { UseContextdata } from '../Context/Contaxtapi'
// import { Button } from 'react-bootstrap'
import Model from 'react-modal'
import { Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import zIndex from '@mui/material/styles/zIndex';
import AssessmentIcon from '@mui/icons-material/Assessment';

// 
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// 

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const UserDetailspage = () => {

    const { handleremovereportpopup, reportpopup } = UseContextdata()

    const handleremoveReportpopup = () => {
        handleremovereportpopup()
    }
    return (
        <Model

            isOpen={reportpopup}
            onRequestClose={() => handleremoveReportpopup()}
            style={{
                content: {
                    width: '40%',
                    margin: 'auto',
                    height: '400px',
                    backgroundColor:'#F4F5F6'
                }
            }}
        >
            <div className='card' style={{border:'none',backgroundColor:'#F4F5F6'}}>

                <div className='card-body'>
                    <div className='text-center'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                            class="rounded-circle img-fluid border p-1" style={{ width: '150px',backgroundColor:'#fff' }} />
                        <h5 class="my-3">Muhammad Farhan</h5>
                    </div>
                    <div className='ui divider'></div>
                    <div className=' mt-3 '>
                        <h2>Select Date </h2>
                        <div className=' text-center '>
                        <LocalizationProvider  dateAdapter={AdapterDayjs} >
                            <DemoContainer components={['DatePicker', 'DatePicker']}   >
                                <DatePicker label={'From'} 
                                sx={{backgroundColor:'#fff'}}
                                />
                                <DatePicker
                                    label={'TO'}
                                    sx={{margin:'auto',backgroundColor:'#fff'}}
                                />
                                <Button style={{float:'right'}} variant='contained'>Generate Report</Button>
                            </DemoContainer>
                        </LocalizationProvider>
                        </div>
                 
                    </div>
                </div>
            </div>
        </Model>
    )
}

export default UserDetailspage