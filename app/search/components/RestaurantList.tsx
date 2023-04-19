'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { SerachParamsProps } from '../page';
import { RetaurantCardType } from '../../page';
import RestaurantCard from '../components/RestaurantCard'
import { PRICE, Prisma, PrismaClient, Restaurant } from '@prisma/client';
import useFetchData from '../../../hooks/fetch-hook';

// interface Props {
//     searchParams: {searchParams: SerachParamsProps}
//     fetchRestarantsByLocation: any
// }

export default function RestaurantList({ searchParams, fetchRestarantsByLocation }: any) {
    const [restaurants, setRestaurants] = useState<RetaurantCardType[]>()

    const { data, isLoading, error } = useFetchData(fetchRestarantsByLocation, searchParams)

    useEffect(() => {
        data && setRestaurants(data)
    }, [data]);

    if (restaurants) return (
        <div className="w-5/6">
            {restaurants.length > 0 ? restaurants.map(restaurant => (
                <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                />
            )) : (
                <p>{`No restaurants found for ${JSON.stringify(searchParams)}`}</p>
            )}
        </div>
    )

    if (isLoading) return (
        <div className="w-5/6">
            <div className="border-b p-5">
                {[1, 2, 3, 4].map(thing => (
                    <div className='flex mb-3'>
                        <div className="rounded h-40 w-40 animate-pulse bg-slate-200 border"></div>
                        <div className="pl-4 pt-2">
                            <div className="animate-pulse bg-slate-200 border rounded h-8 w-24"></div>
                            <div className="animate-pulse bg-slate-200 border rounded h-8 w-32 mt-3">
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

    return null
}
