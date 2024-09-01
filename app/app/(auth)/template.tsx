'use client'

import { userLogout, useUser } from "@lib/user";
import { Button, Col, Flex, Layout, Menu, MenuProps, Row, Space, Typography, theme } from "antd";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const { Sider, Content } = Layout

const items = [
    {
        key: '/app/',
        label: 'Tableau de bord',
    },
    {
        key: '/app/integrations/',
        label: 'Intégrations',
    },
    {
        key: '/app/mounts/',
        label: 'Farm mounts',
    },
]


export default function MenuLayout({ children }: React.PropsWithChildren) {
    const user = useUser()
    const navigate = useRouter()
    const path = usePathname()
    let selected = undefined
    const { token } = theme.useToken()

    function MenuSelected({ item, key, keyPath, selectedKeys }: any) {
        navigate.push(key)
    }

    for (const { key } of items) {
        if (key == path) {
            selected = [key];
            break;
        }
        if (path.startsWith(key)) {
            selected = [key];
        }
    }

    return <Layout style={{ minHeight: '100vh' }} >
        <Layout.Header>
            <Row align={'middle'} gutter={12}>
                <Col>
                    <Image src={'/icon3.png'} width={48} height={48} alt="CL Alpha" />
                </Col>
                <Col span={0} md={1} flex={'none'}>
                    <Typography.Title style={{ minWidth: 160, margin: 'auto' }}><span className="text-white">AlphaBot</span></Typography.Title>
                </Col>
                <Col flex={'auto'}></Col>
                <Col span={0} sm={24} flex={'none'}>
                    <Typography.Text style={{ color: "white", wordBreak: 'keep-all' }}>{user?.username}</Typography.Text>
                </Col>
                <Col flex={'none'}>
                    <Button onClick={() => userLogout()}>Déconnecter</Button>
                </Col>
            </Row>
        </Layout.Header>
        <Layout>
            <Sider breakpoint="lg" collapsedWidth={0} theme="light">
                <Menu defaultSelectedKeys={selected} mode="inline" onSelect={MenuSelected} items={items} />
            </Sider>
            <Layout style={{ padding: '24px 24px' }}>

                {children}
            </Layout>
        </Layout>
        <Layout.Footer className="text-center">
            <Typography.Text className="">Conçu avec amour par Bontiv (Felixan sur Phoenix)</Typography.Text>
        </Layout.Footer>
    </Layout>
}