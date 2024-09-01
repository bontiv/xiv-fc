import { PropsWithRef, Suspense } from "react"
import AuthProvider from "./auth"

export function generateStaticParams() {
    return ['discord', 'twitch'].map((provider) => ({ provider: provider }))
}

type ProviderType = { params: { provider: string } }

export default function LoginProvider({ params }: PropsWithRef<ProviderType>) {
    return <p>{params.provider}<Suspense><AuthProvider provider={params.provider} /></Suspense></p>
}