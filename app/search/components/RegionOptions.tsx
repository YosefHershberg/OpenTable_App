'use client'
import React from 'react'
import Link from 'next/link'
import { PRICE, Location } from '@prisma/client'
import MenuButton from './MenuButton'

interface Props {
    regions: Location[],
    searchParams: {
        city: string,
        cuisine?: string,
        price?: PRICE,
    }
}

export default function RegionOptions({ regions, searchParams }: Props) {
    return (
        <>
            <div className="border-b pb-4 sm:flex hidden flex-col">
                <h1 className="mb-2">Region</h1>
                {regions.map(region => (
                    <Link
                        key={region.id}
                        href={{
                            pathname: '/search',
                            query: {
                                ...searchParams,
                                city: region.name.toLowerCase()
                            }
                        }}
                        className="font-light text-reg flex items-center">
                        <input
                            type="radio"
                            id={region.id.toString()}
                            name="Region"
                            value={region.name}
                            checked={searchParams.city === region.name}
                            onChange={() => { }}
                        />
                        <label
                            className='ml-1'
                            htmlFor={region.id.toString()}
                        >
                            {region.name}
                        </label>
                    </Link>
                ))}
            </div>
            <div className="sm:hidden">
                <MenuButton
                    name='Region'
                    searchParams={searchParams}
                    optionsArr={regions}
                    query='city'
                />
            </div>
        </>
    )
}
