'use client'

import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr/immutable'

export default function Members() {
    const { data } = useSWR(`${process.env.NEXT_PUBLIC_URL}/api/freecompany/9231253336202720275/members.json`)

    if (data == undefined) {
        return <p>Chargement en cours</p>
    }

    return data['FreeCompanyMembers'].map(element => <div className='py-8 mx-auto' key={element.ID}>
        {/*<Link href={`${element.ID.toString()}`} className='text-inherit hover:no-underline'>*/}
        <Image width={96} height={96} alt={`Portrait de ${element.Name}`} className='mx-auto rounded-full shadow-md' src={element.Avatar} />
        <a href={`https://fr.finalfantasyxiv.com/lodestone/character/${element.ID}/`} target='_blank'><span className='font-bold'>{element.Name}</span></a><br />
        <Image width={16} height={16} className='inline' alt={`Image ${element.Rank}`} src={element.RankIcon} /> <span className='text-sm italic'>{element.Rank}</span>
        {/*</Link>*/}
    </div>)
}