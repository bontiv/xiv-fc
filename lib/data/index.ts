import { useMemo } from "react"
import useSWR from "swr"

export type QueryParams = {
    fields?: string[],
    filters?: {
        [field: string]: string | number | any
    },
    pagination?: {
        pageSize?: number
    },
    populate?: string[] | string,
    sort?: string[] | string
}

type KeyValue = {
    key: string,
    value: string
}

function recurseObjEncode(obj: object, path: string | null = null): KeyValue[] {
    const returnData: KeyValue[] = []
    for (const [keyPart, value] of Object.entries(obj)) {
        const key = path == null ? keyPart : `${path}[${keyPart}]`
        if (typeof value === 'object') {
            returnData.push.apply(returnData, recurseObjEncode(value, key))
        } else if (typeof value === 'string') {
            returnData.push({ key, value })
        } else {
            returnData.push({ key, value: value.toString() })
        }
    }
    return returnData
}

export function useDataApiMany(collection: string | null | false, query: QueryParams | undefined = undefined) {
    const url = useMemo<string | null>(
        () => {
            if (collection == null || collection == false) {
                return null;
            }
            return `/api/${collection}` + (query !== undefined ? '?' + recurseObjEncode(query)
                .map(opt => `${opt.key}=${encodeURIComponent(opt.value)}`)
                .join('&') : '')
        },
        [collection, query]
    )
    return useSWR(url);
}