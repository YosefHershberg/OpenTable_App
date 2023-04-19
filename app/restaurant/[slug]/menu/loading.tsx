import React from 'react'
import RestaurantNavbar from '../components/RestaurantNavbar'
import Menu from '../components/Menu'

export default function Loading() {
    return (
        <div className="bg-white w-[100%] rounded p-3 shadow">
            {/* <Menu menu={menu.items} /> */}
            <div className="animate-pulse w-[100%] h-10 rounded border">
            </div>
            <div className="animate-pulse w-[100%] rounded border">
                <div className="mt-4 pb-1 mb-1">
                    <h1 className="font-bold text-4xl">Menu</h1>
                </div>
                <div className="sm:flex flex-wrap justify-between">
                    {[1, 2, 3, 4, 5, 6].map(thing => (
                        <div key={thing} className="animate-pulse bg-slate-400 border rounded sm:w-[49%] w-full h-32 mb-3 flex flex-col justify-between">
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
