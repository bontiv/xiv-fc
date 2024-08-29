'use client'
import { Button, Card, Col, Flex, Grid, Row, Typography } from "antd";

export default function LoginPage() {
    return <Flex vertical className="min-h-screen">
        <Row justify={"center"} align={"middle"}>
            <Col span={12} md={8} lg={6} className="py-12">
                <Card title="Connexion" className="mt-12">
                    <Flex vertical gap={12}>
                        <Typography.Text></Typography.Text>
                        <Button type="primary" onClick={() => document.location = process.env.NEXT_PUBLIC_API + '/api/connect/discord'}>Connecter via Discord</Button>
                        {/*<Button onClick={() => document.location = process.env.NEXT_PUBLIC_API + '/api/connect/twitch'}>Connecter via Twitch</Button>*/}
                    </Flex>
                </Card>
            </Col>
        </Row>
    </Flex>
}