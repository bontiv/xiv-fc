'use client'

import Link from 'next/link'
import useSWR from 'swr/immutable'

export default async function About() {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_URL}/api/freecompany/9231253336202720275/members.json`)
    return <>
        <h3 id="about">A propos de nous</h3>
        <p>Les Alpha sont une compagnie libre (une guilde) chill et francophone réalisant des activités tous les samedis soirs.</p>
        <p>La compagnie libre est sur le serveur <b>{data.FreeCompany.Server}</b> de <b>Final Fantasy XIV</b>, sur le datacenter <b>{data.FreeCompany.DC.replace(/[\]\n\t]/, "").trim()}</b>.</p>
        <p>
            La compagnie a été formée le {new Date(data.FreeCompany.Formed * 1000).toLocaleDateString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' })} et
            est actuellement de rang {data.FreeCompany.Rank}. Voir <a href={`https://fr.finalfantasyxiv.com/lodestone/freecompany/${data.FreeCompany.ID}/`} target='_blank'>notre profil lodestone</a>.
            Notre compagnie comprend actuellement {data.FreeCompany.ActiveMemberCount} membres.
        </p>
        <p>Venez visiter notre maison de CL <Link href={'/maison'}>{data.FreeCompany.Estate.Name}</Link> se trouvant parcelle 60, secteur 6, la Coupe (annexe).</p>
    </>
}