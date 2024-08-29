import Image from "next/image"
import LightBox from "../components/lightbox"

export const metadata = {
    title: 'Le domaine - CL Alpha FFXIV',
    description: 'Le domaine des Alpha, toute l&apos;infrastructure de la compagnie au service des membres.'
}

export default function DomainPage() {
    return <>
        <div className="main-content">
            <h3>Le domaine</h3>
            <div className="csection">
                <div>
                    <LightBox src="/maison/maison-general.png" width={1080} height={768} />
                </div>
                <div>
                    <p>La maison de la compagnie est notre Q.G. Elle dispose de toutes les infrastructures nécessaires.</p>
                    <p>Elle se situe à la Coupe (annexe) parcelle 60, secteur 6.</p>
                    <p>A proximité immédiate, vous trouverez aussi un tableau des ventes et une sonnette.</p>
                </div>
            </div>
        </div>
        <div className="h-12 w-full bg-gradient-to-b from-white to-orange-50"></div>
        <div className="bg-orange-50">
            <div className="main-content">
                <h3>Nos infrastructures</h3>
                <div className="csection reverse">
                    <div>
                        <LightBox src="/maison/ecuries.png" width={1080} height={768} />
                    </div>
                    <div>
                        <p>Un peu de repos pour vous chocobos ?</p>
                        <p>Notre domaine est équipé d&apos;une écurie dernière génération avec de la place pour tous les compagnons de nos membres.</p>
                        <p>Dans le coffre, à disposition de tout le monde, des légumes sont mis à disposition pour l&apos;entrainement des chocobos.</p>
                    </div>
                </div>
                <div className="csection">
                    <div>
                        <LightBox src="/maison/comptoir.png" width={1080} height={768} />
                    </div>
                    <div>
                        <p>Une réparation ? Besoin de matière premières ?</p>
                        <p>Le comptoir de la maison vous procurera tout ce qu&apos;il vous faut. Il faut toujours partir bien équipé, n&apos;est-ce pas ?</p>
                    </div>
                </div>
                <div className="csection reverse">
                    <div>
                        <LightBox src="/maison/bar.png" width={1080} height={768} />
                    </div>
                    <div>
                        <p>Venez découvrir le bar !</p>
                        <p>Notre cuisinier vous fera un régal ! C&apos;est toujours mieux de partir avec le ventre plein pour aller combatre dans un raid.</p>
                        <p>Probablement que notre cuisine vous proposera ce qui vous conviendra pour votre plus grand bien.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="h-12 w-full bg-gradient-to-t from-white to-orange-50"></div>
        <div className="main-content">
            <h3>Notre scène</h3>
            <div className="csection">
                <div>
                    <LightBox src="/maison/scene-glams.png" width={1080} height={768} />
                </div>
                <div>
                    <p>Ce soir, c&apos;est défilé de mode. A la mode des Alpha !</p>
                    <p>Au sous-sol se trouve notre scène de défilé. Les plus belles tenues d&apos;Eorzea se présente sur la scène des Alpha</p>
                </div>
            </div>
            <div className="csection reverse">
                <div>
                    <LightBox src="/maison/coulisses.png" width={1080} height={768} />
                </div>
                <div>
                    <p>Pour se préparer, les coulisses sont équipés.</p>
                    <p>Nos coulisses disposent d&apos;une sonette pour appeler un coiffeur. Après tout, il faut bien une bonne coiffure pour accompagner une belle robe, non ?</p>
                </div>
            </div>
        </div>
    </>
}