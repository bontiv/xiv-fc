'use client'
import { SWRConfiguration, SWRConfig as config } from "swr";
import { Fetcher } from '@lib/data/api-fetcher';

export const SWRConfig = ({ ...props }) => config({
    value: {
        fetcher: (url, init) => Fetcher().get(url, { ...init }).then(r => r.data)
    },
    ...props
})