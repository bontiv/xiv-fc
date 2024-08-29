import { PropsWithRef } from "react"
import AuthProvider from "./auth"

export async function generateStaticParams() {
    return ['discord', 'twitch'].map((provider) => ({ provider: provider }))
}

type ProviderType = { params: { provider: string } }

export default function LoginProvider({ params }: PropsWithRef<ProviderType>) {
    return <p>{params.provider}<AuthProvider provider={params.provider} /></p>
}