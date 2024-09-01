'use client'

import { PropsWithChildren } from "react";
import { Layout, Menu, MenuItemProps } from "antd";
import { ItemType } from "antd/es/menu/interface";
import { usePathname, useRouter } from "next/navigation";

const { Header, Content, Footer } = Layout

const items: ItemType[] = [
    {
        key: '/',
        label: 'Notre CL'
    }, {
        key: '/membres/',
        label: 'Nos membres'
    }, {
        key: '/video/',
        label: 'Vidéotèque'
    }, {
        key: '/rejoindre/',
        label: 'Nous rejoindre'
    }
]

export default function SiteTemplate({ children }: PropsWithChildren) {
    const nav = useRouter()
    const path = usePathname()
    let active: string | undefined = undefined

    function goTo({ key }: { key: string }) {
        nav.push(key)
    }


    for (let i = 0; i < items.length; i++) {
        let key = items[i]?.key?.toString()
        if (key != undefined && path.startsWith(key)) {
            active = key;
            if (key === path) {
                break;
            }
        }
    }

    return <Layout className="min-h-screen">
        <Header className="header-top text-slate-100 px-0">
            <Menu items={items} mode="horizontal" theme="dark" selectedKeys={active != undefined ? [active] : undefined} onSelect={goTo} />
            <div className="container mx-auto mt-12">
                <h1 className="text-2xl">Final Fantasy XIV</h1>
                <h2 className="text-3xl">Les Alpha</h2>
                <small className="text-lg">Compagnie libre sur le serveur Phoenix</small>
            </div>

        </Header>
        <Content>
            {children}
        </Content>
        <Footer className="bg-black text-gray-400 py-8">
            <div className='container mx-auto'>&copy; Bontiv pour la compagnie libre des Alpha de Phoenix - Final Fantasy XIV et toutes les images sont la propriété de Square Enix.</div>
        </Footer>
    </Layout>
}