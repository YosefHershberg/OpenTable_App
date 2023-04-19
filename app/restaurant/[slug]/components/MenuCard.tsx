import { Item } from '@prisma/client'
import React from 'react'

function MenuCard({ item }: { item: Item }) {

    return (
        <div className="border rounded p-3 sm:w-[49%] w-full mb-3 flex flex-col justify-between">
            <div>
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="font-light mt-1 text-sm">
                    {item.description}
                </p>
            </div>
            <p className="mt-3">{item.price}</p>
        </div>
    )
}

export default MenuCard