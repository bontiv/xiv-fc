import { useMemo } from "react"
import useSWR from "swr"
import { Fetcher } from "./api-fetcher"

export type QueryParams = {
    fields?: string[],
    filters?: {
        [field: string]: string | number | any
    },
    pagination?: {
        pageSize?: number,
        page?: number,
        withCount?: boolean
    },
    populate?: string[] | string,
    sort?: string[] | string
}

type KeyValue = {
    key: string,
    value: string
}

function recurseObjFlat(input: any): any {
    if (typeof input != 'object' || input == null) {
        return input;
    }

    if (Array.isArray(input)) {
        return input.map((i: any) => recurseObjFlat(i))
    }

    let out = []
    if ('id' in input && 'attributes' in input && Object.keys(input).length == 2) {
        out.push(['id', input.id])
        for (const attr in input.attributes) {
            out.push([attr, recurseObjFlat(input.attributes[attr])])
        }
    } else if ('data' in input && Object.keys(input).length == 1) {
        return recurseObjFlat(input.data)
    } else {
        for (const prop in input) {
            out.push([prop, recurseObjFlat(input[prop])])
        }
    }

    return Object.fromEntries(out);
}

function recurseObjEncode(obj: object, path: string | null = null): KeyValue[] {
    const returnData: KeyValue[] = []
    for (const [keyPart, value] of Object.entries(obj)) {
        const key = path == null ? keyPart : `${path}[${keyPart}]`
        if (typeof value === 'object') {
            returnData.push.apply(returnData, recurseObjEncode(value, key))
        } else if (typeof value === 'undefined') {
            // May skip undefined content
        } else if (typeof value === 'string') {
            returnData.push({ key, value })
        } else {
            returnData.push({ key, value: value.toString() })
        }
    }
    return returnData
}

function useForcedApiSWR(url: string | null) {
    return useSWR(url, {
        fetcher: (url: string, init: any) => Fetcher().get(url, { ...init }).then(r => r.data).catch((e) => {
            if (e.response.status == 401) {
                if (typeof localStorage !== undefined) {
                    localStorage.removeItem('jwt')
                }
            } else {
                throw e
            }
        })
    });
}

export function useApi(path: string | null) {

    return useForcedApiSWR(path && '/api' + path)
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
    return useForcedApiSWR(url);
}

export function useMany(collection: string | null | undefined, query: QueryParams | undefined = undefined) {
    const url = `/api/${collection}` + (query !== undefined ? '?' + recurseObjEncode(query)
        .map(opt => `${opt.key}=${encodeURIComponent(opt.value)}`)
        .join('&') : '')

    const api = useForcedApiSWR(collection ? url : null)

    if (!api.isLoading && !api.error && api.data != null) {
        if ('data' in api.data) {
            return {
                ...api, data: {
                    meta: api.data.meta,
                    data: recurseObjFlat(api.data.data)
                    //    data: api.data.data.map((i: any) => ({ id: i.id, ...i.attributes }))
                }
            }
        }
    }
    return api;
}

export function useDataOne(collection: string | null | false, id: number | false | string | null | undefined, query: QueryParams | undefined = undefined) {
    if (id == null || id == undefined || id == false) {
        collection = null
    } else if (typeof id == 'string') {
        id = Number.parseInt(id)
    }

    const url = useMemo<string | null>(
        () => {
            if (collection == null || collection == false) {
                return null;
            }
            return `/api/${collection}/${id}` + (query !== undefined ? '?' + recurseObjEncode(query)
                .map(opt => `${opt.key}=${encodeURIComponent(opt.value)}`)
                .join('&') : '')
        },
        [collection, id, query]
    )
    return useForcedApiSWR(url);
}

export function useOne(collection: string, id: number | string | null | undefined, query: QueryParams | undefined = undefined) {
    if (typeof id == 'string') {
        id = Number.parseInt(id)
    }

    const url = `/api/${collection}/${id}` + (query !== undefined ? '?' + recurseObjEncode(query)
        .map(opt => `${opt.key}=${encodeURIComponent(opt.value)}`)
        .join('&') : '')

    const data = useForcedApiSWR(id == null || id == undefined ? null : url)
    if (!data.isLoading && !data.error && data.data != null) {
        if ('data' in data.data) {
            return { ...data, data: recurseObjFlat(data.data.data) }
        }
    }
    return data
}

export async function deleteEntry(collection: string, id: number) {
    const url = `/api/${collection}/${id}`
    return Fetcher().delete(url)
}

export async function updateEntry(collection: string, data: any) {
    if ('id' in data) {
        const { id, ...attributes }: { id: string, attributes: any } = data
        const url = `/api/${collection}/${id}`
        return Fetcher().put(url, JSON.stringify({ data: attributes }), { headers: { 'Content-Type': 'application/json' } })
    } else {
        throw "Data must have id"
    }
}

export async function createEntry(collection: string, data: any) {
    const url = `/api/${collection}`
    return Fetcher().post(url, JSON.stringify({ data }), { headers: { 'Content-Type': 'application/json' } })
}


export class AccessRights {
    protected perms: Map<string, Map<string, Map<string, boolean>>> = new Map();

    constructor(obj: any) {
        if (obj == null) {
            return
        }

        for (const component in obj.permissions) {
            if (!this.perms.has(component))
                this.perms.set(component, new Map())
            for (const controller in obj.permissions[component].controllers) {
                if (!this.perms.get(component)?.has(controller))
                    this.perms.get(component)?.set(controller, new Map())
                for (const action in obj.permissions[component].controllers[controller]) {
                    this.perms.get(component)?.get(controller)?.set(action, obj.permissions[component].controllers[controller][action].enabled)
                }
            }
        }
    }

    toObject(): any {
        let obj = Object.fromEntries(this.perms);
        return obj;
    }

    has(controller: string, action: string = 'find', component: string | undefined = undefined): boolean | undefined {
        if (component == undefined) {
            component = 'api::' + controller
        }

        return this.perms.get(component)?.get(controller)?.get(action)
    }
}

export function useAccessRights(): AccessRights | undefined {
    const { data: me } = useForcedApiSWR('/api/users/me?populate=role')
    const { data: role } = useForcedApiSWR(me == undefined ? null : `/api/users-permissions/roles/${me.role.id}`)
    return new AccessRights(role?.role)
}
