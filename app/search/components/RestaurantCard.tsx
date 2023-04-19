import React from 'react'
import Link from 'next/link'
import { RetaurantCardType } from '../../page';
import Price from '../../components/Price';
import { BsDot } from 'react-icons/bs'
import { calculateReviewsRatingFunction } from '../../../utils/calculateReviewsRatingFunction';
import CalculateRatingsToStars from '../../../utils/calculateRatingsToStars';

interface Props {
    restaurant: RetaurantCardType
}

function RestaurantCard({ restaurant }: Props) {

    const renderRationText = () => {
        const rating = calculateReviewsRatingFunction(restaurant.reviews)
        if (rating > 4) return 'Aewsome'
        if (rating > 3) return 'Great'
        if (rating > 2) return 'Good'
        if (rating > 1) return 'Okey'
        if (rating > 0) return 'Not great'
    }

    return (
        <div className="border-b flex sm:p-5 py-3">
            <img
                src={restaurant.main_image}
                alt=""
                className="rounded sm:h-40 sm:w-40 h-32 w-32 object-cover object-center"
            />
            <div className="pl-4">
                <div className="flex flex-col h-full justify-between">
                    <div>
                        <h2 className="sm:text-3xl text-lg">{restaurant.name}</h2>
                        <div className="flex items-center">
                            {restaurant.reviews.length > 0 &&
                                <>
                                    <CalculateRatingsToStars
                                        rating={calculateReviewsRatingFunction(restaurant.reviews)}
                                    />
                                    <span className="ml-2"></span>
                                </>
                            }
                            <p className="text-sm">{renderRationText()}</p>
                        </div>
                        <div className="font-light flex text-reg flex-wrap">
                            <Price price={restaurant.price} />
                            <span className='flex items-center mx-1'><BsDot /></span>
                            <p>{restaurant.cuisine.name}</p>
                            <span className='flex items-center mx-1'><BsDot /></span>
                            <p>{restaurant.location.name}</p>
                        </div>
                    </div>
                    <div className="text-red-600 sm:text-md">
                        <Link href={`/restaurant/${restaurant.slug}`}>
                            View more information
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantCard