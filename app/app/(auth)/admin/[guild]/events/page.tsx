import { getGuildList } from "@src/lib/data";
import { EventTable } from "./table";
import React from "react";

export const metadata = {
    title: 'Gestion des événements'
}

export default function AdmGuildEventPage({ params }: { params: Promise<{ guild: string }> }) {
    const { guild }: { guild: string } = React.use(params)
    return <EventTable discord={guild} />

}

export async function generateStaticParams() {
    const guilds = await getGuildList()
    return guilds.map((x: any) => ({ guild: String(x.id) }))
    return [
        { guild: '2' },
        { guild: '3' },
    ]
}