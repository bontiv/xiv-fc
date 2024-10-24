'use client'

import { DataTable } from "@src/components/DataTable";
import { Switch } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.locale('fr')
dayjs.extend(LocalizedFormat)

export const MembersTable: React.FC<{ discord: string }> = ({ discord }) => <DataTable
    collection='discord-users'
    query={{
        filters: {
            'discord_server': discord
        }
    }}
    columns={[
        {
            key: 'nickname',
            title: 'Surnom',
            dataIndex: 'discord_nickname',
        },
        {
            title: 'Utilisateur',
            dataIndex: 'discord_username',
        },
        {
            title: 'Activé',
            dataIndex: 'joined',
            render: (elem) => <Switch checked={elem} disabled />
        },
    ]}
/>