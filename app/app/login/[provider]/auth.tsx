'use client'

import { Typography } from "antd"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import useSWR from "swr"

export default function AuthProvider({ provider }: { provider: string }) {
    const params = useSearchParams()
    const access_token = params.get('access_token')
    const navigate = useRouter()
    const { data, error, isLoading } = useSWR(access_token != null ? `/api/auth/${provider}/callback?access_token=${encodeURIComponent(access_token)}` : false)

    if (!isLoading && data.jwt) {
        localStorage.setItem('jwt', data.jwt)
        localStorage.setItem('user', JSON.stringify(data.user))
        if (access_token != null) localStorage.setItem('discordToken', access_token)
        navigate.push('/app/')
    }

    return <Typography.Text>Connexion en cours... Echange de clés... Chiffrement des données......</Typography.Text>
}