'use client'
import { useDataApiMany } from "@src/lib/data";
import { Row, Col, AutoComplete, Button, Typography, Layout, theme, Flex } from "antd";
import { useState } from "react";
import { MountTable } from './mountTable'

const AppMounts: React.FC = () => {
    const [input, setInput] = useState<undefined | string>()
    const [competitors, setCompetitors] = useState<number[]>([])
    const { token } = theme.useToken()

    const { data: dataSearch } = useDataApiMany(input != undefined ? 'characters' : null, {
        fields: ['Name'],
        pagination: { pageSize: 5 },
        filters: {
            Name: { '$containsi': input }
        }
    })

    const { data: dataCompetitors } = useDataApiMany(competitors.length > 0 ? 'characters' : null, {
        populate: ['mounts'],
        fields: [
            'Name',
            'Avatar'
        ],
        filters: {
            id: {
                '$in': competitors
            }
        }
    })

    const options = dataSearch == undefined ? [] : dataSearch.data.map((char: any) => ({ label: char.attributes.Name, value: char.id.toString() }))

    const onSelect = (data: string) => {
        console.log('onSelect', data);
        setInput('');
        competitors.push(Number.parseInt(data))
        setCompetitors(competitors);

    };

    const onSearch = (data: string) => {
        setInput(data);
    };

    return <>
        <Row style={{ padding: '0 24' }} gutter={[24, 8]}>
            <Col span={24}>
                <Row gutter={[24, 10]}>
                    <Col span={24} sm={6} flex={'none'}>
                        <Typography.Text>Ajouter un joueur:</Typography.Text>
                    </Col>
                    <Col span={24} sm={24} flex='10'>
                        <AutoComplete value={input} style={{ minWidth: '150px' }} onSelect={onSelect} options={options} onSearch={onSearch} />
                    </Col>
                    <Col span={24} flex='1'>
                        <Button block danger type="dashed" onClick={() => setCompetitors([])}>Réinitialiser</Button>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Layout.Content style={{
                    padding: 24,
                    margin: '24 0',
                    minHeight: 280,
                    background: token.colorBgContainer,
                    borderRadius: token.borderRadiusLG,
                }}><
                        MountTable competitors={dataCompetitors?.data} />
                </Layout.Content>
            </Col>
        </Row>

    </>
}

export default AppMounts;
function MountFarm() {

}