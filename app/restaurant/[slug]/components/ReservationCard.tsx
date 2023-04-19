"use client"
import React, { useState, useEffect } from 'react'
import { partySize, times } from '../../../../data/index'
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import { v4 as uuidv4 } from 'uuid';
import useAuth from '../../../../hooks/useAuth';
import { Alert, CircularProgress } from '@mui/material';
import Link from 'next/link';
import { formatDate, formatTime } from '../../../../utils/formatingFuncs';

interface Props {
    openTime: string
    closeTime: string
    slug: string
}

function ReservationCard({ openTime, closeTime, slug }: Props) {
    const [date, setDate] = useState<any>(new Date());
    const [peopleAmount, setPeopleAmount] = useState<number>();
    const [time, setTime] = useState<string>()
    const { data, isLoading, error, setTriger, collapseError } = useAuth({
        endpoint: `/api/restaurant/${slug}/availability?day=${formatDate(date)}&time=${time}&partySize=${peopleAmount}`,
        method: 'GET'
    });

    // useEffect(() => {
    //     console.log(data, isLoading, error);
    // }, [data, isLoading, error]);

    useEffect(() => {
        collapseError()
    }, [peopleAmount, time, date]);

    const handleSubmit = () => {
        setTriger(true)
    }

    const renderedTimes = () => {
        const availableTimes = times.filter(time => {
            return (time.time < closeTime && time.time >= openTime)
        })
        return availableTimes
    }

    return (
        // TODO: make it stickey
        <div className="w-[100%] sticky top-0 bg-white rounded p-3 shadow" style={{ position: 'sticky', top: 0 }}>
            <div className="text-center border-b pb-2 font-bold">
                <h4 className="mr-7 text-lg">Make a Reservation</h4>
            </div>
            <div className="my-3 flex flex-col">
                <label htmlFor="">Party size</label>
                <select
                    name=""
                    onChange={(e) => setPeopleAmount(parseInt(e.target.value))}
                    className="py-3 border-b font-light"
                    id=""
                    value={peopleAmount}
                >
                    {partySize.map(option => (
                        <option value={option.value} key={uuidv4()} >
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col max-w-[100%]">
                <label htmlFor="">Date</label>
                <DatePicker
                    className="py-3 border-b font-light"
                    value={date}
                    onChange={setDate}
                    format='dd-MMMM'
                />
            </div>
            <div className="flex flex-col w-full">
                <label htmlFor="">Time</label>
                <select
                    onChange={(e) => setTime(e.target.value)}
                    name=""
                    id=""
                    className="py-3 border-b font-light"
                    value={time}
                >
                    {renderedTimes().map(time => (
                        <option key={uuidv4()} value={time.time}>
                            {time.displayTime}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mt-5">
                <button
                    onClick={handleSubmit}
                    disabled={!time || !peopleAmount}
                    className="bg-red-600 rounded w-full px-4 text-white font-bold h-16 disabled:bg-red-300 hover:bg-red-400"
                >
                    {isLoading ?
                        <div className='flex justify-center'>
                            <CircularProgress
                                sx={{ color: 'white', height: '1rem' }}
                            />
                        </div>
                        : <span>Find a Time</span>}
                </button>
                {error && <Alert className='mt-3' severity="error">{error}</Alert>}
            </div>
            {(data && data.length) ? (
                <>
                    <p className='text-reg my-2 font-bold'>Select a Time</p>
                    <div className="flex flex-wrap gap-3">
                        {data.map((time: { time: string, availability: boolean }) => (
                            time.availability ?
                                <Link
                                    key={uuidv4()}
                                    className='h-8 w-24 flex items-center justify-center text-white bg-red-600 rounded cursor-pointer hover:bg-red-400'
                                    href={`reserve/${slug}?date=${formatDate(date)}T${time.time}&partySize=${peopleAmount}`}
                                >
                                    <p className='text-sm font-bold'>{formatTime(time.time)}</p>
                                </Link>
                                :
                                <div className='h-8 w-24 flex items-center justify-center text-white bg-gray-400 rounded' key={uuidv4()}>
                                    {formatTime(time.time)}
                                </div>
                        ))}
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default ReservationCard