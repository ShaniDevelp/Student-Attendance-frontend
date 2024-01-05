import React from 'react'
import Modal from 'react-modal'
import { UseContextdata } from '../Context/Contaxtapi';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Popups = () => {
    const { popUps, setPopUps, handleremovepopup } = UseContextdata();

    return (
        <Modal
            isOpen={popUps}
            onRequestClose={() => handleremovepopup()}
            appElement={document.body}
            style={{
                content: {
                    width: '20%',
                    margin: 'auto',
                    height: '180px',
                    display:'flex',
                    alignItems:'center',
                    margin: 'auto',
                    justifyContent:'center',
                    backgroundColor: 'black',
                    borderRadius:'10px',
                    // backgroundColor: '#FAD961',
                    // backgroundImage: `linear-gradient(90deg, #FAD961 0 %, #F76B1C 100 %)`,
                    // backgroundImage: `linear-gradient(90deg, #FAD961 0%, #F76B1C 100%)`,
                    
                    // backgroundImage: `linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)`,


                    color: '#fff'
                }
            }}
        >
            <div className='text-center'>
                <div>
                    {popUps.text==='Accepted'?
                     <CheckCircleOutlineIcon sx={{ fontSize: 40, color:'green' }} />:
                    <>
                     {popUps.text==='Successfully Updated'?
                     <CheckCircleOutlineIcon sx={{ fontSize: 40, color:'green' }} />:
                     <CancelPresentationRoundedIcon sx={{ fontSize: 40, color:'red' }} />
                    }
                    </>
                     
                }
                </div>
                <h2>{popUps.text}</h2>
            </div>



        </Modal>
    )
}

export default Popups