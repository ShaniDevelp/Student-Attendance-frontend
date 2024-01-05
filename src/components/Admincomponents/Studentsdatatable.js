// import { Input, TextField } from '@mui/material'
// import React, { useState } from 'react'
// import { Button } from 'react-bootstrap'
// import { UseContextdata } from '../Context/Contaxtapi'
// import UserDetailspage from './UserDetailspage'
// // import { MDBDataTable } from 'mdbreact';




// const Studentsdatatable = () => {

//     const tableheading = ['Name', 'Email', 'Join at', 'Details']

//     const { handleusedetailpopup, allStudents } = UseContextdata();




//     return (
//         <div  >
//             <div style={{ marginBottom: '10px', width: '95%' }} className=' m-auto'>
//                 <div className='ui icon input mb-3 w-50 ' style={{ backgroundColor: '#fff' }}>
//                     <TextField
//                         placeholder='Search Students'
//                         className='border rounded w-100'
//                         size="small"
//                     />
//                     <i className='ui icon search' ></i>
//                 </div>

//             </div>
//             <div style={{ width: '95%', borderRadius: '10px', boxShadow: ` 0px 10px 15px -3px rgba(0,0,0,0.1),-1px -2px 6px 0px rgba(0,0,0,0.1)` }} className='m-auto  p-3 bg-white'  >
//                 <div _>
//                     <table className='w-100' _>

//                         <div className='d-flex' _>
//                             <thead style={{ width: '5%', display: 'flex', justifyContent: 'center' }} >
//                                 <th _>S-No</th>
//                             </thead>
//                             <thead style={{ width: '97%', backgroundColor: '#fff' }}>

//                                 <tr className='row d-flex justify-content-around   '>
//                                     {tableheading.map((heading, index) => (
//                                         <div className='col ' style={{ display: 'flex', backgroundColor: '#fff', justifyContent: 'center' }}><th _ key={index}>{heading}</th></div>
//                                     ))}
//                                 </tr>
//                             </thead>
//                         </div>
//                         <div className='ui divider rounded' style={{ border: '2px solid #C0C0C0' }}></div>
//                         <div>

//                             <table className='w-100'>
//                                 {allStudents.map((item,index) => {
//                                     const displayIndex=index+1
//                                     return (
//                                         <>
//                                             <div className='d-flex'>
//                                                 <tbody style={{ width: '5%', display: 'flex', justifyContent: 'center' }}>
//                                                     <td >{displayIndex}</td>
//                                                 </tbody>
//                                                 <tbody style={{ width: '97%' }}>
//                                                     <tr className='row d-flex justify-content-around' >

//                                                         <div className='col ' style={{ display: 'flex', justifyContent: 'center' }}><td>{item.name}</td></div>
//                                                         <div className='col ' style={{ display: 'flex', justifyContent: 'center' }}><td>{item.email}</td></div>
//                                                         <div className='col ' style={{ display: 'flex', justifyContent: 'center' }}><td>{item.createdAt.slice(0, 10)}</td></div>
//                                                         <div className='col ' style={{ display: 'flex', justifyContent: 'center' }}><td  ><Button onClick={handleusedetailpopup}>View Details</Button></td></div>
//                                                     </tr>
//                                                 </tbody>
//                                             </div>

//                                             <div className='ui divider'></div></>
//                                     )
//                                 })}
//                             </table>
//                         </div>
//                     </table>

//                 </div>
//                 <UserDetailspage />


//             </div>
//         </div>

//     )
// }

// export default Studentsdatatable




import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { TextField } from '@mui/material';
import { UseContextdata } from '../Context/Contaxtapi';
import UserDetailspage from './UserDetailspage';

const Studentsdatatable = () => {
    const tableheading = ['Name', 'Email', 'Join at', 'Details'];
    const pageSize = 4;

    const { handleusedetailpopup, allStudents } = UseContextdata();

    // const handleUserdetailpopup=(id)=>{
    //     handleusedetailpopup(id)
    // }

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

   

    // Apply search filter
    const filteredStudents = allStudents.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())   
    );

    const displayedStudents = filteredStudents.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredStudents.length / pageSize);

    return (
        <div>
            {/* Search bar */}
            <div style={{ marginBottom: '10px', width: '95%' }} className=' m-auto'>
                <div className='ui icon input mb-3 w-50 ' style={{ backgroundColor: '#fff' }}>
                    <TextField
                        placeholder='Search Students'
                        className='border rounded w-100'
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <i className='ui icon search'></i>
                </div>
            </div>

            {/* Table */}
            <div style={{ width: '95%', borderRadius: '10px', boxShadow: ` 0px 10px 15px -3px rgba(0,0,0,0.1),-1px -2px 6px 0px rgba(0,0,0,0.1)` }} className='m-auto p-3 bg-white'>
                <div>
                    <table className='w-100'>
                        {/* Table header */}
                        <div className='d-flex'>
                            <thead style={{ width: '5%', display: 'flex', justifyContent: 'center' }}>
                                <th>S-No</th>
                            </thead>
                            <thead style={{ width: '97%', backgroundColor: '#fff' }}>
                                <tr className='row d-flex justify-content-around'>
                                    {tableheading.map((heading, index) => (
                                        <div className='col' style={{ display: 'flex', backgroundColor: '#fff', justifyContent: 'center' }} key={index}>
                                            <th>{heading}</th>
                                        </div>
                                    ))}
                                </tr>
                            </thead>
                        </div>

                        {/* Table body */}
                        <div className='ui divider rounded' style={{ border: '2px solid #C0C0C0' }}></div>
                        <div>
                            <table className='w-100'>
                                {displayedStudents.map((item, index) => {
                                    const displayIndex = startIndex + index + 1;
                                    return (
                                        <>
                                            <div className='d-flex'>
                                                <tbody style={{ width: '5%', display: 'flex', justifyContent: 'center' }}>
                                                    <td>{displayIndex}</td>
                                                </tbody>
                                                <tbody style={{ width: '97%' }}>
                                                    <tr className='row d-flex justify-content-around'>
                                                        <div className='col' style={{ display: 'flex', justifyContent: 'center' }}><td>{item.name}</td></div>
                                                        <div className='col' style={{ display: 'flex', justifyContent: 'center' }}><td>{item.email}</td></div>
                                                        <div className='col' style={{ display: 'flex', justifyContent: 'center' }}><td>{item.createdAt.slice(0, 10)}</td></div>
                                                        <div className='col' style={{ display: 'flex', justifyContent: 'center' }}><td><button className='ui blue button' onClick={()=>handleusedetailpopup(item._id)}>View Details</button></td></div>
                                                    </tr>
                                                </tbody>
                                            </div>
                                            <div className='ui divider'></div>
                                        </>
                                    );
                                })}
                            </table>
                        </div>
                    </table>
                </div>
                <UserDetailspage />

                {/* Pagination */}
                <div className='d-flex justify-content-end mt-3 ' style={{marginRight:'10px'}}>
                    <ul className='pagination'>
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button className=' page-link ' onClick={() => setCurrentPage(index + 1)}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Studentsdatatable;
