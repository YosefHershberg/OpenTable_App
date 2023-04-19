import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import validator from 'validator'
import bcrypt from 'bcrypt'
import * as jose from 'jose'
import { setCookie } from 'cookies-next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { firstName, lastName, email, city, phone, password } = req.body

        //CHECK THAT INPUTS ARE VALID
        const errors: string[] = []

        const validationSchema = [
            {
                valid: validator.isLength(firstName, { min: 1, max: 20 }),
                errorMessage: 'First name is invalid'
            },
            {
                valid: validator.isLength(lastName, { min: 1, max: 20 }),
                errorMessage: 'Last name is invalid'
            },
            {
                valid: validator.isEmail(email),
                errorMessage: 'Email address is invalid'
            },
            {
                valid: validator.isLength(city, { min: 1 }),
                errorMessage: 'City is invalid'
            },
            {
                valid: validator.isMobilePhone(phone, 'he-IL'),
                errorMessage: 'Phone number is invalid'
            },
            {
                valid: validator.isStrongPassword(password),
                errorMessage: 'Password is not strong enough'
            },
        ]

        validationSchema.forEach((check) => {
            if (!check.valid) {
                errors.push(check.errorMessage)
            }
        })

        if (errors.length) {
            return res.status(400).json({ errorMessage: errors[0] })
        }

        //CHECKING THAT USER DOES'NT ALREADY EXIST
        let existingUser
        try {
            existingUser = await prisma.user.findUnique({
                where: {
                    email
                }
            })
        } catch (error) {
            return res.status(500).json({ errorMessage: 'Failed to check if user is already signed in, please try again later' })
        }

        if (existingUser) {
            return res.status(422).json({ errorMessage: 'This email is already used. plaese try again or log in' })
        }

        //HASHING PASSWORD
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 12)
        } catch (err) {
            return res.status(500).json({ errorMessage: "could not create user. please try again" })
        }

        //CREATING THE USER
        let user
        try {
            user = await prisma.user.create({
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    city,
                    password: hashedPassword,
                    phone,
                },
            });
        } catch (error) {
            return res.status(500).json({ errorMessage: "could not create user. please try again" })
        }

        //CREATING JWT
        const alg = 'HS256'
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        let token;
        try {
            token = await new jose.SignJWT({ email: user.email })
                .setProtectedHeader({ alg })
                .setExpirationTime("24h")
                .sign(secret)
        } catch (error) {
            return res.status(500).json({ errorMessage: 'Something went wrong. Could not create token' })
        }

        setCookie('jwt', {token, user}, {req, res, maxAge: 60 * 6 * 24})

        res.status(200).json({
            user,
            token
        })
    } else { return res.status(404).json({ errorMessage: 'Unknown endpoint' }) }

}
