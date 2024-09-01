import { PropsWithChildren } from "react";
import { Menu } from './menu';

const SiteTemplate: React.FC<PropsWithChildren> = ({ children }) => <>
    <Menu />
    <div className="header-top text-slate-100 pt-32">
        <div className="container mx-auto mt-12">
            <h1 className="text-2xl">Final Fantasy XIV</h1>
            <h2 className="text-3xl">Les Alpha</h2>
            <small className="text-lg">Compagnie libre sur le serveur Phoenix</small>
        </div>
    </div>
    {children}
    <div className="bg-black text-gray-400 py-8">
        <div className='container mx-auto'>&copy; Bontiv pour la compagnie libre des Alpha de Phoenix - Final Fantasy XIV et toutes les images sont la propriété de Square Enix.</div>
    </div>
</>

export default SiteTemplate