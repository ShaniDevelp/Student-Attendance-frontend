import React from 'react'
import { useCallback } from "react";
import Particles from "react-particles";
import { useNavigate } from 'react-router-dom';
// import  './Style.css'
import { loadSlim } from "tsparticles-slim"; 
import { UseContextdata } from './Context/Contaxtapi';

const Mainpage = () => {
    const navigate= useNavigate()
    const {setLoginType, loginType}=UseContextdata()

    const asStudent=()=>{
        setLoginType(false)
        navigate('/login')
        
    }

    const asTeacher=()=>{
        setLoginType(true)
        navigate('/login')
        

    }

    


    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadFull(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);
  return (
    <div>
         <Particles
            // id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "#16a085",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 1,
                        },
                        repulse: {
                            distance: 100,
                            duration: 0.9,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#fff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 50,
                        enable: true,
                        opacity: 0,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 2,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.3,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 20, max: 5 },
                    },
                },
                detectRetina: true,
            }}
        />

<div className=' text-center  ' style={{height:'100vh',width:'100%' , position:'absolute' , display:'flex', flexDirection:'column', justifyContent:'center' }}>
        <div>
        {/* <h1 className='text-white bold' style={{position:'absolute', top:'20%', left:'34%'}}>Attendance Managemant System</h1> */}
        <div style={{position:'absolute', top:'20%', left:'34%'}} className=' mainPageheading  p-2' >
        Attendance Managemant System
        </div>
        <div className='mainPageDiv d-flex m-auto'>
        <div className='mainPageBox  p-5' onClick={asStudent}>
            Login as Student
        </div>
        <div className='mainPageBox   p-5' onClick={asTeacher}>

            Login as Teacher
        </div>
        </div>
        </div>

    </div>
    </div>
    
  )
}

export default Mainpage