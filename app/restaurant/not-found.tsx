'use client'
import React from 'react'
import Image from 'next/image'
import errorIcon from '../../public/icons/error.png'

export default function Error({ error }: { error: Error }) {
    console.log({error});
    
    return (
        <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
            <Image src={errorIcon} alt={'error'} className='mb-8 w-56' />
            <div className="bg-white px-9 py-14 shadow rounded">
                <h3 className='text-3xl font-bold'>Well, this is embaressing</h3>
                <p className="text-reg font-bold">We couldn't find that restaurant</p>
                <p className="mt-6 text-sm font-light">Error code: 404</p>
            </div>
        </div>
    )
}
