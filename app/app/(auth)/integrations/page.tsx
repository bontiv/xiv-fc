'use client'
import { useApi } from "@src/lib/data";
import { Button, Card, Col, Row, Typography } from "antd";

export default function IntegrationPage() {
    const { data: me, isLoading: meLoading } = useApi('/users/me')

    function linkTwitch() {
        window.open(process.env.NEXT_PUBLIC_API + '/api/twitch/connect', 'twitch', 'popup=1,width=500,height=400')
    }

    return <Row gutter={[32, 16]}>
        <Col span={24} sm={12} lg={6}>
            <Card
                title='Discord BOT'
                actions={[
                    <Typography.Link key="add" target="_blank" href={`https://discord.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_APPID}`}>
                        <Button type="primary">Ajouter</Button>
                    </Typography.Link>
                ]}>
                <Typography.Text>Ajouter le Namazu doré à votre serveur Discord.</Typography.Text>
            </Card>
        </Col>
        <Col span={24} sm={12} lg={6}>
            <Card
                title='Twitch'
                actions={[
                    !meLoading && <Button key="add" onClick={linkTwitch} type={me?.twitch_user ? 'default' : 'primary'} disabled={me?.twitch_user != null}>{me?.twitch_user ? 'Déjà relié' : 'Connecter'}</Button>

                ]}
            >
                <Typography.Text>Connectez votre compte Twitch pour que vos streams soient annoncés dans vos guildes.</Typography.Text>
            </Card>
        </Col>
        <Col span={24} sm={12} lg={6}>
            <Card
                title='YouTube'
                actions={[<Typography.Text key="add" disabled>Indisponible</Typography.Text>]}
            >
                <Typography.Text>Connectez votre compte YouTube pour que vos streams soient annoncés dans vos guildes.</Typography.Text>
            </Card>
        </Col>
        <Col span={24} sm={12} lg={6}>
            <Card
                title='FFLogs'
                actions={[<Typography.Text key="add" disabled>Indisponible</Typography.Text>]}
            >
                <Typography.Text>Connectez votre compte FFLogs pour importer vos personnages. Vous pourrez aussi configuré une petite annonce d&apos;avancement dans votre guilde.</Typography.Text>
            </Card>
        </Col>
    </Row>
}