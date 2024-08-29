import JoinStatus from "./join";
import Image from "next/image";

export const metadata = {
    title: 'Nous rejoindre - CL Alpha FFXIV',
    description: 'Comment rejoindre les Alpha.',
}


export default function JoinPage() {
    return <div className="main-content">
    <div className="flex gap-20 flex-row-reverse">
      <div className="hidden md:block self-center"><Image alt="Image d&apos;équipe compagnie libre FFXIV" src={'../Team2.png'} width={'300'} height={'300'} className="py-auto px-auto" /></div>
      <div className="flex-1">
        <h3 id="join">Recrutement</h3>
        <p>Le recrutement est actuellement <JoinStatus />.</p>
        <p>Nous vous demandons au préalable de lire <a href="https://bit.ly/charte-alpha">la charte</a> de notre compagnie libre.</p>
        <p>
            Pour nous rejoindre, voici la procédure :
            <ol className="list-decimal px-10 py-4">
                <li>Rejoindre <a href="https://discord.gg/HfVECdtceQ">notre serveur Discord</a>.</li>
                <li>Faire un petit message dans <u>#-Recrutement</u> pour vous faire connaitre.</li>
                <li>Un agent recruteur va prendre contact avec vous pour une courte discussion.</li>
                <li>Bienvenue parmi nous !</li>
            </ol>
        </p>
        <p>
            <a className="button mx-2 whitespace-nowrap" href="https://discord.gg/HfVECdtceQ">Discord</a>
            <a className="button mx-2 whitespace-nowrap" href="https://forum.square-enix.com/ffxiv/threads/484299-Phoenix-Les-Alpha-recrutent">Forum Square Enix</a>
        </p>
      </div>
    </div>
    <h3>Ce que l&apos;on demande</h3>
    <p>
        Il n&apos;y a que très peu d&apos;obligations dans notre communauté. Une seule est en vigueur : la politesse. On demande
        de dire bonjour dans le cannal de guilde lors de la connexion.
    </p>
    <p>
        Nous avons un Discord pour les Alpha. Il n&apos;est pas obligatoire de venir parler en vocal. Cependant, on demande à
        nos membres de rejoindre le Discord. C&apos;est notre canal privilégié de communication en interne pour annoncer les
        événements à venir.
    </p>
    <p>
        Aucun événement n&apos;est obligatoire. Il n&apos;y a aucune participation requise. Cependant, quand vous participez à une
        activité organisée par la compagnie libre, nous demandons à rejoindre le vocal de Discord. C&apos;est sans obligation de
        parler / brancher le micro. C&apos;est principalement pour entendre les &ldquo;calls&rdquo; (annonces pour les stratégies des combats).
    </p>

    <h3>Notre charte</h3>
    <p>
        Maintenant que nous avons exposé les grandes lignes, il ne reste plus qu&apos;une étape. Une petite lecture rapide de notre charte.
    </p>
    <p><a href="https://bit.ly/charte-alpha" className="button">Consulter la charte</a></p>
    </div>
}