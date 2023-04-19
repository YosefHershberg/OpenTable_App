import React, { Children } from 'react'
import Header from './components/Header'

function RestaurantLayout({
    children,
    params,
}: {
    children: React.ReactNode,
    params: { slug: string },
}) {

    return (
        <>
            <Header name={params.slug} />
            <div className="flex m-auto w-4/5 justify-between items-start 0 -mt-11">
                {children}
            </div>
        </>
    )
}

export default RestaurantLayout