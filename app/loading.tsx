import React from 'react'
import Header from './components/Header'

export default function Loading() {
    return (
        <main>
            <Header />
            <div className="sm:py-3 lg:px-36 sm:px-10 px-0 sm:mt-10 flex flex-wrap justify-center">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                    <div className="animate-pulse bg-slate-200 w-64 h-72 m-3 rounded overflow-hidden border curser-pointer" key={num}>
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">

                        </svg>
                    </div>
                ))}
            </div>
        </main>
    )
}
