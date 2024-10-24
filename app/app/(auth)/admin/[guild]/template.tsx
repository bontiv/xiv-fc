'use client'
import { useOne } from "@src/lib/data";
import { Col, Grid, Menu, Row, Space, Typography } from "antd";
import { ItemType } from "antd/es/menu/interface";
import { useParams, usePathname, useRouter } from "next/navigation";
import { CalendarOutlined, GiftOutlined, SettingOutlined, ShopOutlined, UserOutlined } from "@ant-design/icons";

const { Title } = Typography

const GuildAdmTpl: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { guild }: { guild: string } = useParams()
    const navigate = useRouter()
    const path = usePathname()
    const { data: guildData } = useOne('discord-servers', guild)

    const items: ItemType[] = [
        {
            key: 'events',
            label: 'Calendrier',
            icon: <CalendarOutlined />,
        },
        {
            key: 'members',
            label: 'Membres',
            icon: <UserOutlined />,
        },
        {
            key: 'rewards',
            label: 'Distribution lots',
            icon: <GiftOutlined />,
        },
        {
            key: 'shop',
            label: 'Magasin',
            icon: <ShopOutlined />
        },
        {
            key: 'config',
            label: 'Configuration',
            icon: <SettingOutlined />
        },
    ]

    function onChange({ key }: { key: string }) {
        navigate.push(`/app/admin/${guild}/${key}/`)
    }

    return <Row style={{ padding: '0 24' }} gutter={[24, 8]}>
        <Col span={24}>
            <Title level={2}>{guildData?.name}</Title>
        </Col><Col span={24}>
            <Menu items={items}
                mode="horizontal"
                selectedKeys={items.filter(i => path.startsWith(`/app/admin/${guild}/${i?.key}/`)).map(i => `${i?.key}`)} onSelect={onChange}
            />
        </Col><Col span={24}>
            {children}
        </Col>
    </Row>
}

export default GuildAdmTpl;

