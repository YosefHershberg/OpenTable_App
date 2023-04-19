import React from 'react'
import Header from './[slug]/components/Header'

export default function Loading() {
    return (
        <main>
            <div className="border-t h-screen">
                <div className="sm:py-9 p-3 md:w-3/5 sm:w-5/6 w-full m-auto">
                    <div>
                        <h3 className="font-bold">You're almost done!</h3>
                        <div className="mt-5 flex">
                            <div
                                className="w-32 h-32 rounded animate-pulse bg-slate-200"
                            />
                        </div>
                    </div>
                    <div className="my-5 flex flex-wrap justify-between">
                        <div className="border h-10 rounded p-3 w-[49%] mb-4 animate-pulse bg-slate-200"></div>
                        <div className="border h-10 rounded p-3 w-[49%] mb-4 animate-pulse bg-slate-200"></div>
                        <div className="border h-10 rounded p-3 w-[49%] mb-4 animate-pulse bg-slate-200"></div>
                        <div className="border h-10 rounded p-3 w-[49%] mb-4 animate-pulse bg-slate-200"></div>
                        <div className="border h-10 rounded p-3 w-[49%] mb-4 animate-pulse bg-slate-200"></div>
                        <div className="border h-10 rounded p-3 w-[49%] mb-4 animate-pulse bg-slate-200"></div>
                        <div
                            className="bg-red-600 w-full p-3 text-white font-bold rounded animate-pulse bg-slate-200 flex justify-center"
                        >
                            Complete reservation
                        </div>
                        <p className="mt-4 text-sm">
                            By clicking “Complete reservation” you agree to the OpenTable Terms
                            of Use and Privacy Policy. Standard text message rates may apply.
                            You may opt out of receiving text messages at any time.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
