'use client'

import useSWR from 'swr/immutable'

export default function JoinStatus() {
    const { data, error, isLoading } = useSWR('https://xivapi.com/freecompany/9231253336202720275?data=FCM')
    return data != undefined && data.FreeCompany.Recruitment != "Open" ? 'fermé' : 'ouvert'
}