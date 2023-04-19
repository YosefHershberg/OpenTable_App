import React from 'react'
import RestaurantNavbar from './components/RestaurantNavbar'
import Title from './components/Title'
import Rating from './components/Rating'
import Description from './components/Description'
import Images from './components/Images'
import Reviews from './components/Reviews'
import ReservationCard from './components/ReservationCard'
import { PrismaClient, Review } from '@prisma/client'
import { notFound } from 'next/navigation'
import Header from './components/Header'

const prisma = new PrismaClient()

export interface Restaurant {
    id: number;
    name: string;
    images: string[];
    description: string;
    slug: string;
    reviews: Review[];
    open_time: string;
    close_time: string;
    main_image: string;
}

export async function fetchRestaurntBySlug (slug: string): Promise<Restaurant> {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug,
        },
        select: {
            id: true,
            name: true,
            images: true,
            description: true,
            slug: true,
            reviews: true,
            open_time: true,
            close_time: true,
            main_image: true
        }
    })


    if (!restaurant) {
        notFound()
    }

    return restaurant
}


export default async function RestaurantDetails({ params }: { params: { slug: string } }) {
    const restaurant = await fetchRestaurntBySlug(params.slug)

    return (
        <div className='md:flex justify-between'>
            <div className="bg-white md:w-[65%] w-full rounded p-3 shadow mb-6">
                <RestaurantNavbar slug={restaurant.slug} />
                <Title name={restaurant.name} />
                <Rating reviews={restaurant.reviews} />
                <Description description={restaurant.description} />
                <Images images={restaurant.images} />
                <Reviews reviews={restaurant.reviews} />
            </div>
            <div className="md:w-[32%] w-full text-reg mb-6">
                <ReservationCard
                    openTime={restaurant.open_time}
                    closeTime={restaurant.close_time}
                    slug={params.slug}
                />
            </div>
        </div>
    )
}