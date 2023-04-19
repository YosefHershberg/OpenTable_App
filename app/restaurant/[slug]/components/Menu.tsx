import React from 'react'
import MenuCard from './MenuCard'
import { Item } from '@prisma/client';
// interface Item {
//     id: number,
//     name: string,
//     price: string,
//     description: string,
//     restaurant_id: number,
//     created_at: Date,
//     updated_at: Date,
//   }

function Menu({ menu }: { menu: Item[] }) {

    return (
        <main className="bg-white mt-5">
            <div>
                <div className="mt-4 pb-1 mb-1">
                    <h1 className="font-bold text-4xl">Menu</h1>
                </div>
                <div className="sm:flex flex-wrap justify-between">
                    {menu.length ? menu.map(item => (
                        <MenuCard key={item.id} item={item} />
                    )) : (
                        <p>This Restarant does not have a menu :/</p>
                    )}
                </div>
            </div>
        </main>
    )
}

export default Menu