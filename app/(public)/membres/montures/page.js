import MemberMount from "./members"
import { raidsMounts } from "./config"
import Link from "next/link"

export const metadata = {
    title: 'Les montures des membres - CL Alpha FFXIV',
    description: 'Liste des montures des membres, pour voir qui a besoin de quelle monture...',
  }

export default function MontsPage() {
    return <div className="main-content">
    <h3>Montures</h3>
    <p className="py-4">
        <Link href={'/membres'} className="button">Retour</Link>
    </p>
    <div className="overflow-x-scroll">
        <table className="table-auto border-collapse border border-slate-400 border-x-4">
            <thead>
                <tr>
                    <th className="border border-4 border-slate-400 px-4">Personnage</th>
                    {raidsMounts.map(element => <th className="border border-4 border-slate-400 px-4" key={element.Name}>{element.Name}</th>)}
                </tr>
            </thead>
            <tbody>
                <MemberMount />
            </tbody>
        </table>
    </div>
    </div>
}