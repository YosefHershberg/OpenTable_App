'use client'
import React, { useContext } from 'react'
import Link from 'next/link'
import AuthModal from '../auth/components/AuthModal'
import AuthQModal from '../auth/components/AuthQModel'
import { AuthenticationContext } from '../context/AuthContext'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

function Navbar() {
    const { loggedUser, logout } = useContext(AuthenticationContext)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <nav className="bg-white p-2 flex justify-between">
            <Link href="/" className="font-bold text-gray-700 text-2xl">
                {" "} OpenTable{" "}
            </Link>

            <div className="sm:block hidden">
                <div className="flex">
                    {loggedUser ?
                        <AuthQModal /> :
                        <>
                            <AuthModal signinMode={true} />
                            <AuthModal signinMode={false} />
                        </>
                    }
                </div>
            </div>

            <div className="sm:hidden">
                <Box
                    sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 30, height: 30 }} />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    // onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {loggedUser ?
                        // <MenuItem onClick={handleClose}>
                        <div className='flex flex-col gap-1 items-center justify-center pl-2'>
                            <AuthQModal />
                        </div>
                        // </MenuItem>
                        :
                        <div className='flex flex-col gap-1 items-center justify-center pl-2'>
                            <AuthModal signinMode={true}/>
                            <AuthModal signinMode={false} />
                        </div>
                    }
                    {/* <MenuItem onClick={handleClose}>
                        <Avatar /> Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Avatar /> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem> */}
                </Menu>
            </div>
        </nav>
    )
}

export default Navbar