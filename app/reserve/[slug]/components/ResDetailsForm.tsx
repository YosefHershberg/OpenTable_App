'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import useAuth from '../../../../hooks/useAuth';
import { Alert, CircularProgress } from '@mui/material';
import SuccessModal from './SuccessModal';
import { Restaurant } from '../../../restaurant/[slug]/page'
import { formatDateForRes, formatTime } from '../../../../utils/formatingFuncs';

interface FormType {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    occasion: string,
    requests: string,
}

const emptyForm: FormType = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    occasion: '',
    requests: '',
}

interface Props {
    slug: string
    searchParams: {
        date: string
        partySize: string
    },
    restaurant: Restaurant
}

export interface ReservationDetails {
    booker_email: string,
    booker_first_name: string,
    booker_last_name: string,
    booker_occasion: string,
    booker_phone: string,
    booker_request: string,
    booking_time: string,
    created_at: string,
    id: number,
    number_of_people: number,
    restaurant_id: number,
    updated_at: string,
}

function ResDetailsForm({ slug, searchParams, restaurant }: Props) {
    const [form, setForm] = useState<FormType>(emptyForm)
    const [isSM_Open, setIsSM_Open] = useState<boolean>(false)
    const { date, partySize } = searchParams
    const [day, time] = date.split('T')

    const { data, isLoading, error, setTriger, collapseError } = useAuth({
        endpoint: `/api/restaurant/${slug}/reserve?day=${day}&time=${time}&partySize=${partySize}`,
        body:
        {
            bookerEmail: form.email,
            bookerPhone: form.phone,
            bookerFirstName: form.firstName,
            bookerLastName: form.lastName,
            bookerOccasion: form.occasion,
            bookerRequest: form.requests
        },
        method: 'POST'
    });

    useEffect(() => {
        if (data) {
            setIsSM_Open(true)
            console.log(data);
        }
    }, [data]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        collapseError()
        setTriger(true)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        collapseError()
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            {data &&
                <SuccessModal
                    isSM_Open={isSM_Open}
                    reservationDetails={data}
                    restaurantName={restaurant.name}
                    resDate={formatDateForRes(day)}
                    resTime={formatTime(time)}
                />
            }
            <form onSubmit={handleSubmit} className="my-5 flex flex-wrap justify-between">
                <input
                    name='firstName'
                    onChange={handleChange}
                    value={form.firstName}
                    type="text"
                    className="border rounded p-3 w-[49%] mb-4"
                    placeholder="First name"
                />
                <input
                    name='lastName'
                    onChange={handleChange}
                    value={form.lastName}
                    type="text"
                    className="border rounded p-3 w-[49%] mb-4"
                    placeholder="Last name"
                />
                <input
                    name='phone'
                    onChange={handleChange}
                    value={form.phone}
                    type="text"
                    className="border rounded p-3 w-[49%] mb-4"
                    placeholder="Phone number"
                />
                <input
                    name='email'
                    onChange={handleChange}
                    value={form.email}
                    type="text"
                    className="border rounded p-3 w-[49%] mb-4"
                    placeholder="Email"
                />
                <input
                    name='occasion'
                    onChange={handleChange}
                    value={form.occasion}
                    type="text"
                    className="border rounded p-3 w-[49%] mb-4"
                    placeholder="Occasion (optional)"
                />
                <input
                    name='requests'
                    onChange={handleChange}
                    value={form.requests}
                    type="text"
                    className="border rounded p-3 w-[49%] mb-4"
                    placeholder="Requests (optional)"
                />
                <button
                    disabled={!form.firstName || !form.lastName || !form.email || !form.phone || !form.occasion}
                    className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
                >
                    {isLoading ?
                        <div className='flex justify-center'>
                            <CircularProgress
                                sx={{ color: 'white', height: '1rem' }}
                            />
                        </div>
                        :
                        <span>Complete reservation</span>
                    }
                </button>
                {error && <Alert className='mt-3' severity="error">{error}</Alert>}
            </form>

            <p className="mt-4 text-sm">
                By clicking “Complete reservation” you agree to the OpenTable Terms
                of Use and Privacy Policy. Standard text message rates may apply.
                You may opt out of receiving text messages at any time.
            </p>
        </div>
    )
}

export default ResDetailsForm