import Link from "next/link"
import Members from "./members"

export const metadata = {
    title: 'Les membres - CL Alpha FFXIV',
    description: 'A propos des Alpha',
}

export default function MembersPage() {
    return <div className="main-content">
        <h3 id="join">Membres actifs</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 text-center">
            <Members />
        </div>
        <p className="leading-8">
            Informations sur les membres :
            <Link href={'/membres/montures'} className="button mx-2">Montures</Link>
        </p>
    </div>
}