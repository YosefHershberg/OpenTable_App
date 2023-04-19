'use client'
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthInputs from './AuthInputs';
import useAuth from '../../../hooks/useAuth';
import { UserDetailsTypes, emptyForm, AuthenticationContext } from '../../context/AuthContext';
import { Alert, Backdrop, CircularProgress, Fade } from '@mui/material';
import SuccessLoging from './SuccessLoging';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 300,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
};

export default function AuthModal({ signinMode }: { signinMode: boolean }) {
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState<boolean>(false)
    const [inputs, setInputs] = useState<UserDetailsTypes>(emptyForm)
    const [isPassowrdType, setIsPasswordType] = useState<boolean>(true)
    const [loginSuccess, setLoginSuccess] = useState<boolean>(false)

    const { login, loggedUser } = useContext(AuthenticationContext)

    const { data, isLoading, error, setTriger, collapseError } = useAuth(
        {
            endpoint: `/api/auth/${signinMode ? 'signin' : 'signup'}`,
            method: 'POST',
            body: inputs
        }
    )

    useEffect(() => {
        if (data) {
            setLoginSuccess(true)
        }
    }, [data]);

    useEffect(() => {
        data && setTimeout(() => {
            handleClose()
            login(data.user, data.token)
            setLoginSuccess(false)
        }, 1000);
    }, [loginSuccess]);

    useEffect(() => {
        if (signinMode) {
            if (inputs.email && inputs.password) {
                return setDisabled(true)
            } else {
                return setDisabled(false)
            }
        } else {
            if (inputs.email && inputs.password && inputs.city && inputs.phone && inputs.firstName && inputs.lastName) {
                return setDisabled(true)
            } else {
                return setDisabled(false)
            }
        }
    }, [inputs]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setIsPasswordType(true)
        setInputs(emptyForm)
        setOpen(false)
    };

    const renderContent = (signinContent: string, signupContent: string) => {
        return signinMode ? signinContent : signupContent
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
        error && collapseError()
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setTriger(true)
    }

    if (!loggedUser) {
        return (
            <div>
                <button
                    className={`${renderContent('bg-blue-400 text-white', '')} border p-1 px-4 rounded mr-3 w-24`}
                    onClick={handleOpen}
                >
                    {renderContent('Sign in', 'Sign up')}
                </button>
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
                        <Box sx={style}>
                            {loginSuccess && (
                                <SuccessLoging name={`${data.user.first_name} ${data.user.last_name}`} />
                            )}
                            {!loginSuccess &&
                                <div className="sm:w-[300px] min-w-[200px]">
                                    <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                                        <p className="text-sm">
                                            {renderContent('Sign In', 'Create Account')}
                                        </p>
                                    </div>
                                    <div className="m-auto">
                                        <h2 className="sm:text-2xl text-1xl font-light text-center">
                                            {renderContent('Log Into Your Account', 'Create Your OpenTable Account')}
                                        </h2>
                                        <form onSubmit={handleSubmit}>
                                            <AuthInputs
                                                inputs={inputs}
                                                handleInputChange={handleInputChange}
                                                signinMode={signinMode}
                                                isPassowrdType={isPassowrdType}
                                                setIsPasswordType={setIsPasswordType}
                                            />
                                            <button
                                                disabled={!disabled}
                                                className='uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400'
                                            >
                                                {isLoading ?
                                                    <div className='flex justify-center'>
                                                        <CircularProgress
                                                            sx={{ color: 'white', height: '1rem' }}
                                                        />
                                                    </div>
                                                    : renderContent('Sign In', 'Create Account')}
                                            </button>
                                        </form>
                                        {error && <Alert severity="error">{error}</Alert>}
                                    </div>
                                </div>}
                        </Box>
                    </Fade>
                </Modal>
            </div>
        );
    } else return null
}