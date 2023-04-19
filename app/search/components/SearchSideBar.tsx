import React from 'react'
import { Cuisine, Location, PRICE, PrismaClient } from '@prisma/client'
import RegionOptions from './RegionOptions'
import CuisineOptions from './CuisineOptions'
import PriceOptions from './PriceOptions'

const prisma = new PrismaClient()

interface Props {
    cuisines: Cuisine[],
    regions: Location[],
    searchParams: {
        city: string,
        cuisine?: string,
        price?: PRICE,
    }
}

async function SearchSideBar({ cuisines, regions, searchParams }: Props) {
    console.log(regions);
    

    return (
        <div className="sm:w-1/5 sm:block flex flex-wrap w-full justify-center">
            <RegionOptions
                regions={regions}
                searchParams={searchParams}
            />
            <CuisineOptions
                cuisines={cuisines}
                searchParams={searchParams}
            />
            <PriceOptions
                searchParams={searchParams}
            />
        </div>
    )
}

export default SearchSideBar
