import React from 'react'
import { PRICE, Cuisine } from '@prisma/client'
import Link from 'next/link'

interface Props {
    searchParams: {
        city: string,
        cuisine?: string,
        price?: PRICE,
    }
}


function PriceOptions({ searchParams }: Props) {

    const prices = [
        {
            price: PRICE.CHEAP,
            label: '$',
            className: 'border text-reg font-light rounded-l p-2 w-full flex justify-center'
        },
        {
            price: PRICE.REGULAR,
            label: '$$',
            className: 'border text-reg font-light p-2 w-full flex justify-center',
        },
        {
            price: PRICE.EXPENSIVE,
            label: '$$$',
            className: 'border text-reg font-light rounded-r p-2 w-full flex justify-center',
        },
    ]
    
    return (
        <div className="sm:mt-3 pb-4 sm:px-0 px-2">
            <h1 className="mb-2 sm:block hidden">Price</h1>
            <div className="flex">
                {prices.map(price => (
                    <Link
                        key={price.price}
                        className={`${price.className} ${searchParams.price === price.price && 'bg-gray-600 text-white'}`}
                        href={{
                            pathname: '/search',
                            query: {
                                ...searchParams,
                                price: price.price
                            }
                        }}>
                        {price.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default PriceOptions