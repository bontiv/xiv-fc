'use client'

import { useDataApiMany } from '@src/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr/immutable'

export default function Members() {
    const { data: memberData } = useDataApiMany('website', {
        populate: ['guild', 'guild.characters']
    })

    const members = memberData?.data == undefined ? [] : memberData.data.attributes.guild.data.attributes.characters.data;

    return members.map(element => <div className='py-8 mx-auto' key={element.id}>
        {/*<Link href={`${element.ID.toString()}`} className='text-inherit hover:no-underline'>*/}
        <Image width={96} height={96} alt={`Portrait de ${element.attributes.Name}`} className='mx-auto rounded-full shadow-md' src={element.attributes.Avatar} />
        <a href={`https://fr.finalfantasyxiv.com/lodestone/character/${element.attributes.lodestone}/`} target='_blank'><span className='font-bold'>{element.attributes.Name}</span></a><br />
        <Image width={16} height={16} className='inline' alt={`Image ${element.attributes.FcRank}`} src={element.attributes.FcRankIcon} /> <span className='text-sm italic'>{element.attributes.FcRank}</span>
        {/*</Link>*/}
    </div>)
}