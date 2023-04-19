'use client'
import React, { useState, createContext, useEffect, useCallback } from 'react'
import { deleteCookie, getCookie, hasCookie } from 'cookies-next';

export interface UserDetailsTypes {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    city: string,
    password: string,
}

export const emptyForm: UserDetailsTypes = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
}

interface AuthContext {
    loggedUser: UserDetailsTypes | null,
    login: (user: UserDetailsTypes, token: string, expirationDate?: Date) => void,
    logout: () => void,
}

export const AuthenticationContext = createContext<AuthContext>({
    loggedUser: null,
    login: () => { },
    logout: () => { },
})

export default function AuthContext({ children }: { children: React.ReactNode }) {
    const [loggedUser, setLoggedUser] = useState<UserDetailsTypes | null>(null)

    const login = useCallback((user: UserDetailsTypes) => {
        setLoggedUser(user)
    }, [])

    const logout = useCallback(() => {
        setLoggedUser(null)
        deleteCookie('jwt')
    }, [])

    useEffect(() => {
        if (hasCookie('jwt')) {
            const userData: any = getCookie('jwt')
            const parsedData = JSON.parse(userData);
            login(parsedData.user)
        }
    }, []);

    return (
        <AuthenticationContext.Provider value={{
            loggedUser,
            login,
            logout
        }}>
            {children}
        </AuthenticationContext.Provider>
    )
}
