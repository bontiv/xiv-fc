'use client'

import { userLogout, useUser } from "@/lib/user";
import { Button, Flex, Layout, Menu, MenuProps, Space, Typography } from "antd";
import Image from "next/image";
import React from "react";

const { Sider, Content } = Layout

type MenuItem = Required<MenuProps>['items'][number] & { path: string };
const items: MenuItem[] = [
    {
        key: 'dashboard',
        label: 'Tableau de bord',
        path: '/app/'
    },
    {
        key: 'integrations',
        label: 'Intégrations',
        path: '/app/integration/'
    }
]

function MenuSelected({ item, key, keyPath, selectedKeys }: any) {
    console.log({ item, key, keyPath, selectedKeys })
}

export default function MenuLayout({ children }: React.PropsWithChildren) {
    const user = useUser()
    return <Layout style={{ minHeight: '100vh' }} >
        <Layout.Header>
            <Flex>
                <Space className="grow">
                    <Image src={'/icon3.png'} width={48} height={48} alt="CL Alpha" />
                    <Typography.Title><span className="text-white">AlphaBot</span></Typography.Title>
                </Space>
                <Space className="text-white">
                    {user?.username}
                    <Button onClick={() => userLogout()}>Déconnecter</Button>
                </Space>
            </Flex>
        </Layout.Header>
        <Layout>
            <Sider breakpoint="lg" collapsedWidth={0} theme="light">

                <Menu defaultSelectedKeys={['dashboard']} mode="inline" onSelect={MenuSelected} items={items} />
            </Sider>
            <Content>{children}</Content>
        </Layout>
        <Layout.Footer className="text-center">
            <Typography.Text className="">Conçu avec amour par Bontiv (Felixan sur Phoenix)</Typography.Text>
        </Layout.Footer>
    </Layout>
}