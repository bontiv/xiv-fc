'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export const Menu = () => {
    const path = usePathname()
    const [collapse, setCollapse] = useState(false)

    const closeCollapse = function () {
        setCollapse(false)
    }

    return <div className="menu-container">
        <button className='sm:hidden w-100 h-16 underline' onClick={function () { setCollapse(!collapse) }}>Menu</button>
        <div className={`menu-content ${collapse ? 'collapse-open' : 'collapse-close'}`}>
            <Link onClick={closeCollapse} className={path == '/' ? 'menu active' : 'menu'} href={'/'}>Notre CL</Link>
            <Link onClick={closeCollapse} className={path.startsWith('/membres') ? 'menu active' : 'menu'} href={'/membres'}>Nos membres</Link>
            <Link onClick={closeCollapse} className={path.startsWith('/maison') ? 'menu active' : 'menu'} href={'/maison'}>Le Domaine</Link>
            <Link onClick={closeCollapse} className={path.startsWith('/video') ? 'menu active' : 'menu'} href={'/video'}>Videothèque</Link>
            <Link onClick={closeCollapse} className={path.startsWith('/rejoindre') ? 'menu active' : 'menu'} href={'/rejoindre'}>Nous rejoindre</Link>
            <a href={'/app'}>Espace membres</a>
        </div>
    </div>
}