import { TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import loginpic from '../../Images/loginpic3.png'
import { UseContextdata } from '../Context/Contaxtapi'
import axios from 'axios'


const Login = () => {
    const { loginuser, handleUserform, handleAdminform, formData, Error, handlechange, storeformdata, loginType } = UseContextdata()

    console.log(formData)
    console.log(loginType)

    //   useEffect(()=>{
    //     loginuser()
    //   })

    return (
        <div className='bgimge' style={{ height: '100vh' }}>

            <div class="container h-100  pb-4">
                <div class="signup row d-flex justify-content-center align-items-center h-100">
                    <div class=" col-sm-8 col-md-12 col-lg-10 col-xl-8">
                        <div class="loginsignupbox card text-black  m-auto" style={{ borderRadius: '25px' }}>
                            <div class="card-body p-md-5">
                                <div class="row justify-content-between ">
                                    <div class=" col-md-7 col-lg-6 col-xl-5 order-2 order-lg-2 ">

                                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                                        <form class="mx-1 mx-md-4" >
                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="signup-icon fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div class="w-100">
                                                    <TextField
                                                        label='Email'
                                                        variant="standard"
                                                        fullWidth
                                                        name='email'
                                                        onChange={handlechange}
                                                        value={formData.email}
                                                        error={Error.email}
                                                    />
                                                </div>
                                            </div>

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="signup-icon fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div class="w-100">
                                                    <TextField
                                                        label='Password'
                                                        variant="standard"
                                                        fullWidth
                                                        name='password'
                                                        onChange={handlechange}
                                                        value={formData.password}
                                                        error={Error.password}

                                                    />
                                                </div>
                                            </div>

                                            {loginType === false ?
                                                <div class="text-center text-lg-start mt-5 d-flex justify-content-center ">
                                                    <button type="submit" onClick={handleUserform} class="btn btn-primary btn-lg m-auto "
                                                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Student-Login</button>

                                                </div> :
                                                <div class="text-center text-lg-start mt-5 d-flex justify-content-center ">
                                                    <button type="submit" onClick={handleAdminform} class="btn btn-primary btn-lg m-auto "
                                                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Teacher-Login</button>

                                                </div>
                                            }


                                            <p class="small fw-bold text-center mt-1 w-100 pt-1 mb-0">Don't have an account?
                                                <Link to={'/signup'} >
                                                    <a class="link-danger">Register</a>
                                                </Link>
                                            </p>

                                        </form>

                                    </div>
                                    <div class="col-8 col-sm-7 col-md-5 col-lg-6 col-xl-7 d-flex align-items-center text-center m-auto order-md-1 order-lg-2">

                                        <img src={loginpic} height={250} width={500}
                                            class="img-fluid " alt="Sample image" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login