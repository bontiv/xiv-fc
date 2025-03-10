'use client'

import { useApi } from "@src/lib/data";
import React, { useState } from "react";
import { TwitchClip } from "react-twitch-embed";
import Image from "next/image";

type Clip = {
    id: string
    title: string
    thumbnail_url: string
    created_at: Date
    duration: number
    creator_name: string
    broadcaster_name: string
    embed_url: string
    url: string
}

interface ModalProps {
    clip: Clip;
    onClose?: () => void;
}

const ModalViewer: React.FC<ModalProps> = ({ clip, onClose, ...props }) => (
    <div className="fixed top-0 left-0 w-full h-full bg-slate-600/75" onClick={onClose} {...props}>
        <div className="bg-white mt-24 mx-auto max-w-full w-5/6 rounded">
            <div className="flex bg-slate-200 rounded-t">
                <h2 className="grow">{clip.title}</h2>
                <a className="px-2 py-1 bg-red-400 rounded" onClick={onClose}>X</a>
            </div>
            <div className="bg-black ">
                <TwitchClip muted={false} clip={clip.id} width={'100%'} />
            </div>
        </div>
    </div>
)

const ClipsSection: React.FC = ({ }) => {
    const { data, isLoading } = useApi('/clips')
    const [clip, setClip] = useState<Clip>()
    if (isLoading || data.length == 0) {
        return <></>
    }

    return <div className="clips">
        <h3>Nos clips Twitch</h3>
        {clip && <ModalViewer
            clip={clip}
            onClose={() => setClip(undefined)}
        />}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-8">
            {data.map((clip: Clip) => <div key={clip.id} className="bg-slate-200 p-2 rounded">
                <a onClick={() => setClip(clip)}>
                    <Image className="mx-auto" width={250} height={100} src={clip.thumbnail_url} alt={clip.title} />
                </a>
                <h4 className="text-md">{clip.title}</h4>
            </div>)}
        </div>
    </div>
}

export default ClipsSection;