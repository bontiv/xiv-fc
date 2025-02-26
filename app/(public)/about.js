'use client'

import { useDataApiMany, useDataOne } from '@src/lib/data'
import Link from 'next/link'

export default function About() {
    const { data: config } = useDataApiMany('website', {
        populate: ['guild', 'guild.estate']
    })
    return <>
        <h3 id="about">A propos de nous</h3>
        <p>Les Alpha sont une compagnie libre (une guilde) chill et francophone réalisant des activités tous les samedis soirs.</p>
        <p>La compagnie libre est sur le serveur <b>{config?.data.guild.world}</b> de <b>Final Fantasy XIV</b>, sur le datacenter <b>{config?.data.guild.datacenter.replace(/[\]\n\t]/, "").trim()}</b>.</p>
        <p>
            La compagnie a été formée en février 2015 et
            est actuellement de rang {config?.data.guild.level}. Voir <a href={`https://fr.finalfantasyxiv.com/lodestone/freecompany/${config?.data.guild.lodestone}/`} target='_blank'>notre profil lodestone</a>.
            Notre compagnie comprend actuellement {config?.data.guild.members_count} membres.
        </p>
        <p>Venez visiter notre maison de CL <Link href={'/maison'}>{config?.data.guild.estate.Name}</Link> se trouvant parcelle 60, secteur 6, la Coupe (annexe).</p>
    </>
}