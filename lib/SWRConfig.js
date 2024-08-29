'use client'

import { useEffect } from 'react'
import { SWRConfig, mutate } from 'swr'

export default function CustomSWRConfig({ children, fallback }) {
  useEffect(() => {
    console.log('Reload App data')
    mutate('https://xivapi.com/freecompany/9231253336202720275?data=FCM')
  }, [])

  return <SWRConfig value={{
    fetcher: async function (resource, init) {
      const res = await fetch(resource, init)
      if (!res.ok) {
        throw new Error("Error in API")
      }
      return res.json()
    },
    fallback: fallback,
    revalidateOnFocus: true,
    revalidateOnReconnect: false,
    errorRetryCount: 3,
  }}>{children}</SWRConfig>
}