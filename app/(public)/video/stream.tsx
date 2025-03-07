'use client'

import { useApi } from "@src/lib/data"
import { useState } from "react"
import { TwitchEmbed } from "react-twitch-embed"

const StreamSection: React.FC = ({ }) => {
    const { data, isLoading } = useApi('/streams')
    const [channel, setChannel] = useState<string | undefined>()

    if (isLoading || data.length == 0) {
        return null
    }

    const current_channel = channel ? channel : data[0].user_login
    return <div className="stream">
        <h3>Streams en cours</h3>
        <ul className="tabs mb-5">
            {data.map((user: { user_login: string, user_name: string }) => <li key={user.user_login}>
                <a className={user.user_login == current_channel ? 'active-tab' : ''} onClick={() => setChannel(user.user_login)}>{user.user_name}</a>
            </li>)}
        </ul>
        <TwitchEmbed width={'100%'} channel={current_channel} />
    </div>
}

export default StreamSection;