import { NextApiRequest, NextApiResponse } from 'next'
import { times } from '../../../../data'
import { PrismaClient, Table } from '@prisma/client'
import { findAvailableTables } from '../../../../services/restaurant/findAvailablesTables'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(404).json({ errorMessage: 'Invalid request method. must be "GET' })
    }

    const { slug, day, time, partySize } = req.query as {
        slug: string
        day: string
        time: string
        partySize: string
    }

    //CHECK THAT QUERY PARAMS R SENT IN
    if (!day && !time && !partySize) {
        return res.status(400).json({ errorMessage: 'Invalid data provided' })
    }

    //FETCHING TABLES OF RESTAURANT
    let tables: Table[];
    
    let restaurant: {
        tables: Table[],
        open_time: string,
        close_time: string,
    } | null = null
    try {
        restaurant = await prisma.restaurant.findUnique({
            where: {
                slug
            },
            select: {
                tables: true,
                open_time: true,
                close_time: true,
            }
        })
        restaurant && (tables = restaurant.tables)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMessage: 'Something went wrong fetching restaurant. Try again later' })
    } finally {
        if (!restaurant) {
            return res.status(400).json({ errorMessage: 'Invalid data provided' })
        }
    }
    

    let searchTimes
    try {
        searchTimes = await findAvailableTables({res, time, day, slug, restaurant})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMessage: 'Something went wrong finding availability. Try again later' })
    } finally {
        if (!searchTimes) {
            return res.status(400).json({ errorMessage: 'Invalid data provided' })
        }
    }

    //CHECKING AVAILABILITY
    const availability = searchTimes.map(t => {
        const sumSeats = t.tables.reduce((sum, table) => {
            return sum + table.seats
        }, 0)
        return {
            time: t.time,
            availability: sumSeats >= parseInt(partySize)
        }
    }).filter(availability => {   //FILTERING OUT NON-OPEN HOURS
        const timeIsAfterOpenningHours = new Date(`${day}T${availability.time}`) >= new Date(`${day}T${restaurant?.open_time}`)
        const timeIsBeforeClosingHours = new Date(`${day}T${availability.time}`) <= new Date(`${day}T${restaurant?.close_time}`)

        return timeIsAfterOpenningHours && timeIsBeforeClosingHours
    })

    return res.status(200).json(availability)
}