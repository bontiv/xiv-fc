'use client'

type UserElement = {
    id: number,
    username: string,
    email: string,
    provider: string | undefined,
    confirmed: boolean,
    blocked: boolean,
    createdAt: Date,
    updatedAt: Date
}

export function userLogout() {
    localStorage.removeItem('user')
    localStorage.removeItem('jwt')
    document.location = '/'
}

export function useUser(): UserElement | null {
    const userData = localStorage.getItem('user')
    if (userData !== null) {
        return JSON.parse(userData)
    }
    return userData
}
