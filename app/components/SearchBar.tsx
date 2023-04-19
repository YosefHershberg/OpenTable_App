"use client"
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function SearchBar() {
    const router = useRouter()
    const [location, setLocation] = useState<string>('')

    const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push(`/search?city=${location.toLocaleLowerCase()}`)
        setLocation('')
    }

    return (
        // <div className="text-left text-lg py-3 m-auto flex justify-center">
        <form onSubmit={handleClick} className="sm:p-0 p-2 text-left text-lg sm:py-3 m-auto sm:flex justify-center">
            <input
                className="rounded mr-3 p-2 sm:w-[450px] w-full"
                type="text"
                placeholder="State, city or town"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <div className='mt-4 sm:mt-0 flex justify-center'>
                <button
                    className="rounded bg-red-600 px-9 py-2 text-white sm:w-26 w-full"
                    type='submit'
                >
                    Let's go
                </button>
            </div>
        </form>
        // </div>
    )
}

export default SearchBar