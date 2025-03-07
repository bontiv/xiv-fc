'use client'

import { as } from "@fullcalendar/core/internal-common";
import { useApi } from "@src/lib/data";
import { AnimatePresence, motion } from "framer-motion";
import React, { ElementType, ReactElement, useState } from "react";
import { TwitchClip } from "react-twitch-embed";
import { Container } from "react-dom";

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

type ApparentComponentProps<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = C extends React.JSXElementConstructor<infer P>
    ? JSX.LibraryManagedAttributes<C, P>
    : React.ComponentProps<C>;

interface ModalProps<C extends React.ElementType = React.ElementType> {
    as?: C;
    clip: Clip;
    onClose?: () => void;
}

function ModalViewer<C extends
    | keyof JSX.IntrinsicElements
    | React.ComponentType<C extends React.ComponentType<infer P> ? P : never>
>({ as, clip, onClose, ...props }: ModalProps<C> & React.PropsWithoutRef<ApparentComponentProps<C>>) {
    const Cmp: React.ElementType = as || "div";
    return (
        <Cmp className="fixed top-0 left-0 w-full h-full bg-slate-600/75" onClick={onClose} {...props}>
            <div className="bg-white mt-24 mx-auto max-w-full w-5/6 rounded">
                <div className="flex bg-slate-200 rounded-t">
                    <h2 className="grow">{clip.title}</h2>
                    <a className="px-2 py-1 bg-red-400 rounded" onClick={onClose}>X</a>
                </div>
                <div className="bg-black ">
                    <TwitchClip muted={false} clip={clip.id} width={'100%'} />
                </div>
            </div>
        </Cmp>
    )
}
const ClipsSection: React.FC = ({ }) => {
    const { data, isLoading } = useApi('/clips')
    const [clip, setClip] = useState<Clip>()
    if (isLoading || data.length == 0) {
        return <></>
    }

    return <div className="clips">
        <h3>Nos clips Twitch</h3>
        <AnimatePresence>
            {clip && <ModalViewer
                as={motion.div}
                clip={clip}
                onClose={() => setClip(undefined)}
                animate={{
                    opacity: 1
                }}
                initial={{
                    opacity: 0
                }}
                exit={{
                    opacity: 0
                }}
            />}
        </AnimatePresence>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-8">
            {data.map((clip: Clip) => <div key={clip.id} className="bg-slate-200 p-2 rounded">
                <a onClick={() => setClip(clip)}><img src={clip.thumbnail_url} /></a>
                <h4 className="text-md">{clip.title}</h4>
            </div>)}
        </div>
    </div>
}

export default ClipsSection;