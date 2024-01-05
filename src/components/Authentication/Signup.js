// import { TextField } from '@mui/material'
import { TextField } from '@mui/material'
import React, { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import signuppic from '../../Images/signuppic3.png'
import axios from 'axios'
import { UseContextdata } from '../Context/Contaxtapi'




const SignUp = () => {
  const { data, setdata, loginType } = UseContextdata()
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate()
  const [Errorname, setErrorName] = useState(false)
  const [Erroremail, setErrorEmail] = useState(false)
  const [Errorpassword, setErrorPassword] = useState(false)

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleAdminSubmit = (e) => {
    e.preventDefault()
    setErrorName(false)
    setErrorEmail(false)
    setErrorPassword(false)
    if (formData.email === '') {
      setErrorEmail(true)

    }
    if (formData.name === '') {
      setErrorName(true)

    }
    if (formData.password === '') {

      setErrorPassword(true)
    }
    else {

      // console.log(formData);
      // signupform(formData)
      handleAdminformdata(formData)
      navigate('/login')
    }
  }

  const handleAdminformdata=async(formData)=>{
    try{
      const res = await axios.post('http://localhost:3000/admin/signup',formData)
      // console.log(res.data)
      setdata([res.data])
      console.log(data)
    }catch(error){
      console.log(error)
    }
  }



  const handleUserSubmit = (e) => {
    e.preventDefault()
    setErrorName(false)
    setErrorEmail(false)
    setErrorPassword(false)
    if (formData.email === '') {
      setErrorEmail(true)

    }
    if (formData.name === '') {
      setErrorName(true)

    }
    if (formData.password === '') {

      setErrorPassword(true)
    }
    else {

      console.log(formData);
      // signupform(formData)
      handleUserformdata(formData)
      navigate('/login')
    }
  }

  const handleUserformdata = async (formData) => {
    try {
      const res = await axios.post('http://localhost:3000/student/signup', formData)
      // console.log(res.data);
      setdata([res.data]);
      console.log(data)
      // navigate('/userpanel')

    } catch (error) {
      console.log('err', error)
    }

  }

  return (

    <div className='bgimge' style={{ height: '100vh' }}>

      <div class="container h-100 pb-4">
        <div class="signup row d-flex justify-content-center align-items-center h-100">
          <div class="col-sm-8 col-md-12 col-lg-10 col-xl-8">
            <div class="loginsignupbox card text-black m-auto" style={{ borderRadius: '25px' }}>
              <div class="card-body p-md-5">
                <div class="row justify-content-center">
                  <div class="col-md-7 col-lg-6 col-xl-5 order-2 order-lg-2">

                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                    <form class="mx-1 mx-md-4" >


                      <div class=" flex-row align-items-center mb-4 " >
                        <div className='d-flex flex-row align-items-center mb-4  '>
                          <i class="signup-icon fas fa-user fa-lg me-3 fa-fw"></i>

                          <div className=' w-100 '>
                            <TextField type="text"
                              id="form3Example1c"
                              name="name"
                              label='Name'
                              variant="standard"
                              fullWidth
                              value={formData.name}
                              onChange={handleChange}
                              error={Errorname}
                            />
                          </div>


                        </div>
                        {/* <span className='text-danger'>  {Errorname ? <p>Field is required</p>:''}</span> */}
                      </div>

                      <div class="flex-row align-items-center mb-4">
                        <div className='d-flex flex-row align-items-center mb-4'>
                          <i class="signup-icon fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className=' w-100 '>
                            <TextField type="text"
                              id="form3Example1c"
                              name="email"
                              label='Email'
                              variant="standard"
                              fullWidth
                              value={formData.email}
                              onChange={handleChange}
                              error={Erroremail}
                            />
                          </div>
                        </div>
                        {/* <span className='text-danger'>{Erroremail ? <p>Field is required</p>:''}</span> */}

                      </div>

                      <div class="  align-items-center mb-4">
                        <div className='d-flex flex-row align-items-center mb-4'>
                          <i class="signup-icon fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className=' w-100 '>
                            <TextField type="text"
                              id="form3Example1c"
                              name="password"
                              variant="standard"
                              label='Password'
                              fullWidth
                              value={formData.password}
                              onChange={handleChange}
                              error={Errorpassword}
                            />
                          </div>
                        </div>
                        <span className='text-danger'>
                          {/* {Errorpassword ? <p>Field is required</p>:''} */}
                        </span>

                      </div>

                      {/* <div class="d-flex flex-row align-items-center mb-4">
                    <i class="signup-icon fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0 border rounded">
                      <input type="password" id="form3Example4cd" class="form-control border rounded" />
                      <label class="form-label" for="form3Example4cd">Repeat your password</label>
                    </div>
                  </div> */}

                      {loginType === false ?
                        <div class="d-flex justify-content-center mx-4 mt-5 ">
                          <button type="submit" onClick={handleUserSubmit} class="btn btn-primary btn-lg">User-Register</button>
                        </div> :
                        <div class="d-flex justify-content-center mx-4 mt-5 ">
                          <button type="submit" onClick={handleAdminSubmit} class="btn btn-primary btn-lg">Teacher-Register</button>
                        </div>
                      }
                      <p class="small fw-bold text-center  w-100 mb-0">Already have an account?
                        <Link to={'/login'} >
                          <a class="link-danger">Login</a>
                        </Link>
                      </p>

                    </form>

                  </div>
                  <div class="col-8 col-sm-7 col-md-5 col-lg-6 col-xl-7 d-flex align-items-center text-center m-auto order-md-1 order-lg-2">

                    <img src={signuppic}
                      class="img-fluid" alt="Sample image" />

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

export default SignUp