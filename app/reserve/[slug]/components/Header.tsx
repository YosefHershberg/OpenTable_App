'use client'
// TODO: REMOVE THIS
import React from 'react'
import { Restaurant } from '../../../restaurant/[slug]/page'
import { formatTime, formatDateForRes } from '../../../../utils/formatingFuncs'

interface Props {
    restaurant: Restaurant
    day: string
    time: string
    partySize: string | number
}

function Header({ restaurant, day, time, partySize }: Props) {

    return (
        <div>
            <h3 className="font-bold">You're almost done!</h3>
            <div className="sm:mt-5 mt:3 flex">
                <img
                    src={restaurant?.main_image}
                    alt=""
                    className="w-32 h-18 rounded sm:block hidden"
                />
                <div className="sm:ml-4">
                    <h1 className="text-3xl font-bold">
                        {restaurant?.name}
                    </h1>
                    <div className="flex sm:mt-3 mt-1">
                        <p className="sm:mr-6 mr-3">{formatDateForRes(day)}</p>
                        <p className="sm:mr-6 mr-3">{formatTime(time)}</p>
                        <p className="sm:mr-6 mr-3">{partySize} people</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header