'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'

interface Props {
    body?: any,
    method: string,
    endpoint: string
}

export default function useAuth({ endpoint, body, method }: Props) { //TODO: Change name
    const [data, setData] = useState<any>()
    const [isLoading, setIsLoading] = useState<boolean>()
    const [error, setError] = useState<string | null>()
    const [triger, setTriger] = useState<boolean>()

    const collapseError = () => setError(null)

    useEffect(() => {
        const fetchData = async () => { 
            try {
                setIsLoading(true)
                const options = {
                    method: method,
                    url: `http://localhost:3000${endpoint}`,
                    data: body
                }
                const { data } = await axios(options)
                setData(data)
            } catch (error: any) {
                console.log(error.response.data.errorMessage);
                setError(error.response.data.errorMessage)
            } finally {
                setIsLoading(false)
                setTriger(false)
            }
        }
        triger && fetchData()
    }, [triger]);

    return {
        data, isLoading, error, setTriger, collapseError
    }
}
