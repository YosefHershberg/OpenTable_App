import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import validator from 'validator'
import bcrypt from 'bcrypt'
import * as jose from 'jose'
import { setCookie } from 'cookies-next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {

        const { email, password } = req.body

        //CHECKING THAT INPUTS ARE VALID
        const errors: string[] = []

        const validationSchema = [
            {
                valid: validator.isEmail(email),
                errorMessage: 'Email address is invalid'
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

        //FETHCING USER BY EMAIL
        let user
        try {
            user = await prisma.user.findUnique({
                where: { email }
            })
        } catch (error) {
            return res.status(500).json({ errorMessage: 'Something whent wrong. Please try again' })
        }

        if (!user) {
            return res.status(403).json({ errorMessage: 'Invalid credentials, please re-enter email and password' })
        }

        //CHECKING THAT PASSWORD IS VALID
        let isValidPassword = false;
        try {
            isValidPassword = await bcrypt.compare(password, user.password)
        } catch (err) {
            return res.status(500).json({ errorMessage: 'Something whent wrong. Please try again' })
        }

        if (!isValidPassword) {
            return res.status(401).json({ errorMessage: 'Invalid password, please re-enter password' })
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
