import React from 'react'
import checkImg from '../../assets/pngfind.com-green-circle-png-1118219.png'
import Image from 'next/image'

export default function SuccessLoging({name}: {name: string}) {
    return (
        <div className='flex flex-col items-center sm:w-[300px] min-w-[200px]'>
            <Image
                className='h-28 w-28'
                src={checkImg}
                alt=""
            />
            <h3 className='my-4'>Login successful!</h3>
            <h1 className='text-2xl'>{`Welcome ${name}`}</h1>
        </div>
    )
}
