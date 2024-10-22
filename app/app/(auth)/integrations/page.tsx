'use client'
import { Button, Card, Col, Row, Typography } from "antd";

export default function IntegrationPage() {
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
                actions={[<Typography.Text key="add" disabled>Indisponible</Typography.Text>]}
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