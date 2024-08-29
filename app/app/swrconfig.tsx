'use client'
import { SWRConfiguration, SWRConfig as config } from "swr";

export const SWRConfig = ({ ...props }) => config({
    value: {
        fetcher: (url, init) => fetch(process.env.NEXT_PUBLIC_API + url, init).then(r => r.json())
    },
    ...props
})