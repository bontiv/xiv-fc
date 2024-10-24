'use client'

import { useDataApiMany } from "@src/lib/data";
import { Typography, List, Layout, theme } from "antd";
import { useRouter } from "next/navigation";
const { Title } = Typography
const { Content } = Layout

export default function AdmGuildPage() {
    const { data: guilds } = useDataApiMany('discord-servers')
    const { token } = theme.useToken()
    const navigate = useRouter()

    return <>
        <Title level={2}>Gestion des compagnies libres</Title>
        <Content style={{
            padding: 24,
            margin: '24 0',
            minHeight: 280,
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
        }}>
            <List dataSource={guilds?.data} rowKey={'id'} renderItem={(item: any) => <List.Item actions={[<a key='edit' onClick={() => navigate.push(`/app/admin/${item.id}/events/`)}>Consulter</a>]}>
                <List.Item.Meta title={item.attributes.name} />
            </List.Item>} />
        </Content>

    </>
}