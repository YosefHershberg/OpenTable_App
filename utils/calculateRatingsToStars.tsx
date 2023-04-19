import emptyStar from '../public/icons/empty-star.png'
import fullStar from '../public/icons/full-star.png'
import halfStar from '../public/icons/half-star.png'
import React from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function CalculateRatingsToStars({rating}: {rating: number}) {
    const result = [];
    let tempStars = Math.round(rating * 2) / 2;
    for (let i = 0; i < 5; i++) {
        if (tempStars === 0) {
            result.push(emptyStar);
        } else if (tempStars > 0.5) {
            tempStars = tempStars - 1;
            result.push(fullStar);
        } else if (tempStars === 0.5) {
            result.push(halfStar);
            tempStars = tempStars - 0.5;
        }
    }

    return (
        <div className='flex items-canter justify-between' style={{width: '4.5rem'}}>
            {result.map(star => (
                <img src={star.src} alt="" key={uuidv4()} style={{height: '0.75rem'}}/>
            ))}
        </div>
    )
}
