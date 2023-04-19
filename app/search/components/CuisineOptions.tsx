'use client'
import React from 'react'
import { PRICE, Cuisine } from '@prisma/client'
import Link from 'next/link'
import MenuButton from './MenuButton'

interface Props {
    cuisines: Cuisine[],
    searchParams: {
        city: string,
        cuisine?: string,
        price?: PRICE,
    }
}

export default function CuisineOptions({ cuisines, searchParams }: Props) {
    return (
        <>
            <div className="border-b pb-4 mt-3 sm:flex hidden flex-col">
                <h1 className="mb-2">Cuisine</h1>
                {cuisines.map(cuisine => (
                    <Link
                        key={cuisine.id}
                        className="font-light text-reg flex items-center"
                        href={{
                            pathname: '/search',
                            query: {
                                ...searchParams,
                                cuisine: cuisine.name.toLowerCase()
                            }
                        }}
                    >
                        <input
                            type="radio"
                            id={cuisine.id.toString()}
                            name="Cuisine"
                            value={cuisine.name}
                            checked={searchParams.cuisine === cuisine.name}
                            onChange={() => { }}
                        />
                        <label
                            className='ml-1'
                            htmlFor={cuisine.id.toString()}
                        >
                            {cuisine.name}
                        </label>
                    </Link>
                ))}
            </div>
            <div className="sm:hidden">
                <MenuButton
                    name='Cuisines'
                    searchParams={searchParams}
                    optionsArr={cuisines}
                    query='cuisine'
                />
            </div>
        </>

    )
}
