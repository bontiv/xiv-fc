import { useDataApiMany } from "@src/lib/data";
import { Table, TableProps, Typography, Tooltip, Space, Avatar } from "antd";
import Image from 'next/image'

export const MountTable: React.FC<{ competitors: any }> = ({ competitors }) => {
    const { data: mountCategories } = useDataApiMany('mount-categories', {
        populate: 'mounts',
        pagination: {
            pageSize: 100
        },
        sort: [
            'Level',
        ]
    })
    const columns: TableProps['columns'] = [{
        key: `player`,
        title: 'Joueur',
        fixed: 'left',
        dataIndex: ['Name'],
        render: (name, record) => <Space>
            <Avatar src={record.Avatar} />{name.split(' ')[0]}
        </Space>
    }]

    if (mountCategories != undefined) {
        for (const mountCategory of mountCategories.data) {
            const mounts: TableProps['columns'] = []
            for (const mount of mountCategory.mounts) {
                mounts.push(
                    {
                        key: `mount-${mount.id}`,
                        hidden: competitors == undefined || competitors
                            .map((rec: { mounts: { id: number }[] }) => rec.mounts
                                .filter(mt => mt.id == mount.id).length)
                            .filter((c: number) => c == 0).length == 0,
                        title: () => <Tooltip title={mount.NameFR.length > 0 ? mount.NameFR : mount.Name} placement="bottom">
                            {/*
                            <img height={32} width={32} src={mount.attributes.Name in mountImageData ? mountImageData[mount.attributes.Name] : mount.attributes.Picture} alt={mount.attributes.Name} />
                            */}
                            <Image src={mount.Picture} alt="mount.attributes.Name" height={32} width={32} />
                        </Tooltip>,
                        render: (value: { id: number, attributes: { Name: string, Pictrue: string } }[]) =>
                            (value.filter(record => record.id == mount.id).length > 0 ? <Typography.Text type="success" style={{ wordBreak: "keep-all" }}>Oui</Typography.Text> : <Typography.Text style={{ wordBreak: "keep-all" }} type="danger">Non</Typography.Text>),
                        dataIndex: ['mounts']
                    }
                )
            }
            const mountsNeeded = mounts.filter(c => !c.hidden).length;
            columns.push({
                key: `mountCategory-${mountCategory.id}`,
                title: `${mountCategory.Name} (${mountsNeeded})`,
                hidden: mountsNeeded == 0,
                children: mounts
            })
        }
    }

    return <Table
        scroll={{ x: true }}
        columns={columns}
        rowKey={(record) => record.id.toString()}
        dataSource={competitors}
        pagination={false}
    />
}

export default MountTable;