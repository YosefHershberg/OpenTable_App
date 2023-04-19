import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Table } from '@prisma/client'
import { times } from '../../data'

const prisma = new PrismaClient()

export const findAvailableTables = async ({
    res, time, day, slug, restaurant
}: {
    res: NextApiResponse,
    time: string,
    day: string,
    slug: string,
    restaurant: {
        tables: Table[],
        open_time: string,
        close_time: string,
    }
}) => {
    //GET THE SUGGESTED TIMES
    const searchTimesRaw = times.find(t => t.time === time)?.searchTimes

    if (!searchTimesRaw) {
        return res.status(500).json({ errorMessage: 'Something went wrong fetching the times. Try again later' })
    }

    //FETCHING THE BOOKINGS
    let bookings
    try {
        bookings = await prisma.booking.findMany({
            where: {
                booking_time: {
                    gte: new Date(`${day}T${searchTimesRaw[0]}`),
                    lte: new Date(`${day}T${searchTimesRaw[searchTimesRaw.length - 1]}`)
                }
            },
            select: {
                number_of_people: true,
                booking_time: true,
                tables: true,
                id: true,
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMessage: 'Something went wrong fething booking. Try again later' })
    }

    //FORMATING RESPONSE
    const bookingTablesObj: { [key: string]: { [key: number]: true } } = {}

    bookings.forEach(booking => {
        bookingTablesObj[booking.booking_time.toISOString()] = booking.tables.reduce((obj, table) => {
            return {
                ...obj,
                [table.table_id]: true
            }
        }, {})
    })

    //FETCHING TABLES OF RESTAURANT
    let tables: Table[];

    tables = restaurant.tables

    //FORMATING SEARCH TIMES
    const searchTimes = searchTimesRaw.map(time1 => (
        {
            date: new Date(`${day}T${time1}`),
            time: time1,
            tables,
        }
    ));

    //FILTERING OUT THE BOOKED TABLES
    searchTimes.forEach(t => {
        t.tables = t.tables.filter(table => {
            if (!bookingTablesObj[t.date.toISOString()]) {
                return table
            }
            if (bookingTablesObj[t.date.toISOString()][table.id] !== true) {
                return table
            }
        })
    })

    return searchTimes
}