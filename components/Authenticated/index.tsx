'use client'

import { useRouter } from "next/navigation"
import React, { Suspense, useEffect, useState } from "react"
import useSWR from 'swr'

export default function Authenticated({ children }: React.PropsWithChildren) {
    const [authenticated, setAuthenticated] = useState<undefined | boolean>(undefined)
    const navigate = useRouter()
    const { isLoading, error } = useSWR('/api/users/me')

    useEffect(() => {
        const jwt = localStorage.getItem('jwt')

        if (jwt == null) {
            navigate.push('/app/login')
            return
        }
        if (!isLoading && error != undefined) {
            console.warn(error)
            navigate.push('/app/login')
            return
        }
        setAuthenticated(true)
    }, [])

    return <Suspense>{authenticated === undefined ? "Authentication requise..." : children}</Suspense>
}