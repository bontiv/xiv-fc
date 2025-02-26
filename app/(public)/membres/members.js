'use client'

import { useDataApiMany } from '@src/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr/immutable'

export default function Members() {
    const { data: memberData } = useDataApiMany('website', {
        populate: ['guild', 'guild.characters']
    })

    const members = memberData?.data == undefined ? [] : memberData.data.guild.characters;

    return members.map(element => <div className='py-8 mx-auto' key={element.id}>
        {/*<Link href={`${element.ID.toString()}`} className='text-inherit hover:no-underline'>*/}
        <Image width={96} height={96} alt={`Portrait de ${element.Name}`} className='mx-auto rounded-full shadow-md' src={element.Avatar} />
        <a href={`https://fr.finalfantasyxiv.com/lodestone/character/${element.lodestone}/`} target='_blank'><span className='font-bold'>{element.Name}</span></a><br />
        <Image width={16} height={16} className='inline' alt={`Image ${element.FcRank}`} src={element.FcRankIcon} /> <span className='text-sm italic'>{element.FcRank}</span>
        {/*</Link>*/}
    </div>)
}