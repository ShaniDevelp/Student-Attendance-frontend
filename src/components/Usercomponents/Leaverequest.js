import React from 'react'
import { UseContextdata } from '../Context/Contaxtapi'
// import { Button } from 'react-bootstrap'
import Model from 'react-modal';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import zIndex from '@mui/material/styles/zIndex';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Leaverequest = () => {

    const { visible, handleremovepopup,handlereportpopup } = UseContextdata()

    const handleemovepopup = () => {
        handleremovepopup()
    }
    return (
        <Model

            isOpen={visible}
            onRequestClose={() => handleemovepopup()}
            style={{
                content: {
                    width: '30%',
                    margin: 'auto',
                    height: '100px',
                    backgroundColor:'#fff'
                }
            }}
        >
            <div className='w-100  text-center d-flex' style={{margin:'auto', }}>
                <CheckCircleIcon color='success' sx={{ fontSize: 50 }}/>
                <h3 className='w-100 ' style={{ margin:'auto', }}>Your leave Submited Successfully</h3>
            </div>
        </Model>
    )
}

export default Leaverequest