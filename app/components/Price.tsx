import React from 'react'
import { PRICE } from '@prisma/client'

function Price({ price }: { price: PRICE }) {

    if (price === PRICE.CHEAP) {
        return (
            <>
                <span>$</span>
                <span className='text-gray-300'>$$</span>
            </>
        )
    }

    if (price === PRICE.REGULAR) {
        return (
            <>
                <span>$$</span>
                <span className='text-gray-300'>$</span>
            </>
        )
    }

    return (
        <span className="text-reg font-light flex">$$$</span>
    )
}

export default Price