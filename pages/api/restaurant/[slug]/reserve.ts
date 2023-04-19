import { NextApiRequest, NextApiResponse } from 'next'
import { times } from '../../../../data'
import { Booking, PrismaClient, Restaurant, Table } from '@prisma/client'
import { findAvailableTables } from '../../../../services/restaurant/findAvailablesTables'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(404).json({ errorMessage: 'Invalid request method. must be "POST"' })
    }

    const { slug, day, time, partySize } = req.query as {
        slug: string
        day: string
        time: string
        partySize: string
    }

    const {
        bookerEmail,
        bookerPhone,
        bookerFirstName,
        bookerLastName,
        bookerOccasion,
        bookerRequest
    } = req.body

    if(!bookerEmail && !bookerPhone && !bookerFirstName && !bookerLastName && !bookerOccasion && !bookerRequest) {
        return res.status(400).json({ errorMeesage: 'Bad request. Try again with the correct body' })
    }

    //FTCHING THE RESTAURANT
    let restaurant: {
        tables: Table[],
        open_time: string,
        close_time: string,
        id: number
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
                id: true
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMessage: 'Something went wrong fetching restaurant. Try again later' })
    } finally {
        if (!restaurant) {
            return res.status(400).json({ errorMessage: 'Invalid data provided' })
        }
    }

    //CHECKING TIME AVAILABILTY
    if (
        new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
        new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
    ) {
        return res.status(400).json({ errorMessage: 'Restaurant is not open at that time' })
    }

    //FINDING AVAILABLE TABLES
    let searchTimes
    try {
        searchTimes = await findAvailableTables({ res, time, day, slug, restaurant })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMessage: 'Something went wrong finding availability. Try again later' })
    } finally {
        if (!searchTimes) {
            return res.status(400).json({ errorMessage: 'Invalid data provided' })
        }
    }

    //FILTERING NON-RELAVENT TIMES
    const disgnatedSearchTime = searchTimes.find(st => st.date.toString() === new Date(`${day}T${time}`).toString())

    if (!disgnatedSearchTime) {
        return res.status(400).json({ errorMessage: 'Something went wrong finding availability. Try again later' })
    }

    //CHECKING SEAT AVAILABILITY
    const sumSeats = disgnatedSearchTime.tables.reduce((sum, table) => {
        return sum + table.seats
    }, 0)

    if (!(sumSeats >= parseInt(partySize))) {
        return res.status(400).json({ errorMessage: 'Something went wrong with the party size .Try again later' })
    }

    //CHOOSING TABLE BY MIN SEATS
    const tablesCount: {
        2: number[];
        4: number[];
    } = {
        2: [],
        4: [],
    };

    disgnatedSearchTime.tables.forEach((table) => {
        if (table.seats === 2) {
            tablesCount[2].push(table.id);
        } else {
            tablesCount[4].push(table.id);
        }
    });

    const tablesToBooks: number[] = [];
    let seatsRemaining = parseInt(partySize);

    while (seatsRemaining > 0) {
        if (seatsRemaining >= 3) {
            if (tablesCount[4].length) {
                tablesToBooks.push(tablesCount[4][0]);
                tablesCount[4].shift();
                seatsRemaining = seatsRemaining - 4;
            } else {
                tablesToBooks.push(tablesCount[2][0]);
                tablesCount[2].shift();
                seatsRemaining = seatsRemaining - 2;
            }
        } else {
            if (tablesCount[2].length) {
                tablesToBooks.push(tablesCount[2][0]);
                tablesCount[2].shift();
                seatsRemaining = seatsRemaining - 2;
            } else {
                tablesToBooks.push(tablesCount[4][0]);
                tablesCount[4].shift();
                seatsRemaining = seatsRemaining - 4;
            }
        }
    }

    console.log({
        bookerEmail,
        bookerPhone,
        bookerFirstName,
        bookerLastName,
        bookerOccasion,
        bookerRequest,
    });


    // CREATING THE BOOKING    

    let booking: Booking;
    try {
        booking = await prisma.booking.create({
            data: {
                number_of_people: parseInt(partySize),
                booking_time: new Date(`${day}T${time}`),
                booker_email: bookerEmail,
                booker_phone: bookerPhone,
                booker_first_name: bookerFirstName,
                booker_last_name: bookerLastName,
                booker_occasion: bookerOccasion,
                booker_request: bookerRequest,
                restaurant_id: restaurant.id,
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMessage: 'Somwthing went wrong creating the booking1. Please try again later' })
    }

    if (!booking) {
        return res.status(500).json({ errorMessage: 'Somwthing went wrong creating the booking. Please try again later' })
    }

    const bookingsOnTablesData = tablesToBooks.map((table_id) => {
        return {
            table_id,
            booking_id: booking.id,
        };
    });

    await prisma.bookingsOnTables.createMany({
        data: bookingsOnTablesData,
    });

    //RETURN
    return res.status(200).json(booking)
}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?day=2023-04-17&time=15:00:00.000Z&partySize=8
// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?date=2023-04-17T17:00:00.000Z&partySize=5