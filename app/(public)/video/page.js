export const metadata = {
    title: 'Vidéotheque - CL Alpha FFXIV',
    description: 'Les vidéos de nos sorties.',
}  

export default function Video() {
    return <div className="main-content">
    <h3>Nos vidéos<small> - En replay</small></h3>
    <div className="py-8">
    <iframe
    src="https://player.twitch.tv/?collection=d0T_3Dq7aRfBDQ&parent=www.cl-alpha-ffxiv.fr&parent=localhost&muted=false&autoplay=true"
    height="80%"
    width="80%"
    className="aspect-video mx-auto"
    title="Twitch Replay"
    allowFullScreen>
    </iframe>
    </div>
    </div>
}