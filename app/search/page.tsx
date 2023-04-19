"use server"
import React from 'react'
import Header from './components/Header'
import SearchSideBar from './components/SearchSideBar'
import RestaurantCard from './components/RestaurantCard'
import { PRICE, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const fetchRestarantsByLocation = async (searchParams: {
  city: string,
  cuisine?: string,
  price?: PRICE,
}) => {
  "use server"
  const where: any = {}

  if (searchParams.city) {
    const location = {
      name: searchParams.city.toLowerCase()
    }
    where.location = location
  }
  if (searchParams.cuisine) {
    const cuisine = {
      name: searchParams.cuisine.toLowerCase()
    }
    where.cuisine = cuisine
  }
  if (searchParams.price) {
    where.price = searchParams.price
  }

  const restaurants = await prisma.restaurant.findMany({
    where,
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      slug: true,
      location: true,
      price: true,
      reviews: true,
    }
  })
  return restaurants
}

const fetchCuisines = async () => {
  const restaurants = await prisma.cuisine.findMany()
  return restaurants
}

const fetchLocations = async () => {
  const restaurants = await prisma.location.findMany()
  return restaurants
}

export interface SerachParamsProps {
  searchParams: {
    city: string,
    cuisine?: string,
    price?: PRICE,
  }
}

export default async function Search({ searchParams }: SerachParamsProps) {
  const restaurants = await fetchRestarantsByLocation(searchParams)
  const cuisines = await fetchCuisines()
  const locations = await fetchLocations()

  return (
    <>
      <Header />
      <div className="sm:flex sm:py-4 p-2 m-auto sm:w-2/3 w-full sm:px-0 sm:px-5 px-3 justify-between items-start gap-5 ">
        <SearchSideBar
          searchParams={searchParams}
          cuisines={cuisines}
          regions={locations}
        />
        <div className="sm:w-5/6">
          {restaurants.length > 0 ? restaurants.map(restaurant => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
            />
          )) : (
            <p>{`No restaurants found for ${JSON.stringify(searchParams)}`}</p>
          )}
        </div>
      </div>
    </>
  )
}
