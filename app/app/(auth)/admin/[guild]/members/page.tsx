import React from "react"
import { MembersTable } from "./table"

export const metadata = {
    title: 'Membres (discord)'
}

export default function AdmGuildPage({ params }: { params: Promise<{ guild: string }> }) {
    const { guild }: { guild: string } = React.use(params)
    return <MembersTable discord={guild} />
}

export async function generateStaticParams() {

    return [
        { guild: '2' },
        { guild: '3' },
    ]
}