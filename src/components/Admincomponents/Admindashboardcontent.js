import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { UseContextdata } from '../Context/Contaxtapi';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Admindashboardcontent = () => {
    const {  allStudents,allCount, getNumOfLAP } = UseContextdata();

    console.log(allCount)

    useEffect(() => {
        const date = new Date()
        const currentDate = date.toISOString()
        getNumOfLAP(currentDate)
    }, [])

    return (
        <div>
            <Box sx={{ flexGrow: 1 ,width:'95%' , margin:'30px auto'}}>
                <Grid container spacing={2}>
                    <Grid xs={6} md={3} >
                        <Item sx={{padding:'60px 0px', boxShadow: `0px 2px 10px 2px rgba(0,0,0,0.1)`, backgroundColor:'#fff', borderRadius:'15px'}}>
                            <h6 style={{backgroundColor:'#fff'}}>Total Students</h6>
                            <h2 style={{backgroundColor:'#fff'}}>{allStudents.length}</h2>
                        </Item>
                    </Grid>
                    <Grid xs={6} md={3}>
                        <Item sx={{padding:'60px 0px', boxShadow: `0px 2px 10px 2px rgba(0,0,0,0.1)`, backgroundColor:'#fff', borderRadius:'15px'}}>
                        <h6 style={{backgroundColor:'#fff'}}>Today Present</h6>
                            <h2 style={{backgroundColor:'#fff'}}>{allCount[2]}</h2>
                        </Item>
                    </Grid>
                    <Grid xs={6} md={3}>
                        <Item sx={{padding:'60px 0px', boxShadow: `0px 2px 10px 2px rgba(0,0,0,0.1)`, backgroundColor:'#fff', borderRadius:'15px'}}>
                        <h6 style={{backgroundColor:'#fff'}}>Today Absents</h6>
                            <h2 style={{backgroundColor:'#fff'}}>{allCount[1]}</h2>
                        </Item>
                    </Grid>
                    <Grid xs={6} md={3}>
                        <Item sx={{padding:'60px 0px', boxShadow: `0px 2px 10px 2px rgba(0,0,0,0.1)`, backgroundColor:'#fff', borderRadius:'15px'}}>
                        <h6 style={{backgroundColor:'#fff'}}>Today Leaves</h6>
                            <h2 style={{backgroundColor:'#fff'}}>{allCount[0]}</h2>
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
        </div>
    )
}

export default Admindashboardcontent