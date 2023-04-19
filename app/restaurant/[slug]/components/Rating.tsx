import React from 'react'
import { calculateReviewsRatingFunction } from '../../../../utils/calculateReviewsRatingFunction'
import CalculateRatingsToStars from '../../../../utils/calculateRatingsToStars'
import { Review } from '@prisma/client'

function Rating({ reviews }: { reviews: Review[] }) {
    const rating = calculateReviewsRatingFunction(reviews)

    return (
        <div className="flex items-end items-center">
            <CalculateRatingsToStars rating={rating}/>
            <p className="text-reg ml-4">{reviews.length} Review{reviews.length !== 1 ? 's' : ''}</p>
        </div>
    )
}

export default Rating