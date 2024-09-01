import axios, { AxiosRequestConfig } from 'axios'

export function Fetcher() {
    const config: AxiosRequestConfig = {
        baseURL: process.env.NEXT_PUBLIC_API,
        headers: {}
    }
    if (typeof localStorage !== undefined) {
        const jwt = localStorage.getItem('jwt')
        if (jwt != null && config.headers !== undefined)
            config.headers['Authorization'] = `Bearer ${jwt}`
    }
    return axios.create(config)
}
