'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Location, PRICE } from '@prisma/client';
import Link from 'next/link';

interface Props {
    optionsArr: Location[],
    name: string,
    searchParams: {[key: string]: string | undefined | PRICE;},
    query: string
}

export default function MenuButton({ optionsArr, name, searchParams, query }: Props) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <Stack direction="row" spacing={2}>
            <div className='mx-1 mb-2'>
                <Button
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    endIcon={<KeyboardArrowDownIcon />}
                    variant="contained"
                    color="primary"
                    className='bg-blue-500 text-white'
                >
                    {name}
                </Button>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        {optionsArr.map(region => (
                                            <MenuItem onClick={handleClose}>
                                                <Link
                                                    key={region.id}
                                                    href={{
                                                        pathname: '/search',
                                                        query: {
                                                            ...searchParams,
                                                            [query]: region.name.toLowerCase()
                                                        }
                                                    }}
                                                    className="font-light text-reg flex items-center">
                                                    <input
                                                        type="radio"
                                                        id={region.id.toString()}
                                                        name={name}
                                                        value={region.name}
                                                        checked={searchParams[query] === region.name}
                                                        onChange={() => { }}
                                                    />
                                                    <label
                                                        className='ml-1'
                                                        htmlFor={region.id.toString()}
                                                    >
                                                        {region.name}
                                                    </label>
                                                </Link>
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </Stack>
    );
}