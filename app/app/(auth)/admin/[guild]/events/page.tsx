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

    return [
        { guild: '2' },
        { guild: '3' },
    ]
}