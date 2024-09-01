import { useDataApiMany } from "@src/lib/data";
import { Table, TableProps, Typography, Tooltip, Space, Avatar } from "antd";
import Image from 'next/image'

const mountImageData: { [name: string]: string } = require('./mountsImage.json')

export const MountTable: React.FC<{ competitors: any }> = ({ competitors }) => {
    const { data: mounts } = useDataApiMany('mounts', {
        filters: {
            'mount_category': {
                '$notNull': true
            },
        },
        populate: 'mount_category',
        pagination: {
            pageSize: 100
        },
        sort: [
            'mount_category.Level',
            'Name'
        ]
    })
    const columns: TableProps['columns'] = [{
        key: `player`,
        title: 'Joueur',
        fixed: 'left',
        dataIndex: ['attributes', 'Name'],
        render: (name, record) => <Space>
            <Avatar src={record.attributes.Avatar} />{name.split(' ')[0]}
        </Space>
    }]

    if (mounts != undefined) {
        for (const mount of mounts.data) {
            columns.push({
                key: `mount-${mount.id}`,
                hidden: competitors == undefined || competitors
                    .map((rec: { attributes: { mounts: { data: { id: number }[] } } }) => rec.attributes.mounts.data
                        .filter(mt => mt.id == mount.id).length)
                    .filter((c: number) => c == 0).length == 0,
                title: () => <Tooltip title={mount.attributes.NameFR.length > 0 ? mount.attributes.NameFR : mount.attributes.Name} placement="bottom">
                    {/*
                    <img height={32} width={32} src={mount.attributes.Name in mountImageData ? mountImageData[mount.attributes.Name] : mount.attributes.Picture} alt={mount.attributes.Name} />
                    */}
                    <Image src={mount.attributes.Picture} alt="mount.attributes.Name" height={32} width={32} />
                </Tooltip>,
                render: (value: { id: number, attributes: { Name: string, Pictrue: string } }[]) =>
                    (value.filter(record => record.id == mount.id).length > 0 ? <Typography.Text type="success" style={{ wordBreak: "keep-all" }}>Oui</Typography.Text> : <Typography.Text style={{ wordBreak: "keep-all" }} type="danger">Non</Typography.Text>),
                dataIndex: ['attributes', 'mounts', 'data']
            })
        }
    }

    return <Table
        scroll={{ x: true }}
        columns={columns}
        rowKey={(record) => record.id.toString()}
        dataSource={competitors} />
}

export default MountTable;