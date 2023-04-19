import React from 'react'
import Header from '../restaurant/[slug]/components/Header'

export default function Loading() {
    return (
        <>
            <Header name={'Loading...'} />
            <div className="md:flex m-auto w-4/5 justify-between items-start 0 -mt-11">
                <div className="animate-pulse bg-slate-200 border md:w-[65%] w-full h-96 rounded mb-6">
                    
                </div>
                <div className="animate-pulse bg-slate-200 border md:w-[32%] w-full h-64 rounded mb-6"></div>
            </div>
        </>
    )
}
