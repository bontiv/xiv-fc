import { PropsWithRef, Suspense } from "react"
import AuthProvider from "./auth"
import React from "react"

export function generateStaticParams() {
    return ['discord', 'twitch'].map((provider) => ({ provider: provider }))
}

type ProviderType = { params: Promise<{ provider: string }> }

export default function LoginProvider({ params }: PropsWithRef<ProviderType>) {
    const { provider } = React.use(params)
    return <p>{provider}<Suspense><AuthProvider provider={provider} /></Suspense></p>
}