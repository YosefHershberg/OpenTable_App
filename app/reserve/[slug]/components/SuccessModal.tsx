'use client'
import * as React from 'react';
import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import checkImg from '../../../assets/pngfind.com-green-circle-png-1118219.png'
import Image from 'next/image'
import { ReservationDetails } from './ResDetailsForm';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
};

interface Props {
    isSM_Open: boolean,
    reservationDetails: ReservationDetails,
    restaurantName: string,
    resTime: string,
    resDate: string,
}

export default function SuccessModal({ isSM_Open, reservationDetails, restaurantName, resTime, resDate }: Props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        isSM_Open && handleOpen()
    }, [isSM_Open]);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style} className="sm:w-[400px] w-[250px]">
                        <div >
                            <div className='flex flex-col items-center'>
                                <Image
                                    className='h-28 w-28'
                                    src={checkImg}
                                    alt=""
                                />
                                <h3 className='my-4'>Reservation successful!</h3>
                                <p>{`Thnak you ${reservationDetails.booker_first_name} for making a reservation for The ${restaurantName} at ${resDate} ${resTime}`} </p>
                            </div>
                            <button
                                onClick={handleClose}
                            >Close</button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}