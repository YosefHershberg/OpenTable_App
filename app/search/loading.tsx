import React from 'react'
import Header from './components/Header'

export default function Loading() {
    return (
        <>
            <Header />
            <div className="flex py-4 m-auto sm:w-2/3 w-full justify-between items-start gap-5 ">
                <div className="sm:w-1/5 sm:block hidden animate-pulse bg-slate-200 border h-96 rounded">

                </div>
                <div className="sm:w-5/6 w-full">
                    <div className="border-b p-5">
                        {[1, 2, 3, 4].map(thing => (
                            <div className='flex mb-3'>
                                <div className="rounded sm:h-40 sm:w-40 h-32 w-32 animate-pulse bg-slate-200 border"></div>
                                <div className="pl-4 pt-2">
                                    <div className="animate-pulse bg-slate-200 border rounded h-8 w-24"></div>
                                    <div className="animate-pulse bg-slate-200 border rounded h-8 w-32 mt-3">
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
