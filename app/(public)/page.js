import Image from "next/image";
import About from "./about";
import Link from "next/link";

export const metadata = {
  title: 'Compagnie Libre des Alpha (Phoenix) FFXIV',
  description: 'La compagnie libre francophone et fun sur le serveur Phoenix de Final Fantasy XIV.',
}

export default async function Home() {
  return (
    <div className="main-content">
      <div className="flex gap-20  items-center md:py-12">
        <div className="hidden md:block "><Image alt="guilde FF14" src={'all4one.jpg'} width={'500'} height={'500'} className="py-auto px-auto" /></div>
        <div className="">
          <About />
        </div>
      </div>

      <div className="flex gap-20 flex-row-reverse  items-center md:py-12">
        <div className="hidden md:block self-center"><Image alt="groupe de personnages FF14" src={'Team.png'} width={'800'} height={'800'} className="py-auto px-auto" /></div>
        <div className="">
          <h3>Pourquoi rejoindre une Compagnie Libre ?</h3>
          <p>
            Une guilde c&apos;est un bon moyen de progresser. Vous pouvez vous appuyer sur l&apos;aide des joueurs plus expérimentés pour
            progresser.
          </p>
          <p>
            Une compagnie libre repose sur l&apos;entraide. Certains pourront aider à concevoir des équipements. D&apos;autres vous aideront
            dans les donjons. Vous pouvez aussi compter sur l&apos;experience des joueurs chevronnés pour avoir les bonnes stratégies sur
            les combats les plus difficiles. Et de l&apos;aide aussi !
          </p>
          <p>
            Enfin c&apos;est aussi le bon moyen de profiter d&apos;une autre facette du jeu. Vous pourrez vous faire des nouveaux amis et vous
            laisser tenter par le contenu annexe du jeu. Les cartes aux trésors, la confection des plus belles tenues d&apos;Eorzea ou même
            vous laisser tenter par les donjons sans fond avec une équipe soudée !
          </p>
        </div>
      </div>

      <div className="flex gap-20 items-center flex-col md:flex-row-reverse">
        <div>
          <h3>Nos activités</h3>
          <p>
            De façon générale, nous sommes actifs tous les samedis soirs. C&apos;est l&apos;occasion de rencontrer d&apos;autres membres de
            la guilde, mais aussi de profiter de l&apos;entraide pour venir à bout d&apos;un raid ou avoir des montures. Nous avons un fichier
            avec les besoins en monture des membres.
          </p>
          <p>
            Sur les activités, nous réalisons aussi souvent des chasses aux trésors (en groupe). Nous faisons aussi parfois des concours de glam.
          </p>
          <p>
            Chaque semaine, nous profitons des canaux de discussions de Discord pour définir les missions que nous allons proposer.
          </p>
          <p>
            <Link className="button" href={'/rejoindre'}>Nous rejoindre</Link>
          </p>
        </div>
        <div className="flex-none">
          <iframe title="Discord" src="https://discord.com/widget?id=194076527774793738&theme=dark" width="100%" style={{ maxWidth: '300' }} height="500" allowtransparency="true" frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
        </div>
      </div>
    </div>
  )
}
