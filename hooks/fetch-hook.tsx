'use client'
import { Restaurant } from '@prisma/client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { RetaurantCardType } from '../app/page';


interface Props {
    fetcher: (...params: any[]) => Promise<Response>,
    params?: any,
}

export default function useFetchData(fetcher: (...params: any) => Promise<any>, params?: any): {
    data: RetaurantCardType[] | null,
    isLoading: boolean,
    error: Error | null,
} {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<any>()

    let result;
    
    useEffect(() => {
        try {
            setIsLoading(true)
            result = fetcher(params)
            if (result) setData(result)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }, [fetcher, params]);

    return { data, isLoading, error }
}
