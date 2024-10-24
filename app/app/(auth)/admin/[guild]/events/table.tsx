'use client'

import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { DataTable, useDatacontrol } from "@src/components/DataTable";
import { Button, FloatButton, Popconfirm, Space, Tooltip } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { App } from "antd";
import { useState } from "react";
import dynamic from "next/dynamic";
import type { EventType } from './edit';
import { createEntry, deleteEntry, updateEntry } from "@src/lib/data";

const { useApp } = App;

dayjs.locale('fr')
dayjs.extend(LocalizedFormat)

const EventDrawer = dynamic(() => import('./edit'))

export const EventTable: React.FC<{ discord: string }> = ({ discord }) => {
    const app = useApp()
    const [edit, setEdit] = useState<undefined | EventType | null>(undefined)
    const datatable = useDatacontrol()

    return <>
        <DataTable
            dataControl={datatable}
            collection='events'
            query={{
                populate: 'leader',
                filters: {
                    'discord_server': discord
                }
            }}
            columns={[
                {
                    key: 'title',
                    title: 'Titre',
                    dataIndex: 'title',
                },
                {
                    key: 'date',
                    title: 'Date',
                    dataIndex: 'next_start',
                    render: (txt) => dayjs(txt).format('LLLL')
                },
                {
                    key: 'duration',
                    title: 'Durée',
                    dataIndex: 'duration',
                    render: (txt) => txt > 60 ? `${Math.floor(txt / 60)} h ${(txt % 60).toString().padStart(2, '0')}` : txt + ' mins'
                },
                {
                    key: 'leader',
                    title: 'Organisateur',
                    dataIndex: ['leader', 'discord_nickname'],
                },
                {
                    title: '',
                    dataIndex: 'id',
                    render: (id, items) => <Space>
                        <Tooltip placement="top" title="Éditer">
                            <Button size="small" type="link" onClick={() => setEdit({ id, title: items.title })} title="Editer"><EditOutlined /></Button>
                        </Tooltip>
                        <Popconfirm
                            title={items.title}
                            cancelText="Annuler"
                            okText="Supprimer"
                            description="Voulez-vous vraiment supprimer cet événement ?"
                            okType="danger"
                            onConfirm={async () => {
                                try {
                                    await deleteEntry('events', id)
                                    datatable.reload()
                                    app.message.success('Evénement supprimé')
                                } catch (e) {
                                    app.message.error('Erreur lors de la suppression')
                                }
                            }}
                            placement="left"
                        >
                            <Tooltip placement="top" title="Supprimer">
                                <Button size="small" danger type="link"><DeleteOutlined /></Button>
                            </Tooltip>
                        </Popconfirm>
                    </Space>
                }
            ]}
        />
        <FloatButton tooltip="Ajouter un événement" icon={<PlusOutlined />} onClick={() => setEdit(null)} />
        <EventDrawer
            edit={edit}
            onClose={() => setEdit(undefined)}
            onFinish={async (values) => {
                try {
                    if (edit === null) {
                        await createEntry('events', { discord_server: discord, ...values })
                    } else {
                        await updateEntry('events', values)
                    }
                    setEdit(undefined)
                    datatable.reload()
                    app.message.success('Modifié avec succès.')
                }
                catch (e) {
                    app.message.error('Impossible de modifier...')
                }

            }}
        />
    </>
}