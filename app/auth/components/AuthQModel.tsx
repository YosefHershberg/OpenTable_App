'use client'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useContext } from 'react';
import * as React from 'react';
import { AuthenticationContext } from '../../context/AuthContext';
import { Backdrop, Fade } from '@mui/material';

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

export default function AuthQModal() {
    const { loggedUser, logout } = useContext(AuthenticationContext)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (loggedUser) {
        return (
            <div>
                <button
                    className='bg-blue-400 text-white border p-1 px-4 rounded mr-3'
                    onClick={handleOpen}
                >
                    Log Out
                </button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Are you sure you want to logout?
                            </Typography>
                            <div className="flex gap-3 justify-center mt-4">
                                <button
                                    onClick={logout}
                                    className='bg-blue-400 text-white border p-1 px-4 rounded mr-3'
                                >
                                    Proceed
                                </button>
                                <button
                                    onClick={handleClose}
                                    className='bg-red-400 text-white border p-1 px-4 rounded mr-3'
                                >
                                    Cancel
                                </button>
                            </div>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        )
    } else return null
}