'use client'
import Image from "next/image"
import { raidsMounts } from "./config"
import useSWR from 'swr/immutable'

export function MountRow({ character, avatar, charName, data, isLoading = true }) {

    return <tr className="border">
        <td className="border">
            <Image alt={charName} height={32} width={32} src={avatar} className="inline mx-2 rounded" />
            {charName}
        </td>
        {isLoading || data == undefined ? <td colSpan={raidsMounts.length}>Loading...</td> :
            raidsMounts.map(mountGroup =>
                <td className="border border-x-4 border-slate-400 px-4" key={mountGroup.Name}>
                    {mountGroup.Mounts.map(mount => data.Mounts.List.map(element => element.Name == mount.Name).includes(true) ?
                        <Image key={mount.Name} alt={mount.Name} title={mount.Name} className="inline m-1" height={32} width={32} src={mount.Image} />
                        : (90 >= mountGroup.Level ? <Image key={mount.Name} alt={mount.Name} title={mount.Name} className="inline m-1 opacity-30 grayscale" height={32} width={32} src={mount.Image} /> : '')
                    )}
                </td>)
        }
    </tr>
}

export default function MemberMount() {
    const { data: charMounts } = useSWR(`${process.env.NEXT_PUBLIC_URL}/api/freecompany/9231253336202720275/mounts.json`)

    if (charMounts == undefined) {
        return null
    }

    return charMounts.map(element =>
        <MountRow key={element.ID} character={element.ID} avatar={element.Avatar} data={element.mounts} isLoading={false} charName={element.Name} />
    )
}