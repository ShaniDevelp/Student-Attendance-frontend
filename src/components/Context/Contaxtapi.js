import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const mycontext = createContext();

function CreateContextApp({ children }) {
    const navigate = useNavigate()
    const [popUps, setPopUps] = useState({ isOpen: false, text: '' });
    const [selectedItem, setSelectedItem] = useState('dashboard'); // Default selected item
    const [visible, setvisible] = useState(false)
    const [reportpopup, setreportpopup] = useState(false)
    const [leaverequest, setleaverequest] = useState(false)
    const [displayBtn, setDisplayBtn] = useState(true)
    const [todayLeave,setTodayLeave] =useState([])
    // for login
    const [loginType, setLoginType] = useState()
    const [formData, setFormData] = useState({ email: '', password: '',name:'' });
    const [Error, seterror] = useState({ email: false, password: false })
    // store user data
    const [allCount, setAllCount] = useState([])
    const [allStudents, setAllStudents] = useState([])
    const [leaveUserRequest, setleaveUserRequest] = useState([])
    const [data, setdata] = useState([])
    const [userDetail, setUserDetail] = useState([])
    const [userAttendance, setUserAttendance] = useState([])
    const [userRecord, setUserRecord] = useState([])
    const [attandanceData, setattandanceData] = useState([])
    const [leaveData, setleaveData] = useState([])
    const [attandance, setattandance] = useState({ student: '', date: '', status: '' })
    const [sendleave, setsendleave] = useState({ student: '', studentName: '', startDate: '', endDate: '', isApproved: false })


    // store user data- close


    const getalladmin = async () => {
        try {
            const res = await axios.get('http://localhost:3000/admin/allusers')
            console.log(res.data)
            setAllStudents(res.data)

        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        getalladmin()
        const date = new Date()
        const currentDate = date.toISOString()
        getNumOfLAP(currentDate)
        getallleavedata()
    }, [])

    const getNumOfLAP = async (currentDate) => {
        const res = await axios.get('http://localhost:3000/admin/countall', currentDate)
        console.log(res.data)
        setAllCount(res.data)

    }

    // login user
    const loginuser = async (formdata) => {
        console.log(formData)
        try {
            const res = await axios.post('http://localhost:3000/student/login', formdata)
            console.log(res.data)
            // setdata([res.data]);
            localStorage.setItem('userData', JSON.stringify(res.data));
            navigate('/userpanel')
        }
        catch (err) {
            console.log('err', err)
        }
    }

    const loginAdmin = async (admindata) => {
        console.log(admindata)
        try {
            const res = await axios.post('http://localhost:3000/admin/login', admindata)
            console.log(res.data)
            localStorage.setItem('admindata', JSON.stringify(res.data));

            navigate('/adminpanel')
        } catch (error) {
            console.log(error)
        }
    }
    // close login user

    const getUserData = async (userData) => {
        try {
            const res = await axios.get(`http://localhost:3000/student/userdetail/${userData.student._id}`)
            console.log(res)
            setdata([res.data])

        } catch (error) {
            console.log(error)
        }
    }

    const getUserDetail = async (userDetail) => {
        try {
            const res = await axios.get(`http://localhost:3000/student/userdetail/${userDetail.student._id}`)
            console.log(res)
            setUserDetail([res.data])

        } catch (error) {
            console.log(error)
        }
    }


    const getadmindata = async (admindata) => {
        try {
            const res = await axios.get(`http://localhost:3000/admin/admindetail/${admindata.student._id}`)
            console.log(res)
            setdata([res.data])
        } catch (error) {
            console.log(error)
        }
    }

    // for data
    const getleavedata = async (userLeaveData) => {
        try {
            const res = await axios.get(`http://localhost:3000/student/allleaves/${userLeaveData}`)
            console.log(res)
            setleaveData([res.data])

        } catch (error) {
            console.log(error)
        }
    }

    const getallleavedata = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/admin/todayleaves`)
            console.log(res.data[0])
            console.log(res.data[1])
            setleaveData([res.data[0]])
            setleaveUserRequest([res.data[1]])

        } catch (error) {
            console.log(error)
        }
    }
    // close for data
    const getAttendanceData = async (userId) => {
        try {
            const res = await axios.get(`http://localhost:3000/student/allattendance/${userId}`)
            console.log(res)
            setattandanceData([res.data])

        } catch (error) {
            console.log(error)
        }
    }

    const storedata = () => {
        setdata([...data, leaveData, attandanceData])
    }

    const markAttandance = async (reqData) => {
        try {
            const res = await axios.post(`http://localhost:3000/student/attendance`, reqData)
            console.log(res)
            setattandance(res.data)

           if(res){
            const resattendance = await axios.get(`http://localhost:3000/admin/todayAttendance/${reqData.student}`)
            console.log(resattendance.data)
            setUserAttendance(resattendance.data)
           }

        } catch (error) {
            console.log(error)
        }
    }

    const sendleaverequest = async (senddata) => {
        try {
            const res = await axios.post('http://localhost:3000/student/leave', senddata)
            console.log(res)
            setleaverequest(res.data)

            if(res){
                const resLeave = await axios.get(`http://localhost:3000/admin/todayLeave/${senddata.student}`)
                setTodayLeave(resLeave.data)
            }


        } catch (error) {
            console.log(error)
        }
    }

    // const getUserRecord=async(id)=>{
    //     const res = await axios.get(`http://localhost:3000/admin/count/${id}`)
    //     console.log(res)
    // }

    const handlechange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        seterror({ ...Error, [name]: false });
    };

    const handleUserform = (e) => {
        e.preventDefault()

        loginuser(formData)

    }

    const handleAdminform = (e) => {
        e.preventDefault()
        loginAdmin(formData)
    }

    const handleSidebarItemClick = (itemName) => {
        setSelectedItem(itemName);
    };

    const [isLoading , setoading] = useState(0)

    const handleusedetailpopup = async (id) => {
        setoading(1)
        setvisible(true)
        setleaverequest(true)
        console.log(id)
        
        try {

            const res = await axios.get(`http://localhost:3000/student/userdetail/${id}`)
            setUserDetail([res.data])
            const resrecord = await axios.get(`http://localhost:3000/admin/count/${id}`)
            console.log(resrecord.data)
            setUserRecord([resrecord.data])
            const resattendance = await axios.get(`http://localhost:3000/admin/todayAttendance/${id}`)
            console.log(resattendance.data)
            setUserAttendance(resattendance.data)

            const resLeave = await axios.get(`http://localhost:3000/admin/todayLeave/${id}`)
            setTodayLeave(resLeave.data)
            setoading(0)

        } catch (error) {
            console.log(error)
            setoading(0)
        }

        // const userData = JSON.parse(localStorage.getItem('userData'));
        // const userId = userData.student._id
        // console.log(userId)
        // getleavedata(userId)
        // getAttendanceData(userId)

        getAttendanceData(id)


        // // for getting user record

    }

    const handleremovepopup = () => {
        setvisible(false)
        setleaverequest(false)
        setUserRecord([])
        setUserDetail([])
        setDisplayBtn(true)
        setUserAttendance([])
        getNumOfLAP()
        setPopUps(false)

    }
    const handlereportpopup = () => {
        setreportpopup(true)
    }
    const handleremovereportpopup = () => {
        setreportpopup(false)
    }

    // console.log(loginType)

    // Student Logout 
    const handleStudentLogout = async () => {
        try {
         
            localStorage.clear('userData');
            navigate('/login');
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Logout failed', error);
        }
    };
    
    const handleAdminLogout = async () => {
        try {
         
            localStorage.clear('admindata');
            navigate('/login');
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Logout failed', error);
        }
    };



    const allfuntions = {
        setPopUps,
        popUps,

        handleSidebarItemClick,
        handleusedetailpopup,
        handleremovepopup,
        selectedItem,
        visible,
        handlereportpopup,
        reportpopup,
        handleremovereportpopup,

        handlechange,
        formData,
        handleUserform,
        Error,

        data,
        setdata,

        loginuser,

        leaverequest,

        getUserData,
        attandance,
        markAttandance,
        setattandance,

        sendleaverequest,
        sendleave,
        setsendleave,

        getleavedata,

        getAttendanceData,
        setattandanceData,
        attandanceData,
        setleaveData,
        leaveData,
        storedata,

        setLoginType,
        loginType,
        handleAdminform,

        getadmindata,
        allStudents,
        getallleavedata,

        allCount,
        getUserDetail,
        userDetail,

        userRecord,
        getNumOfLAP,

        userAttendance,
        setUserAttendance,

        displayBtn,
        setDisplayBtn,
        isLoading,

        todayLeave,

        handleStudentLogout,
        handleAdminLogout,
        setTodayLeave
        // getUserRecord

    }
    return (
        <div>
            <mycontext.Provider value={allfuntions}>
                {children}
            </mycontext.Provider>
        </div>
    )
}

export function UseContextdata() {
    return useContext(mycontext)
}

export default CreateContextApp