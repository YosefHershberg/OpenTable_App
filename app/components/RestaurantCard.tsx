import React from 'react'
import Link from 'next/link'
import { PrismaClient, Review } from '@prisma/client';
import { RetaurantCardType } from '../page';
import Price from './Price';
import { BsDot } from 'react-icons/bs'
import { calculateReviewsRatingFunction } from '../../utils/calculateReviewsRatingFunction';
import CalculateRatingsToStars from '../../utils/calculateRatingsToStars';

const prisma = new PrismaClient()

interface Props {
    restaurant: RetaurantCardType
}



function RestaurantCard({ restaurant }: Props) {

    return (
        <div
            className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer"
        >
            <Link href={`/restaurant/${restaurant.slug}`}>
                <img
                    src={restaurant.main_image}
                    alt=""
                    className="w-full h-36"
                />
                <div className="p-1">
                    <h3 className="font-bold text-2xl mb-2">{restaurant.name}</h3>
                    <div className="flex items-start items-center">
                        {restaurant.reviews.length > 0 &&
                            <>
                                <CalculateRatingsToStars
                                    rating={calculateReviewsRatingFunction(restaurant.reviews)}
                                />
                                <span className="ml-2"></span>
                            </>
                        }
                        <p>{`${restaurant.reviews.length} review${restaurant.reviews.length !== 1 ? 's' : ''}`}</p>
                    </div>
                    <div className="flex text-reg capitalize">
                        <p className="mr-1">{restaurant.cuisine.name}</p>
                        <span className='flex items-center mx-1'><BsDot /></span>
                        <Price price={restaurant.price} />
                        <span className='flex items-center mx-1'><BsDot /></span>
                        <p>{restaurant.location.name}</p>
                    </div>
                    <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
                </div>
            </Link>
        </div>
    )
}

export default RestaurantCard